from fastapi import APIRouter, HTTPException

from app.schemas.bins import Bin


router = APIRouter(
    prefix="/api/v1/bins",
    tags=["Bins"],
)


BINS = [
    {
        "id": "BIN-001",
        "location": "Main Campus",
        "fill_level": 85,
        "status": "critical",
        "waste_type": "mixed",
    },
    {
        "id": "BIN-002",
        "location": "Hostel Block A",
        "fill_level": 62,
        "status": "warning",
        "waste_type": "organic",
    },
    {
        "id": "BIN-003",
        "location": "Cafeteria",
        "fill_level": 35,
        "status": "normal",
        "waste_type": "plastic",
    },
    {
        "id": "BIN-004",
        "location": "Library",
        "fill_level": 18,
        "status": "normal",
        "waste_type": "paper",
    },
]


@router.get("")
def get_all_bins():
    return {
        "success": True,
        "count": len(BINS),
        "bins": BINS,
    }


@router.get("/{bin_id}")
def get_bin_by_id(bin_id: str):
    for bin_item in BINS:
        if bin_item["id"] == bin_id:
            return {
                "success": True,
                "bin": bin_item,
            }

    raise HTTPException(
        status_code=404,
        detail=f"Bin '{bin_id}' not found."
    )