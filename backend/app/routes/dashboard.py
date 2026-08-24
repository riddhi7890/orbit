from fastapi import APIRouter

from app.routes.bins import BINS


router = APIRouter(
    prefix="/api/v1/dashboard",
    tags=["Dashboard"],
)


@router.get("")
def get_dashboard():
    total_bins = len(BINS)

    critical_bins = sum(
        1 for bin_item in BINS
        if bin_item["status"] == "critical"
    )

    average_fill_level = (
        sum(bin_item["fill_level"] for bin_item in BINS) / total_bins
        if total_bins > 0
        else 0
    )

    return {
        "success": True,
        "total_bins": total_bins,
        "critical_bins": critical_bins,
        "average_fill_level": round(average_fill_level, 2),
        "bins_needing_collection": critical_bins,
    }