from pydantic import BaseModel
from typing import List


class Bin(BaseModel):
    id: str
    location: str
    fill_level: float
    status: str
    waste_type: str


class BinListResponse(BaseModel):
    bins: List[Bin]


