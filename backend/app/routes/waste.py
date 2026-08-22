import mimetypes

from fastapi import APIRouter, File, UploadFile, HTTPException

from app.services.classifier import classify_waste
from app.core.supabase import supabase


router = APIRouter(
    prefix="/api/v1/waste",
    tags=["Waste"],
)


SUPPORTED_CATEGORIES = [
    "organic",
    "paper",
    "plastic",
    "glass",
    "metal",
    "e_waste",
]


def _detect_image_mime(
    filename: str | None,
    content_type: str | None,
    data: bytes,
) -> str | None:

    if content_type and content_type.startswith("image/"):
        return content_type

    if filename:
        guessed, _ = mimetypes.guess_type(filename)

        if guessed and guessed.startswith("image/"):
            return guessed

    if len(data) >= 12:

        if data.startswith(b"\xff\xd8\xff"):
            return "image/jpeg"

        if data.startswith(b"\x89PNG\r\n\x1a\n"):
            return "image/png"

        if data.startswith(b"GIF87a") or data.startswith(b"GIF89a"):
            return "image/gif"

        if data.startswith(b"RIFF") and data[8:12] == b"WEBP":
            return "image/webp"

        if data.startswith(b"BM"):
            return "image/bmp"

    return None


@router.post("/classify")
async def classify_waste_image(
    image: UploadFile = File(...)
):
    """
    Classify an uploaded waste image
    and save the classification result in Supabase.
    """

    image_bytes = await image.read()

    if not image_bytes:
        raise HTTPException(
            status_code=400,
            detail="Uploaded image file is empty.",
        )

    mime_type = _detect_image_mime(
        image.filename,
        image.content_type,
        image_bytes,
    )

    if not mime_type:
        raise HTTPException(
            status_code=400,
            detail="Only image files are allowed.",
        )

    try:
        result = classify_waste(
            image_bytes=image_bytes,
            mime_type=mime_type,
        )

    except Exception as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Waste classification failed: {exc}",
        )

    try:
        supabase.table("waste_classifications").insert(
            {
                "filename": image.filename,
                "category": result["category"],
                "confidence": result["confidence"],
            }
        ).execute()

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save classification result: {exc}",
        )

    return {
        "success": True,
        "filename": image.filename,
        **result,
    }


@router.get("/stats")
def get_waste_stats():
    """
    Return database-backed waste classification statistics.
    """

    try:
        response = (
            supabase
            .table("waste_classifications")
            .select("category")
            .execute()
        )

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch waste statistics: {exc}",
        )

    records = response.data or []

    categories = {
        category: 0
        for category in SUPPORTED_CATEGORIES
    }

    for record in records:
        category = record.get("category")

        if category in categories:
            categories[category] += 1

    total_items = len(records)

    return {
        "success": True,
        "total_items_classified": total_items,
        "categories": categories,
    }