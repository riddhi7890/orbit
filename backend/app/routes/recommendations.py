from fastapi import APIRouter

from app.routes.bins import BINS
from app.services.recommendations import generate_recommendations


router = APIRouter(
    prefix="/api/v1/recommendations",
    tags=["Recommendations"],
)


@router.get("")
def get_recommendations():
    recommendations = generate_recommendations(BINS)

    return {
        "success": True,
        "count": len(recommendations),
        "recommendations": recommendations,
    }