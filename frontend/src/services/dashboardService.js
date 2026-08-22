// Dashboard Service: GET /api/v1/dashboard

import { apiClient } from './api';
import { transformDashboardData } from '../utils/adapters';
import { MOCK_DASHBOARD } from '../data/mockData';

export async function getDashboard() {
  try {
    const { data } = await apiClient('/api/v1/dashboard');
    return {
      data: transformDashboardData(data),
      isMock: false
    };
  } catch (err) {
    return {
      data: transformDashboardData(MOCK_DASHBOARD),
      isMock: true
    };
  }
}
