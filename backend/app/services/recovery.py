from typing import Dict


E_WASTE_RECOVERY_DATA = {
    "laptop": {
        "recoverable_materials": [
            "metals",
            "electronic_components",
            "recyclable_plastics",
        ],
        "handling_recommendation": (
            "Send the laptop to a dedicated e-waste recovery "
            "or authorized recycling channel."
        ),
    },
    "phone": {
        "recoverable_materials": [
            "metals",
            "electronic_components",
            "recyclable_plastics",
        ],
        "handling_recommendation": (
            "Send the phone to an appropriate e-waste "
            "recovery channel."
        ),
    },
    "battery": {
        "recoverable_materials": [
            "metals",
            "battery materials",
        ],
        "handling_recommendation": (
            "Do not mix the battery with regular waste. "
            "Send it through a dedicated battery or "
            "e-waste recovery channel."
        ),
    },
    "charger": {
        "recoverable_materials": [
            "copper",
            "electronic_components",
            "recyclable_plastics",
        ],
        "handling_recommendation": (
            "Send the charger to an e-waste recovery "
            "or authorized recycling channel."
        ),
    },
    "electronic": {
        "recoverable_materials": [
            "metals",
            "electronic_components",
            "recyclable_plastics",
        ],
        "handling_recommendation": (
            "Separate from normal waste and route it "
            "through an e-waste recovery channel."
        ),
    },
}


def analyze_recovery(category: str, item_type: str) -> Dict:
    category = category.lower().strip()
    item_type = item_type.lower().strip()

    if category != "e_waste":
        return {
            "category": category,
            "item_type": item_type,
            "is_recoverable": False,
            "recoverable_materials": [],
            "handling_recommendation": (
                "This item does not require the e-waste "
                "recovery pipeline."
            ),
        }

    recovery_data = None

    for keyword, data in E_WASTE_RECOVERY_DATA.items():
        if keyword in item_type:
            recovery_data = data
            break

    if recovery_data is None:
        recovery_data = {
            "recoverable_materials": [
                "metals",
                "electronic_components",
                "recyclable_plastics",
            ],
            "handling_recommendation": (
                "Route the item to an appropriate e-waste "
                "recovery or authorized recycling channel."
            ),
        }

    return {
        "category": category,
        "item_type": item_type,
        "is_recoverable": True,
        **recovery_data,
    }