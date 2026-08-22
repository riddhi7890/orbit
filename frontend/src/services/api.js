// Central API Client with Base URL, Timeout, and Graceful Error Handling



const DEFAULT_BASE_URL = 'http://localhost:8000';

export function getApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/+$/, '');
  }
  const savedUrl = localStorage.getItem('orbit_api_base_url');
  if (savedUrl && savedUrl.trim().length > 0) {
    return savedUrl.trim().replace(/\/+$/, '');
  }
  return DEFAULT_BASE_URL;
}

export async function apiClient(endpoint, options = {}) {
  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${cleanEndpoint}`;

  const defaultHeaders = {
    'Accept': 'application/json',
  };

  // If not FormData, default to application/json
  if (!(options.body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  // Include Auth token if present
  const token = localStorage.getItem('orbit_auth_token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout || 8000);

  try {
    const response = await fetch(url, {
      ...config,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`API Error ${response.status}: ${errorText || response.statusText}`);
    }

    const data = await response.json().catch(() => ({}));
    return { data, isMock: false };
  } catch (err) {
    clearTimeout(timeoutId);
    // Log friendly warning and pass upward for fallback handling
    console.warn(`[ORBIT API Notice] Could not connect to ${url}. Reason: ${err.message}. Engaging resilient fallback mode.`);
    throw err;
  }
}
