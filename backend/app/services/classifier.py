import json
import logging
import os
from typing import Any, Dict, List, Literal
from dotenv import load_dotenv
from fastapi import HTTPException
from google import genai
from google.genai import types
from pydantic import BaseModel, Field

# Ensure environment variables from .env are loaded
load_dotenv()

logger = logging.getLogger(__name__)

WASTE_CATEGORIES: List[str] = [
    "organic",
    "paper",
    "plastic",
    "glass",
    "metal",
    "e_waste",
]

MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-3.5-flash")

WasteCategoryType = Literal[
    "organic",
    "paper",
    "plastic",
    "glass",
    "metal",
    "e_waste",
]


class WasteClassificationSchema(BaseModel):
    category: WasteCategoryType = Field(
        description="The primary category of the waste item: organic, paper, plastic, glass, metal, or e_waste."
    )
    confidence: float = Field(
        description="Numeric score strictly between 0.0 and 1.0 representing visual certainty about the classification."
    )


def _get_genai_client() -> genai.Client:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=502,
            detail="GEMINI_API_KEY is not configured in the environment.",
        )
    return genai.Client(api_key=api_key)


def classify_waste(image_bytes: bytes, mime_type: str = "image/jpeg") -> Dict[str, Any]:
    """
    Classify waste from uploaded image bytes using Gemini Vision.
    """
    if not image_bytes:
        raise HTTPException(
            status_code=400,
            detail="No image data provided for classification.",
        )

    try:
        client = _get_genai_client()
        image_part = types.Part.from_bytes(data=image_bytes, mime_type=mime_type)

        prompt = (
            "You are an expert waste classification AI. Analyze the uploaded image and identify the primary waste item.\n\n"
            "Classify the item into exactly ONE of these six categories:\n"
            "- organic: food scraps, fruits, vegetables, compostable organic materials, yard waste\n"
            "- paper: paper, cardboard, magazines, newspapers, paper packaging\n"
            "- plastic: plastic bottles, containers, bags, wrappers, packaging\n"
            "- glass: glass bottles, jars, glassware, broken glass\n"
            "- metal: aluminum cans, tin cans, foil, scrap metal, metal lids\n"
            "- e_waste: batteries, electronics, circuit boards, cables/wires, mobile phones, chargers\n\n"
            "Estimate your confidence as a numeric float strictly between 0.0 and 1.0 representing how visually certain you are about the classification:\n"
            "- Very clear, recognizable, and in-focus objects typically receive high confidence (e.g. 0.85 to 0.99).\n"
            "- Partially visible, occluded, or slightly ambiguous objects receive moderate confidence (e.g. 0.50 to 0.84).\n"
            "- Heavily distorted, blurry, or ambiguous items receive lower confidence.\n\n"
            "Return a valid JSON object matching the requested schema."
        )

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=[image_part, prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=WasteClassificationSchema,
            ),
        )

        if not response.text:
            raise ValueError("Empty response received from Gemini Vision.")

        parsed_data = json.loads(response.text)
        category = parsed_data.get("category")
        confidence = parsed_data.get("confidence")

        if category not in WASTE_CATEGORIES:
            raise ValueError(f"Unrecognized waste category: {category}")

        if confidence is None or not isinstance(confidence, (int, float)):
            raise ValueError("Invalid or missing confidence score from Gemini Vision.")

        confidence_val = float(confidence)
        if 1.0 < confidence_val <= 100.0:
            confidence_val = confidence_val / 100.0

        if not (0.0 < confidence_val <= 1.0):
            raise ValueError(
                f"Confidence score {confidence_val} is invalid or indicates unclassifiable input."
            )

        return {
            "category": category,
            "confidence": round(confidence_val, 2),
            "supported_categories": WASTE_CATEGORIES,
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error("Gemini Vision classification failed: %s", str(e))
        raise HTTPException(
            status_code=502,
            detail=f"Gemini Vision classification failed: {str(e)}",
        )