// Centralized API Client for BRAND+ Frontend

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.brandplus.com.br/api/v1';

export class ApiError extends Error {
  public readonly code: string;
  public readonly status: number;

  constructor(message: string, code = 'API_ERROR', status = 400) {
    super(message);
    this.code = code;
    this.status = status;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

let accessToken: string | null = sessionStorage.getItem('bp_token');

export function setAccessToken(token: string | null) {
  accessToken = token;
  if (token) {
    sessionStorage.setItem('bp_token', token);
  } else {
    sessionStorage.removeItem('bp_token');
  }
}

export function getAccessToken(): string | null {
  return accessToken;
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  let url = endpoint.startsWith('http') ? endpoint : `${BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  if (options.params) {
    const query = new URLSearchParams(options.params).toString();
    url += `${url.includes('?') ? '&' : '?'}${query}`;
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const token = getAccessToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'omit', // Using explicit Bearer token in headers for cross-origin compatibility
  });

  let payload: any = null;
  try {
    payload = await response.json();
  } catch {
    // If response is not JSON
  }

  if (!response.ok || (payload && payload.success === false)) {
    const errorMsg = payload?.error?.message || `Erro de conexão com o servidor (${response.status}).`;
    const errorCode = payload?.error?.code || 'HTTP_ERROR';
    throw new ApiError(errorMsg, errorCode, response.status);
  }

  return (payload?.data !== undefined ? payload.data : payload) as T;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, body?: any, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  put: <T>(endpoint: string, body?: any, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(endpoint: string, body?: any, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(endpoint: string, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'DELETE' }),
};
