// Adapters to normalize responses from FastAPI backend or fallback to consistent frontend schema

import {
  MOCK_DASHBOARD,
  MOCK_WASTE_STATS,
  MOCK_BINS,
  MOCK_COLLECTION_PRIORITY,
  MOCK_RECOMMENDATIONS
} from '../data/mockData';

// Deterministic coordinate generator for 3D visualization fallback
function getProceduralCoordinates(id) {
  const str = String(id || '0');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const x = -14 + (Math.abs(hash % 280) / 10);
  const z = -14 + (Math.abs((hash >> 3) % 280) / 10);
  return [Number(x.toFixed(1)), 1.2, Number(z.toFixed(1))];
}

export function transformDashboardData(data) {
  if (!data || typeof data !== 'object') return MOCK_DASHBOARD;
  
  // Support nested data if wrapped (e.g. data.dashboard or data.stats)
  const source = data.dashboard || data.stats || data.data || data;

  const totalWaste = source.total_waste_tons ?? source.total_waste ?? source.total_tons;
  const recyclableRate = source.recyclable_rate ?? source.recycling_rate ?? source.recycle_percentage ?? source.recovery_rate;
  const totalBins = source.total_bins ?? source.bins_count ?? source.total_bin_count;
  const activeBins = source.active_bins ?? source.online_bins ?? source.active_bin_count;
  const criticalBins = source.critical_bins ?? source.critical_count ?? source.critical_bin_count;

  return {
    total_waste_tons: totalWaste !== undefined ? Number(totalWaste) : MOCK_DASHBOARD.total_waste_tons,
    recyclable_rate: recyclableRate !== undefined ? Number(recyclableRate) : MOCK_DASHBOARD.recyclable_rate,
    organic_waste_tons: source.organic_waste_tons ?? source.organic_tons ?? MOCK_DASHBOARD.organic_waste_tons,
    general_waste_tons: source.general_waste_tons ?? source.general_tons ?? MOCK_DASHBOARD.general_waste_tons,
    e_waste_tons: source.e_waste_tons ?? source.ewaste_tons ?? MOCK_DASHBOARD.e_waste_tons,
    plastic_waste_tons: source.plastic_waste_tons ?? source.plastic_tons ?? MOCK_DASHBOARD.plastic_waste_tons,
    paper_waste_tons: source.paper_waste_tons ?? source.paper_tons ?? MOCK_DASHBOARD.paper_waste_tons,
    total_bins: totalBins !== undefined ? Number(totalBins) : MOCK_DASHBOARD.total_bins,
    active_bins: activeBins !== undefined ? Number(activeBins) : MOCK_DASHBOARD.active_bins,
    critical_bins: criticalBins !== undefined ? Number(criticalBins) : MOCK_DASHBOARD.critical_bins,
    high_priority_bins: source.high_priority_bins ?? source.high_priority_count ?? MOCK_DASHBOARD.high_priority_bins,
    collection_status: source.collection_status ?? (totalBins ? `${activeBins || totalBins} Bins Monitored` : MOCK_DASHBOARD.collection_status),
    co2_saved_tons: source.co2_saved_tons ?? source.co2_avoided ?? MOCK_DASHBOARD.co2_saved_tons,
    efficiency_score: source.efficiency_score ?? source.compliance_score ?? MOCK_DASHBOARD.efficiency_score,
    energy_conserved_mwh: source.energy_conserved_mwh ?? MOCK_DASHBOARD.energy_conserved_mwh,
    economic_value_recovered_usd: source.economic_value_recovered_usd ?? MOCK_DASHBOARD.economic_value_recovered_usd
  };
}

export function transformWasteStats(data) {
  if (!data || typeof data !== 'object') return MOCK_WASTE_STATS;

  const source = data.stats || data.data || data;

  // If backend returns a direct categories array
  if (Array.isArray(source.categories) && source.categories.length > 0) {
    return {
      summary: source.summary || {
        total_volume_tons: source.total_waste || source.total_volume || MOCK_WASTE_STATS.summary.total_volume_tons,
        recycled_volume_tons: source.recycled_volume || source.recycled_tons || MOCK_WASTE_STATS.summary.recycled_volume_tons,
        recovery_efficiency: source.recovery_rate || source.recovery_efficiency || MOCK_WASTE_STATS.summary.recovery_efficiency,
        compliance_score: source.compliance_score || MOCK_WASTE_STATS.summary.compliance_score
      },
      categories: source.categories,
      weekly_trend: Array.isArray(source.weekly_trend) && source.weekly_trend.length > 0 ? source.weekly_trend : MOCK_WASTE_STATS.weekly_trend,
      zone_segregation: Array.isArray(source.zone_segregation) && source.zone_segregation.length > 0 ? source.zone_segregation : MOCK_WASTE_STATS.zone_segregation
    };
  }

  // If backend returns flat category totals (e.g. { organic: 120, plastic: 45, paper: 30, ... })
  if (source.organic !== undefined || source.plastic !== undefined || source.general !== undefined) {
    const org = Number(source.organic || 0);
    const pla = Number(source.plastic || 0);
    const pap = Number(source.paper || 0);
    const met = Number(source.metal || source.metals || 0);
    const gla = Number(source.glass || 0);
    const ew = Number(source.e_waste || source.ewaste || 0);
    const gen = Number(source.general || source.non_recyclable || 0);
    const total = org + pla + pap + met + gla + ew + gen || 1;

    const computedCategories = [
      { name: "Organic", volume: org, percentage: Number(((org / total) * 100).toFixed(1)), color: "#10B981", recoverable: true },
      { name: "Plastics (PET/HDPE)", volume: pla, percentage: Number(((pla / total) * 100).toFixed(1)), color: "#0EA5E9", recoverable: true },
      { name: "Paper & Cardboard", volume: pap, percentage: Number(((pap / total) * 100).toFixed(1)), color: "#F59E0B", recoverable: true },
      { name: "Metals & Aluminum", volume: met, percentage: Number(((met / total) * 100).toFixed(1)), color: "#6366F1", recoverable: true },
      { name: "Glass", volume: gla, percentage: Number(((gla / total) * 100).toFixed(1)), color: "#14B8A6", recoverable: true },
      { name: "E-Waste", volume: ew, percentage: Number(((ew / total) * 100).toFixed(1)), color: "#EC4899", recoverable: true },
      { name: "General / Non-Recyclable", volume: gen, percentage: Number(((gen / total) * 100).toFixed(1)), color: "#94A3B8", recoverable: false }
    ].filter(c => c.volume > 0 || total === 1);

    return {
      summary: {
        total_volume_tons: Number(total.toFixed(1)),
        recycled_volume_tons: Number((org + pla + pap + met + gla + ew).toFixed(1)),
        recovery_efficiency: Number((((org + pla + pap + met + gla + ew) / total) * 100).toFixed(1)),
        compliance_score: source.compliance_score || 92.0
      },
      categories: computedCategories.length > 0 ? computedCategories : MOCK_WASTE_STATS.categories,
      weekly_trend: MOCK_WASTE_STATS.weekly_trend,
      zone_segregation: MOCK_WASTE_STATS.zone_segregation
    };
  }

  return MOCK_WASTE_STATS;
}

export function transformBinData(bin) {
  if (!bin || typeof bin !== 'object') return null;

  const binId = String(bin.bin_id ?? bin.id ?? 'UNKNOWN');
  const fill = Number(bin.fill_level ?? bin.fill ?? bin.percentage ?? 0);
  const locationName = bin.location || bin.zone || 'Zone A';

  // Normalize status and priority from real backend or calculate from fill level
  let rawStatus = String(bin.status || '').toLowerCase();
  let status = 'GOOD';
  if (rawStatus === 'critical' || fill >= 80) status = 'CRITICAL';
  else if (rawStatus === 'warning' || rawStatus === 'medium' || fill >= 50) status = 'MEDIUM';
  else status = 'GOOD';

  let priority = status === 'CRITICAL' ? 'Critical' : status === 'MEDIUM' ? 'Medium' : 'Low';
  if (bin.priority) priority = String(bin.priority);

  return {
    bin_id: binId,
    name: bin.name || (locationName ? `${locationName} - ${binId}` : `Smart Bin ${binId}`),
    zone: locationName,
    location: locationName,
    coordinates: bin.coordinates || getProceduralCoordinates(binId),
    latitude: bin.latitude ?? 37.7749,
    longitude: bin.longitude ?? -122.4194,
    fill_level: fill,
    capacity_liters: bin.capacity_liters ?? bin.capacity ?? 240,
    current_liters: bin.current_liters ?? Math.round((fill / 100) * (bin.capacity_liters ?? 240)),
    waste_type: bin.waste_type ?? bin.type ?? 'Mixed',
    status: status.toUpperCase(),
    priority,
    battery_level: bin.battery_level ?? bin.battery ?? 92,
    temperature_c: bin.temperature_c ?? bin.temperature ?? 22.5,
    last_reading: bin.last_reading ?? bin.updated_at ?? 'Just now',
    last_collected: bin.last_collected ?? 'Yesterday',
    estimated_time_to_overflow_hours: bin.estimated_time_to_overflow_hours ?? (fill > 80 ? 1.2 : fill > 50 ? 4.5 : 9.0),
    sensor_history: Array.isArray(bin.sensor_history) ? bin.sensor_history : [
      { time: '08:00', fill: Math.max(5, fill - 40) },
      { time: '10:00', fill: Math.max(15, fill - 30) },
      { time: '12:00', fill: Math.max(30, fill - 20) },
      { time: '14:00', fill: Math.max(45, fill - 10) },
      { time: '16:00', fill }
    ]
  };
}

export function transformCollectionPriority(data) {
  if (!Array.isArray(data) || data.length === 0) return MOCK_COLLECTION_PRIORITY;

  return data.map((item, idx) => {
    const binId = String(item.bin_id ?? item.id ?? `B${idx + 1}`);
    const fill = Number(item.fill_level ?? item.fill ?? 80);
    const location = item.location ?? item.zone ?? 'Zone A';

    // Check if priority came from POST /api/v1/collection/check
    let priorityStr = 'Normal';
    if (item.priority) {
      priorityStr = String(item.priority);
      if (priorityStr.toLowerCase() === 'high' || priorityStr.toLowerCase() === 'critical') {
        priorityStr = fill >= 85 ? 'Critical' : 'High';
      }
    } else {
      priorityStr = fill >= 85 ? 'Critical' : fill >= 70 ? 'High' : 'Normal';
    }

    const urgency = item.urgency_level ?? item.urgency ?? (fill >= 85 ? 'Immediate' : fill >= 70 ? 'High' : 'Standard');
    const estHours = item.time_to_overflow ?? item.estimated_overflow ?? `${Math.max(0.5, 5 - (fill / 20)).toFixed(1)} hrs`;

    return {
      rank: item.rank ?? (idx + 1),
      bin_id: binId,
      name: item.name ?? (location ? `${location} - ${binId}` : `Smart Bin ${binId}`),
      zone: location,
      location,
      fill_level: fill,
      waste_type: item.waste_type ?? 'Mixed',
      priority: priorityStr,
      urgency_level: urgency,
      time_to_overflow: estHours,
      recommended_vehicle: item.recommended_vehicle ?? (fill > 80 ? 'Heavy Compactor Truck' : 'Standard EV Collector'),
      distance_km: item.distance_km ?? Number((1.2 + (idx * 0.7)).toFixed(1)),
      estimated_load_kg: item.estimated_load_kg ?? Math.round(fill * 1.8),
      recommended_action: item.recommended_action ?? item.action ?? (fill >= 80 ? 'Dispatch collection immediately' : 'Schedule on next route')
    };
  });
}

export function transformRecommendations(data) {
  if (!Array.isArray(data) || data.length === 0) return MOCK_RECOMMENDATIONS;

  return data.map((rec, idx) => ({
    id: rec.id ?? `REC-${100 + idx}`,
    title: rec.title ?? rec.name ?? `Operational Action ${idx + 1}`,
    category: (rec.category ?? rec.type ?? 'Collection Intelligence').toUpperCase(),
    urgency: (rec.urgency ?? rec.priority ?? (idx === 0 ? 'HIGH' : 'MEDIUM')).toUpperCase(),
    impact: rec.impact ?? rec.impact_summary ?? 'Route efficiency optimization',
    description: rec.description ?? rec.message ?? rec.text ?? (typeof rec === 'string' ? rec : ''),
    recommended_action: rec.recommended_action ?? rec.action ?? rec.description ?? '',
    potential_savings: rec.potential_savings ?? rec.savings ?? ''
  }));
}

export function transformClassificationResult(data) {
  if (!data || typeof data !== 'object') return null;

  // Handle standard backend schema: { success: true, filename: "...", category: "plastic", confidence: 0.94 }
  const rawCategory = String(data.category ?? data.waste_type ?? 'plastic').toLowerCase();
  
  // Format category to standard uppercase display
  let displayCategory = 'RECYCLABLE';
  if (rawCategory === 'organic') displayCategory = 'ORGANIC';
  else if (rawCategory === 'e_waste' || rawCategory === 'ewaste') displayCategory = 'E-WASTE';
  else if (rawCategory === 'metal' || rawCategory === 'glass' || rawCategory === 'paper' || rawCategory === 'plastic' || rawCategory === 'recyclable') displayCategory = 'RECYCLABLE';
  else if (rawCategory === 'general' || rawCategory === 'non_recyclable') displayCategory = 'GENERAL';
  else displayCategory = rawCategory.toUpperCase();

  // Confidence normalization (e.g. 0.94 -> 94.0)
  let confidenceVal = Number(data.confidence ?? data.score ?? 0.95);
  if (confidenceVal <= 1.0 && confidenceVal > 0) {
    confidenceVal = confidenceVal * 100;
  }
  confidenceVal = Number(confidenceVal.toFixed(1));

  // Category-specific domain action and impact defaults
  const categoryMetadata = {
    organic: {
      action: 'Deposit into Green Smart Bin for anaerobic composting & bio-gas production',
      impact: 'Diverts compostable biomass from landfills, generating zero-emission renewable energy',
      yield: 'Grade-A nitrogen-rich organic bio-fertilizer',
      material: 'Organic Compostable Biomass'
    },
    plastic: {
      action: 'Deposit in Yellow Smart Bin (Clean PET/HDPE stream for optical flaking)',
      impact: 'Reduces crude oil demand and saves 1.8 tons CO₂ per ton recycled',
      yield: 'Grade-A recycled polymer pellets for closed-loop remanufacturing',
      material: 'PET / HDPE Thermoplastic Polymer'
    },
    paper: {
      action: 'Deposit in Blue Smart Bin (Keep dry, separate from food residues)',
      impact: 'Conserves 17 trees and 26,000 liters of water per ton of pulp recycled',
      yield: 'Clean recycled corrugated packaging pulp',
      material: 'Cellulose Fiber / Kraft Paper'
    },
    metal: {
      action: 'Deposit in Blue Smart Bin (Aluminum & Ferrous Metals stream)',
      impact: 'Requires 95% less energy to recycle than smelting virgin bauxite',
      yield: 'Infinite closed-loop metal alloy lifecycle',
      material: 'High-Purity Aluminum & Steel Alloy'
    },
    glass: {
      action: 'Deposit in Teal Glass Bin (Inspect for color segregation)',
      impact: '100% recyclable infinitely with zero loss in material quality',
      yield: 'Cullet feedstock for glass furnace remelting',
      material: 'Silica Container Glass'
    },
    e_waste: {
      action: 'Flag for Hydrometallurgical Precious Metal Extraction & Safe PCB Disassembly',
      impact: 'Recovers critical gold, silver, copper, and prevents heavy metal ground toxicity',
      yield: 'Au-999, Ag-925, pure copper & secondary electronic sub-assemblies',
      material: 'Electronic Circuitry & Secondary Alloys'
    }
  }[rawCategory] || {
    action: data.recommended_action || 'Deposit into designated municipal recycling receptacle',
    impact: data.environmental_impact || 'Reduces municipal landfill load and conserves raw natural resources',
    yield: data.circular_yield || 'High-grade post-consumer feedstock',
    material: data.material || 'Segregated Material Compound'
  };

  return {
    detected_object: data.detected_object ?? data.filename ?? data.item ?? `${displayCategory} Material Item`,
    category: displayCategory,
    raw_category: rawCategory,
    material: data.material ?? categoryMetadata.material,
    confidence: confidenceVal,
    recommended_action: data.recommended_action ?? categoryMetadata.action,
    environmental_impact: data.environmental_impact ?? categoryMetadata.impact,
    circular_yield: data.circular_yield ?? categoryMetadata.yield,
    is_recoverable: data.is_recoverable ?? (rawCategory !== 'general')
  };
}

export function transformRecoveryAnalysis(data) {
  if (!data || typeof data !== 'object') return null;

  return {
    success: Boolean(data.success ?? true),
    category: data.category ?? 'e_waste',
    item_type: data.item_type ?? 'electronic_component',
    is_recoverable: Boolean(data.is_recoverable ?? true),
    recoverable_materials: Array.isArray(data.recoverable_materials) ? data.recoverable_materials : ['copper', 'circuit_alloys'],
    handling_recommendation: data.handling_recommendation ?? 'Route to hydrometallurgical recovery center',
    record: data.record || null
  };
}

