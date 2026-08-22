// Waste Statistics Service: GET /api/v1/waste/stats

import { apiClient } from './api';
import { transformWasteStats } from '../utils/adapters';
import { MOCK_WASTE_STATS } from '../data/mockData';

export async function getWasteStats() {
  try {
    const { data } = await apiClient('/api/v1/waste/stats');
    return {
      data: transformWasteStats(data),
      isMock: false
    };
  } catch (err) {
    return {
      data: transformWasteStats(MOCK_WASTE_STATS),
      isMock: true
    };
  }
}
