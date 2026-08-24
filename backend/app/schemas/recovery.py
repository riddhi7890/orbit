from typing import List
from pydantic import BaseModel


class RecoveryRequest(BaseModel):
    category: str
    item_type: str


class RecoveryResponse(BaseModel):
    success: bool
    category: str
    item_type: str
    is_recoverable: bool
    recoverable_materials: List[str]
    handling_recommendation: str
