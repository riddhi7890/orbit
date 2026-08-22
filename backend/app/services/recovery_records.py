from typing import Dict, List

from app.core.supabase import supabase


def create_recovery_record(
    category: str,
    item_type: str,
    is_recoverable: bool,
    recoverable_materials: List[str],
) -> Dict:

    record = {
        "category": category,
        "item_type": item_type,
        "is_recoverable": is_recoverable,
        "recoverable_materials": recoverable_materials,
        "status": "identified",
    }

    response = (
        supabase
        .table("recovery_records")
        .insert(record)
        .execute()
    )

    saved_record = response.data[0]

    return {
        "id": f"REC-{saved_record['id']:03d}",
        "category": saved_record["category"],
        "item_type": saved_record["item_type"],
        "is_recoverable": saved_record["is_recoverable"],
        "recoverable_materials": saved_record["recoverable_materials"],
        "status": saved_record["status"],
    }


def get_recovery_records() -> List[Dict]:

    response = (
        supabase
        .table("recovery_records")
        .select("*")
        .order("created_at", desc=False)
        .execute()
    )

    records = []

    for record in response.data:
        records.append({
            "id": f"REC-{record['id']:03d}",
            "category": record["category"],
            "item_type": record["item_type"],
            "is_recoverable": record["is_recoverable"],
            "recoverable_materials": record["recoverable_materials"],
            "status": record["status"],
        })

    return records