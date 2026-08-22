// Waste Classification Service: POST /api/v1/waste/classify

import { apiClient } from './api';
import { transformClassificationResult } from '../utils/adapters';
import { SAMPLE_WASTE_PRESETS } from '../data/mockData';

export async function classifyWaste(imageFile, presetId = null) {
  // If image file is provided, send real multipart/form-data to FastAPI backend
  if (imageFile instanceof File || imageFile instanceof Blob) {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const { data } = await apiClient('/api/v1/waste/classify', {
        method: 'POST',
        body: formData,
        timeout: 15000
      });

      return {
        data: transformClassificationResult(data),
        isMock: false
      };
    } catch (err) {
      console.warn('[ORBIT API] Waste classification request failed:', err.message);
      // Resilient fallback when backend is unreachable
      const fallbackPreset = SAMPLE_WASTE_PRESETS[0];
      return {
        data: transformClassificationResult(fallbackPreset),
        isMock: true
      };
    }
  }

  // If user selected a demo preset
  if (presetId) {
    const preset = SAMPLE_WASTE_PRESETS.find(p => p.id === presetId);
    if (preset) {
      await new Promise(r => setTimeout(r, 600));
      return {
        data: transformClassificationResult(preset),
        isMock: true
      };
    }
  }

  const defaultPreset = SAMPLE_WASTE_PRESETS[0];
  return {
    data: transformClassificationResult(defaultPreset),
    isMock: true
  };
}

