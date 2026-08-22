
// Collection Priority Service
// Uses GET /api/v1/bins + POST /api/v1/collection/check

import { apiClient } from './api';
import { transformCollectionPriority } from '../utils/adapters';
import { MOCK_COLLECTION_PRIORITY } from '../data/mockData';

export async function getCollectionPriority() {
  try {
    // 1. Get all bins from backend
    const { data: binsResponse } = await apiClient('/api/v1/bins');

    const bins = Array.isArray(binsResponse)
      ? binsResponse
      : (binsResponse?.bins || binsResponse?.items || []);

    if (bins.length === 0) {
      throw new Error('No bins returned from backend');
    }

    // 2. Calculate priority for each bin via POST /api/v1/collection/check
    const priorityResults = await Promise.all(
      bins.map(async (bin) => {
        const binId = bin.id || bin.bin_id;
        const fillLevel = Number(bin.fill_level ?? bin.fill ?? 0);

        try {
          const { data } = await apiClient('/api/v1/collection/check', {
            method: 'POST',
            body: JSON.stringify({
              bin_id: binId,
              fill_level: fillLevel,
            }),
          });

          return {
            ...data,
            id: binId,
            bin_id: binId,
            location: bin.location || bin.zone,
            zone: bin.location || bin.zone,
            waste_type: bin.waste_type,
            fill_level: fillLevel,
          };
        } catch (checkErr) {
          // If check endpoint errors for an individual bin, preserve real bin data with computed priority
          return {
            id: binId,
            bin_id: binId,
            location: bin.location || bin.zone,
            zone: bin.location || bin.zone,
            waste_type: bin.waste_type,
            fill_level: fillLevel,
            priority: fillLevel >= 80 ? 'Critical' : fillLevel >= 50 ? 'Medium' : 'Low'
          };
        }
      })
    );

    return {
      data: transformCollectionPriority(priorityResults),
      isMock: false,
    };
  } catch (err) {
    console.warn('[ORBIT API] Collection priority request failed:', err.message);

    return {
      data: transformCollectionPriority(MOCK_COLLECTION_PRIORITY),
      isMock: true,
    };
  }
}