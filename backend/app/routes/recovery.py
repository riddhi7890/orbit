from fastapi import APIRouter, HTTPException

from app.schemas.recovery import RecoveryRequest
from app.services.recovery import analyze_recovery
from app.services.recovery_records import create_recovery_record


router = APIRouter(
    prefix="/api/v1/recovery",
    tags=["E-Waste Recovery"],
)


@router.post("/analyze")
def analyze_waste_recovery(request: RecoveryRequest):
    """
    Analyze an e-waste item and create a recovery record.
    """

    if not request.category.strip():
        raise HTTPException(
            status_code=400,
            detail="Waste category is required.",
        )

    if not request.item_type.strip():
        raise HTTPException(
            status_code=400,
            detail="Item type is required.",
        )

    result = analyze_recovery(
        category=request.category,
        item_type=request.item_type,
    )

    record = create_recovery_record(
        category=result["category"],
        item_type=result["item_type"],
        is_recoverable=result["is_recoverable"],
        recoverable_materials=result["recoverable_materials"],
    )

    return {
        "success": True,
        **result,
        "record": record,
    }
