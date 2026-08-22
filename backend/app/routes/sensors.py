from fastapi import APIRouter, HTTPException

from app.schemas.sensors import SensorReading
from app.services.priority import calculate_priority
from app.routes.bins import BINS
from app.core.supabase import supabase


router = APIRouter(
    prefix="/api/v1/sensor-readings",
    tags=["Sensor Readings"],
)


SENSOR_READINGS = []


@router.post("")
def create_sensor_reading(reading: SensorReading):
    """
    Save sensor reading, update the corresponding bin,
    calculate collection priority, and persist the reading
    in Supabase.
    """

    # Find the referenced bin
    bin_item = next(
        (
            bin_item
            for bin_item in BINS
            if bin_item["id"] == reading.bin_id
        ),
        None,
    )

    if bin_item is None:
        raise HTTPException(
            status_code=404,
            detail=f"Bin '{reading.bin_id}' not found.",
        )

    # Convert Pydantic model to dictionary
    reading_data = reading.model_dump()

    # Keep existing in-memory behavior
    SENSOR_READINGS.append(reading_data)

    # Persist sensor reading in Supabase
    try:
        supabase.table("sensor_readings").insert(
            {
                "bin_id": reading.bin_id,
                "fill_level": reading.fill_level,
                "temperature": reading.temperature,
            }
        ).execute()

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save sensor reading: {exc}",
        )

    # Update current bin fill level
    bin_item["fill_level"] = reading.fill_level

    # Calculate collection priority
    priority_result = calculate_priority(
        reading.fill_level
    )

    # Update bin status
    if priority_result["priority"] == "urgent":
        bin_item["status"] = "critical"

    elif priority_result["priority"] == "high":
        bin_item["status"] = "warning"

    else:
        bin_item["status"] = "normal"

    return {
        "success": True,
        "message": "Sensor reading processed successfully.",
        "reading": reading_data,
        "bin": bin_item,
        "collection": priority_result,
    }