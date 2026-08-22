// Smart Bins Service: GET /api/v1/bins, GET /api/v1/bins/{bin_id}

import { apiClient } from './api';
import { transformBinData } from '../utils/adapters';
import { MOCK_BINS } from '../data/mockData';

export async function getBins() {
  try {
    const { data } = await apiClient('/api/v1/bins');
    const rawList = Array.isArray(data) ? data : (data.bins || data.items || []);
    if (rawList.length === 0) throw new Error('Empty bin list from backend');
    return {
      data: rawList.map(transformBinData),
      isMock: false
    };
  } catch (err) {
    return {
      data: MOCK_BINS.map(transformBinData),
      isMock: true
    };
  }
}

export async function getBin(binId) {
  try {
    const { data } = await apiClient(`/api/v1/bins/${binId}`);
    return {
      data: transformBinData(data),
      isMock: false
    };
  } catch (err) {
    const found = MOCK_BINS.find(b => b.bin_id === binId) || MOCK_BINS[0];
    return {
      data: transformBinData(found),
      isMock: true
    };
  }
}
