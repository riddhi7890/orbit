from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.services.priority import calculate_priority


router = APIRouter(
    prefix="/api/v1/collection",
    tags=["Collection"],
)


class CollectionCheckRequest(BaseModel):
    bin_id: str
    fill_level: float = Field(ge=0, le=100)


@router.post("/check")
def check_collection_priority(request: CollectionCheckRequest):
    """
    Calculate collection priority for a bin.
    """

    priority_result = calculate_priority(request.fill_level)

    return {
        "success": True,
        "bin_id": request.bin_id,
        "fill_level": request.fill_level,
        **priority_result,
    }