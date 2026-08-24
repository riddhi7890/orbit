from typing import List
from pydantic import BaseModel


class TreatmentPlant(BaseModel):
    id: str
    name: str
    location: str
    waste_types: List[str]
    capacity_tpd: int
    status: str
