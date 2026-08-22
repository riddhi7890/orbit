// Complete High-Fidelity Mock Dataset for ORBIT Smart Waste Management Platform

export const MOCK_DASHBOARD = {
  total_waste_tons: 428.6,
  recyclable_rate: 68.4,
  organic_waste_tons: 164.2,
  general_waste_tons: 135.5,
  e_waste_tons: 24.8,
  plastic_waste_tons: 72.1,
  paper_waste_tons: 32.0,
  total_bins: 184,
  active_bins: 179,
  critical_bins: 7,
  high_priority_bins: 14,
  collection_status: "Active - 6 Routes Operating",
  co2_saved_tons: 142.8,
  efficiency_score: 94.2,
  energy_conserved_mwh: 310.5,
  economic_value_recovered_usd: 86450
};

export const MOCK_WASTE_STATS = {
  summary: {
    total_volume_tons: 428.6,
    recycled_volume_tons: 293.1,
    recovery_efficiency: 68.4,
    compliance_score: 92.6
  },
  categories: [
    { name: "Organic", volume: 164.2, percentage: 38.3, color: "#10B981", recoverable: true },
    { name: "Plastics (PET/HDPE)", volume: 72.1, percentage: 16.8, color: "#0EA5E9", recoverable: true },
    { name: "Paper & Cardboard", volume: 32.0, percentage: 7.5, color: "#F59E0B", recoverable: true },
    { name: "Metals & Aluminum", volume: 25.0, percentage: 5.8, color: "#6366F1", recoverable: true },
    { name: "Glass", volume: 20.0, percentage: 4.7, color: "#14B8A6", recoverable: true },
    { name: "E-Waste", volume: 24.8, percentage: 5.8, color: "#EC4899", recoverable: true },
    { name: "General / Non-Recyclable", volume: 110.5, percentage: 25.8, color: "#94A3B8", recoverable: false }
  ],
  weekly_trend: [
    { day: "Mon", organic: 22.4, recyclable: 38.2, general: 14.1 },
    { day: "Tue", organic: 24.1, recyclable: 41.5, general: 15.3 },
    { day: "Wed", organic: 21.8, recyclable: 39.0, general: 13.8 },
    { day: "Thu", organic: 25.6, recyclable: 44.2, general: 16.2 },
    { day: "Fri", organic: 28.3, recyclable: 48.7, general: 18.0 },
    { day: "Sat", organic: 23.5, recyclable: 42.1, general: 19.4 },
    { day: "Sun", organic: 18.5, recyclable: 39.4, general: 13.7 }
  ],
  zone_segregation: [
    { zone: "Zone A (Tech Park)", efficiency: 89.4, topStream: "Plastics & E-Waste" },
    { zone: "Zone B (Downtown Core)", efficiency: 74.2, topStream: "Organics & Paper" },
    { zone: "Zone C (Residential Green)", efficiency: 91.8, topStream: "Compost & Recyclables" },
    { zone: "Zone D (Harbor Industrial)", efficiency: 68.5, topStream: "Metals & General" }
  ]
};

export const MOCK_BINS = [
  {
    bin_id: "A102",
    name: "Tech Quad Smart Bin A102",
    zone: "Zone A",
    coordinates: [-12, 1.2, -8],
    latitude: 37.7749,
    longitude: -122.4194,
    fill_level: 87,
    capacity_liters: 240,
    current_liters: 208.8,
    waste_type: "Plastic & Packaging",
    status: "CRITICAL",
    priority: "Critical",
    battery_level: 94,
    temperature_c: 23.4,
    last_reading: "12 mins ago",
    last_collected: "Yesterday, 18:30",
    estimated_time_to_overflow_hours: 1.5,
    sensor_history: [
      { time: "08:00", fill: 35 },
      { time: "10:00", fill: 48 },
      { time: "12:00", fill: 68 },
      { time: "14:00", fill: 79 },
      { time: "16:00", fill: 87 }
    ]
  },
  {
    bin_id: "B201",
    name: "Metro Plaza Solar Compactor B201",
    zone: "Zone B",
    coordinates: [8, 1.2, -15],
    latitude: 37.7762,
    longitude: -122.4178,
    fill_level: 91,
    capacity_liters: 360,
    current_liters: 327.6,
    waste_type: "Organic Waste",
    status: "CRITICAL",
    priority: "Critical",
    battery_level: 88,
    temperature_c: 26.1,
    last_reading: "5 mins ago",
    last_collected: "2 days ago",
    estimated_time_to_overflow_hours: 0.9,
    sensor_history: [
      { time: "08:00", fill: 52 },
      { time: "10:00", fill: 64 },
      { time: "12:00", fill: 78 },
      { time: "14:00", fill: 85 },
      { time: "16:00", fill: 91 }
    ]
  },
  {
    bin_id: "C104",
    name: "Greenways Eco Hub C104",
    zone: "Zone C",
    coordinates: [-18, 1.2, 14],
    latitude: 37.7780,
    longitude: -122.4210,
    fill_level: 79,
    capacity_liters: 240,
    current_liters: 189.6,
    waste_type: "Paper & Cardboard",
    status: "HIGH",
    priority: "High",
    battery_level: 96,
    temperature_c: 21.0,
    last_reading: "18 mins ago",
    last_collected: "Yesterday, 07:15",
    estimated_time_to_overflow_hours: 3.2,
    sensor_history: [
      { time: "08:00", fill: 20 },
      { time: "10:00", fill: 42 },
      { time: "12:00", fill: 60 },
      { time: "14:00", fill: 72 },
      { time: "16:00", fill: 79 }
    ]
  },
  {
    bin_id: "A108",
    name: "Innovation Way Sensor Bin A108",
    zone: "Zone A",
    coordinates: [-6, 1.2, -22],
    latitude: 37.7735,
    longitude: -122.4230,
    fill_level: 84,
    capacity_liters: 240,
    current_liters: 201.6,
    waste_type: "E-Waste & Batteries",
    status: "CRITICAL",
    priority: "Critical",
    battery_level: 91,
    temperature_c: 22.8,
    last_reading: "32 mins ago",
    last_collected: "3 days ago",
    estimated_time_to_overflow_hours: 2.1,
    sensor_history: [
      { time: "08:00", fill: 40 },
      { time: "10:00", fill: 55 },
      { time: "12:00", fill: 67 },
      { time: "14:00", fill: 76 },
      { time: "16:00", fill: 84 }
    ]
  },
  {
    bin_id: "D305",
    name: "Harbor Freight Logistics Bin D305",
    zone: "Zone D",
    coordinates: [16, 1.2, 10],
    latitude: 37.7710,
    longitude: -122.4140,
    fill_level: 68,
    capacity_liters: 480,
    current_liters: 326.4,
    waste_type: "Metal & Aluminum",
    status: "MEDIUM",
    priority: "Medium",
    battery_level: 82,
    temperature_c: 24.5,
    last_reading: "45 mins ago",
    last_collected: "Yesterday, 14:00",
    estimated_time_to_overflow_hours: 6.4,
    sensor_history: [
      { time: "08:00", fill: 30 },
      { time: "10:00", fill: 45 },
      { time: "12:00", fill: 54 },
      { time: "14:00", fill: 62 },
      { time: "16:00", fill: 68 }
    ]
  },
  {
    bin_id: "B212",
    name: "Central Station Transit Bin B212",
    zone: "Zone B",
    coordinates: [4, 1.2, -4],
    latitude: 37.7755,
    longitude: -122.4165,
    fill_level: 42,
    capacity_liters: 360,
    current_liters: 151.2,
    waste_type: "Recyclables Mixed",
    status: "GOOD",
    priority: "Low",
    battery_level: 99,
    temperature_c: 20.2,
    last_reading: "10 mins ago",
    last_collected: "Today, 06:30",
    estimated_time_to_overflow_hours: 14.8,
    sensor_history: [
      { time: "08:00", fill: 12 },
      { time: "10:00", fill: 22 },
      { time: "12:00", fill: 31 },
      { time: "14:00", fill: 38 },
      { time: "16:00", fill: 42 }
    ]
  },
  {
    bin_id: "C119",
    name: "Botanical Gardens Bin C119",
    zone: "Zone C",
    coordinates: [-22, 1.2, -2],
    latitude: 37.7795,
    longitude: -122.4245,
    fill_level: 28,
    capacity_liters: 240,
    current_liters: 67.2,
    waste_type: "Organic Compost",
    status: "GOOD",
    priority: "Low",
    battery_level: 100,
    temperature_c: 19.5,
    last_reading: "25 mins ago",
    last_collected: "Today, 09:00",
    estimated_time_to_overflow_hours: 22.0,
    sensor_history: [
      { time: "08:00", fill: 8 },
      { time: "10:00", fill: 14 },
      { time: "12:00", fill: 20 },
      { time: "14:00", fill: 24 },
      { time: "16:00", fill: 28 }
    ]
  },
  {
    bin_id: "D310",
    name: "Wharf Pier Logistics Bin D310",
    zone: "Zone D",
    coordinates: [22, 1.2, 18],
    latitude: 37.7698,
    longitude: -122.4120,
    fill_level: 53,
    capacity_liters: 480,
    current_liters: 254.4,
    waste_type: "Glass & Bottles",
    status: "MEDIUM",
    priority: "Medium",
    battery_level: 78,
    temperature_c: 23.0,
    last_reading: "1 hr ago",
    last_collected: "Yesterday, 11:30",
    estimated_time_to_overflow_hours: 9.5,
    sensor_history: [
      { time: "08:00", fill: 22 },
      { time: "10:00", fill: 34 },
      { time: "12:00", fill: 41 },
      { time: "14:00", fill: 48 },
      { time: "16:00", fill: 53 }
    ]
  }
];

export const MOCK_COLLECTION_PRIORITY = [
  {
    rank: 1,
    bin_id: "B201",
    name: "Metro Plaza Solar Compactor B201",
    zone: "Zone B",
    fill_level: 91,
    waste_type: "Organic Waste",
    priority: "Critical",
    urgency_level: "Immediate",
    time_to_overflow: "0.9 hrs",
    recommended_vehicle: "Route Unit Alpha-3",
    distance_km: 1.4,
    estimated_load_kg: 185
  },
  {
    rank: 2,
    bin_id: "A102",
    name: "Tech Quad Smart Bin A102",
    zone: "Zone A",
    fill_level: 87,
    waste_type: "Plastic & Packaging",
    priority: "Critical",
    urgency_level: "Immediate",
    time_to_overflow: "1.5 hrs",
    recommended_vehicle: "Route Unit Alpha-3",
    distance_km: 2.1,
    estimated_load_kg: 112
  },
  {
    rank: 3,
    bin_id: "A108",
    name: "Innovation Way Sensor Bin A108",
    zone: "Zone A",
    fill_level: 84,
    waste_type: "E-Waste & Batteries",
    priority: "Critical",
    urgency_level: "High",
    time_to_overflow: "2.1 hrs",
    recommended_vehicle: "Specialist HazMat-1",
    distance_km: 2.8,
    estimated_load_kg: 84
  },
  {
    rank: 4,
    bin_id: "C104",
    name: "Greenways Eco Hub C104",
    zone: "Zone C",
    fill_level: 79,
    waste_type: "Paper & Cardboard",
    priority: "High",
    urgency_level: "High",
    time_to_overflow: "3.2 hrs",
    recommended_vehicle: "Route Unit Beta-2",
    distance_km: 4.2,
    estimated_load_kg: 95
  },
  {
    rank: 5,
    bin_id: "D305",
    name: "Harbor Freight Logistics Bin D305",
    zone: "Zone D",
    fill_level: 68,
    waste_type: "Metal & Aluminum",
    priority: "Medium",
    urgency_level: "Moderate",
    time_to_overflow: "6.4 hrs",
    recommended_vehicle: "Heavy Unit Delta-1",
    distance_km: 5.6,
    estimated_load_kg: 240
  },
  {
    rank: 6,
    bin_id: "D310",
    name: "Wharf Pier Logistics Bin D310",
    zone: "Zone D",
    fill_level: 53,
    waste_type: "Glass & Bottles",
    priority: "Medium",
    urgency_level: "Standard",
    time_to_overflow: "9.5 hrs",
    recommended_vehicle: "Route Unit Beta-2",
    distance_km: 6.1,
    estimated_load_kg: 130
  }
];

export const MOCK_RECOMMENDATIONS = [
  {
    id: "REC-101",
    title: "Immediate Route Dispatch for Zone B & A",
    category: "Dispatch Optimization",
    urgency: "HIGH",
    impact: "Prevents 2 imminent overflows",
    description: "Bin B201 (91%) and Bin A102 (87%) are approaching overflow threshold within 1.5 hours.",
    recommended_action: "Dispatch Fleet Truck Alpha-3 to execute combined Route Sequence B201 -> A102.",
    potential_savings: "Saves ~18.4 km in detour transit."
  },
  {
    id: "REC-102",
    title: "E-Waste Spike Detected in Zone A",
    category: "Anomaly Detection",
    urgency: "MEDIUM",
    impact: "High-value material segregation",
    description: "Tech Quad sensor A108 exhibits a 3.4x weekly rate increase for electronic waste items.",
    recommended_action: "Schedule Specialist HazMat-1 pickup and deploy secondary battery segregation bin.",
    potential_savings: "Recovers an estimated $420 in recyclable circuit components."
  },
  {
    id: "REC-103",
    title: "Organic Composting Heat Sensor Alert",
    category: "Safety & Bio-Energy",
    urgency: "LOW",
    impact: "Prevents aerobic decomposition odor",
    description: "Compactor B201 temperature has reached 26.1°C under high organic load.",
    recommended_action: "Route to City Bio-Gas Digestor Facility by 18:00 today.",
    potential_savings: "Generates ~45 kWh methane green energy output."
  }
];

export const SAMPLE_WASTE_PRESETS = [
  {
    id: "plastic_bottle",
    name: "PET Water Bottle",
    category: "RECYCLABLE",
    material: "Polyethylene Terephthalate (PET #1)",
    confidence: 98.4,
    detected_object: "Clear Plastic Beverage Container",
    recommended_action: "Compress and deposit in Blue Smart Bin (Plastic & Metals)",
    environmental_impact: "Saves 0.08 kg CO2 & 1.2 L water compared to virgin plastic production",
    circular_yield: "Grade-A Recycled Flakes for textile or new bottles",
    preview_url: "https://images.unsplash.com/photo-1562243061-204550d8a2c9?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "apple_core",
    name: "Organic Fruit Waste",
    category: "ORGANIC",
    material: "Biodegradable Organic Matter",
    confidence: 96.7,
    detected_object: "Apple Core & Fruit Peel",
    recommended_action: "Place in Green Smart Compost Bin",
    environmental_impact: "Produces 0.15 kg nutrient-rich bio-compost; eliminates methane in landfills",
    circular_yield: "Bio-gas generation & organic farming fertilizer",
    preview_url: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "cardboard_box",
    name: "Corrugated Cardboard Box",
    category: "RECYCLABLE",
    material: "Uncoated Cellulose Fiber",
    confidence: 97.2,
    detected_object: "Shipping Cardboard Packaging",
    recommended_action: "Flatten and insert into Yellow Paper Bin",
    environmental_impact: "Saves 17 trees & 7,000 gallons of water per ton recycled",
    circular_yield: "Pulp slurry for 100% recycled carton packaging",
    preview_url: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "lithium_battery",
    name: "Lithium-Ion Battery",
    category: "HAZARDOUS / E-WASTE",
    material: "Cobalt, Nickel & Lithium Alloy",
    confidence: 99.1,
    detected_object: "Rechargeable Lithium Cell",
    recommended_action: "Place in Red HazMat E-Waste Receptacle only",
    environmental_impact: "Prevents toxic heavy metal groundwater contamination",
    circular_yield: "Critical mineral extraction (Cobalt & Lithium recovery rate 95%)",
    preview_url: "https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "aluminum_can",
    name: "Aluminum Soda Can",
    category: "RECYCLABLE",
    material: "High-Purity Aluminum (Al-3004)",
    confidence: 98.9,
    detected_object: "Carbonated Drink Aluminum Can",
    recommended_action: "Deposit in Blue Smart Bin (Metals stream)",
    environmental_impact: "Requires 95% less energy to recycle than smelting new bauxite",
    circular_yield: "Infinite closed-loop recycling lifecycle (60 days back to shelf)",
    preview_url: "https://images.unsplash.com/photo-1584441405886-bc91be61e56a?w=600&auto=format&fit=crop&q=80"
  }
];

export const MOCK_RESOURCE_RECOVERY = {
  materials: [
    { name: "Recycled Plastics (PET/HDPE)", recovered_tons: 72.1, market_value_usd: 28840, co2_offset_tons: 108.2, circular_score: 94 },
    { name: "Recovered Aluminum & Copper", recovered_tons: 25.0, market_value_usd: 37500, co2_offset_tons: 212.5, circular_score: 98 },
    { name: "Clean Paper Pulp", recovered_tons: 32.0, market_value_usd: 6400, co2_offset_tons: 38.4, circular_score: 88 },
    { name: "Bio-Methane & Compost", recovered_tons: 164.2, market_value_usd: 13710, co2_offset_tons: 82.1, circular_score: 91 }
  ],
  circular_metrics: {
    total_economic_value_usd: 86450,
    total_co2_offset_tons: 441.2,
    trees_saved_equivalent: 5440,
    landfill_diversion_rate: 76.8,
    water_saved_cubic_meters: 14200
  },
  supply_chain_partners: [
    { name: "GreenCycle Advanced Polymers", stream: "PET/HDPE Pellets", status: "Active", monthly_tons: 45 },
    { name: "EcoSmelt Metals Processing", stream: "Aluminum & Brass", status: "Active", monthly_tons: 18 },
    { name: "Metro BioPower Co.", stream: "Organic Compost", status: "Active", monthly_tons: 120 },
    { name: "RePaper Packaging Hub", stream: "Carton & Pulp", status: "Active", monthly_tons: 28 }
  ]
};

export const MOCK_TREATMENT_FACILITIES = [
  {
    facility_id: "FAC-TR01",
    name: "Central Waste Treatment & Waste-to-Energy Plant",
    type: "Treatment Plant",
    type_code: "TREATMENT_PLANT",
    zone: "Zone D (Harbor Industrial)",
    coordinates: [16, 1.8, -10],
    latitude: 37.7715,
    longitude: -122.4135,
    status: "Operational",
    status_tone: "good",
    input_stream: "Mixed Municipal Solid Waste & Non-Segregated Residue",
    processing_mode: "Thermal Mass-Burn & Biological Treatment",
    capacity_tons_day: 650,
    current_load_tons_day: 485,
    utilization_percent: 74.6,
    recovery_rate_percent: 78.4,
    power_generation_mwh: "42.5 MWh/day",
    emission_reduction_co2: "148 tons/day",
    last_update: "2 mins ago"
  },
  {
    facility_id: "FAC-RC02",
    name: "Metro Advanced Polymer Recycling Facility",
    type: "Recycling Center",
    type_code: "RECYCLING_CENTER",
    zone: "Zone A (Tech Corridor)",
    coordinates: [-14, 1.8, 12],
    latitude: 37.7742,
    longitude: -122.4205,
    status: "Operational",
    status_tone: "good",
    input_stream: "PET, HDPE, PP Polymers & Packaging Containers",
    processing_mode: "Multi-Spectral AI Optical Sorting & Granulation",
    capacity_tons_day: 320,
    current_load_tons_day: 254,
    utilization_percent: 79.4,
    recovery_rate_percent: 94.2,
    circular_output: "Grade-A Recycled Polymer Pellets",
    emission_reduction_co2: "86 tons/day",
    last_update: "5 mins ago"
  },
  {
    facility_id: "FAC-PC03",
    name: "North Bio-Waste Composting & Anaerobic Digestion Plant",
    type: "Waste Processing",
    type_code: "PROCESSING_CENTER",
    zone: "Zone C (Residential Green)",
    coordinates: [-16, 1.8, -14],
    latitude: 37.7790,
    longitude: -122.4225,
    status: "Operational",
    status_tone: "good",
    input_stream: "Organic Food Waste, Agricultural Scraps & Biomass",
    processing_mode: "Thermophilic Anaerobic Digestion & Aerated Static Piles",
    capacity_tons_day: 400,
    current_load_tons_day: 312,
    utilization_percent: 78.0,
    recovery_rate_percent: 91.0,
    circular_output: "Bio-Methane Gas & Nitrogen-Rich Organic Fertilizer",
    emission_reduction_co2: "112 tons/day",
    last_update: "8 mins ago"
  },
  {
    facility_id: "FAC-RR04",
    name: "Circular Precious Metal & Secondary Resource Recovery Hub",
    type: "Resource Recovery",
    type_code: "RESOURCE_RECOVERY",
    zone: "Zone B (Central Core)",
    coordinates: [8, 1.8, 14],
    latitude: 37.7758,
    longitude: -122.4170,
    status: "Operational",
    status_tone: "good",
    input_stream: "E-Waste, Telecom PCBs, Connectors, High-Grade Alloys",
    processing_mode: "Hydrometallurgical Precious Metal Refining",
    capacity_tons_day: 150,
    current_load_tons_day: 118,
    utilization_percent: 78.7,
    recovery_rate_percent: 96.8,
    circular_output: "Gold (Au-999), Silver (Ag-925), Pure Copper & Aluminum",
    emission_reduction_co2: "64 tons/day",
    last_update: "11 mins ago"
  }
];

