from fastapi import APIRouter

from app.services.recovery_records import get_recovery_records


router = APIRouter(
    prefix="/api/v1/recovery-records",
    tags=["Recovery Records"],
)


@router.get("")
def get_all_recovery_records():

    records = get_recovery_records()

    return {
        "success": True,
        "count": len(records),
        "records": records,
    }