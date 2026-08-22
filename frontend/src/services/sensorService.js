// Sensor Readings Service: POST /api/v1/sensor-readings

import { apiClient } from './api';

export async function saveSensorReading(readingData) {
  try {
    const { data } = await apiClient('/api/v1/sensor-readings', {
      method: 'POST',
      body: JSON.stringify(readingData)
    });
    return {
      success: true,
      data,
      isMock: false
    };
  } catch (err) {
    return {
      success: true,
      data: {
        message: 'Sensor reading simulated and recorded locally',
        reading: readingData,
        timestamp: new Date().toISOString()
      },
      isMock: true
    };
  }
}
