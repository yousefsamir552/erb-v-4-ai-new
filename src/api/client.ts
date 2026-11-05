/**
 * API Client for Django REST Framework
 */

const BASE_URL = 'http://127.0.0.1:8000/api';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const currentUser = localStorage.getItem('factory_erp_current_user');
  const parsedUser = currentUser ? JSON.parse(currentUser) : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(parsedUser?.username ? { 'X-User-Username': parsedUser.username } : {}),
    ...((options.headers as Record<string, string>) || {})
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.detail || errData.message || `API error ${res.status}`);
  }

  return await res.json();
}

export const api = {
  // الأدوار والمستخدمين
  getRoles: () => request<any[]>('/roles/'),
  createRole: (data: any) => request<any>('/roles/', { method: 'POST', body: JSON.stringify(data) }),
  getUsers: () => request<any[]>('/users/'),
  createUser: (data: any) => request<any>('/users/', { method: 'POST', body: JSON.stringify(data) }),

  // الأقمشة والخامات
  getFabrics: () => request<any[]>('/fabrics/'),
  // توفير دالة الألوان لمنع خطأ TypeError
  getFabricColors: async () => [],

  // الموردين والمقاسات (توفير الدوال حتى لا يتعطل الاستدعاء في AppContext)
  getSuppliers: async () => [],
  getSizeDefs: async () => [],

  // الإكسسوارات
  getAccessories: () => request<any[]>('/accessories/'),
  getAccessoryAlerts: () => request<any>('/accessories/alerts/'),

  // الموديلات وسجلات الإنتاج
  getModels: () => request<any[]>('/models/'),
  createModel: (data: any) => request<any>('/models/', { method: 'POST', body: JSON.stringify(data) }),
  getCuttingRecords: () => request<any[]>('/cutting-records/'),
  getQCRecords: () => request<any[]>('/qc-records/'),
  getDispatches: () => request<any[]>('/dispatches/'),
  getSewingDispatches: () => request<any[]>('/sewing-dispatches/'),

  // التنبيهات والرسائل الداخلية
  getNotifications: () => request<any>('/notifications/'),
  getInternalMessages: () => request<any[]>('/internal-messages/')
};