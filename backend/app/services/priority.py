from typing import Dict


def calculate_priority(fill_level: float) -> Dict:
    """
    Calculate collection priority based on bin fill level.
    """

    if fill_level >= 90:
        return {
            "priority": "urgent",
            "should_collect": True,
            "message": "Bin requires immediate collection.",
        }

    if fill_level >= 75:
        return {
            "priority": "high",
            "should_collect": True,
            "message": "Bin should be collected soon.",
        }

    if fill_level >= 50:
        return {
            "priority": "medium",
            "should_collect": False,
            "message": "Monitor the bin and plan collection.",
        }

    return {
        "priority": "normal",
        "should_collect": False,
        "message": "Bin is currently within normal operating level.",
    }