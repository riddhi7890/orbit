from typing import List, Dict


def generate_recommendations(bins: List[Dict]) -> List[Dict]:
    """
    Generate waste-management recommendations based
    on current bin conditions.
    """

    recommendations = []

    for bin_item in bins:
        fill_level = bin_item["fill_level"]
        status = bin_item["status"]
        waste_type = bin_item["waste_type"]

        if fill_level >= 90:
            recommendations.append(
                {
                    "bin_id": bin_item["id"],
                    "priority": "urgent",
                    "recommendation": (
                        f"Collect {bin_item['id']} immediately. "
                        "The bin is almost full."
                    ),
                }
            )

        elif fill_level >= 75:
            recommendations.append(
                {
                    "bin_id": bin_item["id"],
                    "priority": "high",
                    "recommendation": (
                        f"Schedule collection for {bin_item['id']} soon."
                    ),
                }
            )

        elif status == "warning":
            recommendations.append(
                {
                    "bin_id": bin_item["id"],
                    "priority": "medium",
                    "recommendation": (
                        f"Monitor {bin_item['id']} closely "
                        "and plan the next collection."
                    ),
                }
            )

    if not recommendations:
        recommendations.append(
            {
                "bin_id": None,
                "priority": "low",
                "recommendation": (
                    "All bins are currently within normal operating levels."
                ),
            }
        )

    return recommendations