from pydantic import BaseModel, Field
from datetime import datetime


class SensorReading(BaseModel):
    bin_id: str
    fill_level: float = Field(ge=0, le=100)
    temperature: float
    timestamp: datetime


class SensorReadingResponse(BaseModel):
    success: bool
    message: str
    reading: SensorReading