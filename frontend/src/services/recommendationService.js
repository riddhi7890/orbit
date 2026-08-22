// Recommendations Service: GET /api/v1/recommendations

import { apiClient } from './api';
import { transformRecommendations } from '../utils/adapters';
import { MOCK_RECOMMENDATIONS } from '../data/mockData';

export async function getRecommendations() {
  try {
    const { data } = await apiClient('/api/v1/recommendations');
    const rawList = Array.isArray(data) ? data : (data.recommendations || data.items || []);
    if (rawList.length === 0) throw new Error('Empty recommendations from backend');
    return {
      data: transformRecommendations(rawList),
      isMock: false
    };
  } catch (err) {
    return {
      data: transformRecommendations(MOCK_RECOMMENDATIONS),
      isMock: true
    };
  }
}
