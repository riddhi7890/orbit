from fastapi import APIRouter, HTTPException

from app.schemas.treatment_plants import TreatmentPlant


router = APIRouter(
    prefix="/api/v1/treatment-plants",
    tags=["Waste Treatment Plants"],
)


TREATMENT_PLANTS = [
    {
        "id": "WTP-001",
        "name": "Central Waste Treatment Plant",
        "location": "Indore",
        "waste_types": [
            "organic",
            "paper",
            "plastic",
        ],
        "capacity_tpd": 500,
        "status": "operational",
    },
    {
        "id": "WTP-002",
        "name": "North Zone Material Recovery Facility",
        "location": "Indore",
        "waste_types": [
            "paper",
            "plastic",
            "glass",
            "metal",
        ],
        "capacity_tpd": 300,
        "status": "operational",
    },
    {
        "id": "WTP-003",
        "name": "E-Waste Recovery Centre",
        "location": "Indore",
        "waste_types": [
            "e_waste",
        ],
        "capacity_tpd": 100,
        "status": "operational",
    },
]


@router.get("")
def get_all_treatment_plants():
    return {
        "success": True,
        "count": len(TREATMENT_PLANTS),
        "plants": TREATMENT_PLANTS,
    }


@router.get("/{plant_id}")
def get_treatment_plant(plant_id: str):

    for plant in TREATMENT_PLANTS:
        if plant["id"] == plant_id:
            return {
                "success": True,
                "plant": plant,
            }

    raise HTTPException(
        status_code=404,
        detail=f"Treatment plant '{plant_id}' not found.",
    )