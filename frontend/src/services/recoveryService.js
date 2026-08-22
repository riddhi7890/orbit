// E-Waste & Resource Recovery Service: POST /api/v1/recovery/analyze, GET /api/v1/recovery/records

import { apiClient } from './api';
import { transformRecoveryAnalysis } from '../utils/adapters';

export async function analyzeRecovery(payload = { category: 'e_waste', item_type: 'charger' }) {
  try {
    const { data } = await apiClient('/api/v1/recovery/analyze', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    return {
      data: transformRecoveryAnalysis(data),
      isMock: false
    };
  } catch (err) {
    console.warn('[ORBIT API] Recovery analyze request failed:', err.message);
    return {
      data: {
        success: true,
        category: payload.category || 'e_waste',
        item_type: payload.item_type || 'electronic_scrap',
        is_recoverable: true,
        recoverable_materials: ['copper', 'circuit_alloys', 'gold_traces', 'silver_alloys'],
        handling_recommendation: 'Route to hydrometallurgical recovery center',
        record: {
          id: 'REC-FALLBACK',
          category: payload.category || 'e_waste',
          item_type: payload.item_type || 'electronic_scrap',
          is_recoverable: true,
          status: 'identified'
        }
      },
      isMock: true
    };
  }
}

export async function getRecoveryRecords() {
  try {
    const { data } = await apiClient('/api/v1/recovery/records');
    const records = Array.isArray(data) ? data : (data.records || []);
    return {
      data: records,
      count: data.count || records.length,
      isMock: false
    };
  } catch (err) {
    console.warn('[ORBIT API] Recovery records request failed:', err.message);
    return {
      data: [],
      count: 0,
      isMock: true
    };
  }
}
