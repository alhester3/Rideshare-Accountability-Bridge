const BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env && (import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL)) ||
  (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL) ||
  "http://localhost:5000/api";

const apiCall = async (endpoint, method = "GET", body = null) => {
  const options = {
    method,
    headers: { "Content-Type": "application/json" }
  };

  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.status === 204 ? null : response.json();
};

export const usersAPI = {
  getAll: () => apiCall("/users"),
  getById: (id) => apiCall(`/users/${id}`),
  getByRole: (role) => apiCall(`/users/role/${role}`),
  create: (user) => apiCall("/users", "POST", user),
  update: (id, user) => apiCall(`/users/${id}`, "PUT", user),
  updateStatus: async (id, status) => {
    const current = await apiCall(`/users/${id}`);
    return apiCall(`/users/${id}`, "PUT", { ...current.user, accountStatus: status });
  }
};

export const appealsAPI = {
  getAll: (filters = {}) => apiCall(`/appeals?${new URLSearchParams(filters)}`),
  getById: (id) => apiCall(`/appeals/${id}`),
  getByUser: (userId) => apiCall(`/appeals/user/${userId}`),
  submit: (appeal) => apiCall("/appeals", "POST", appeal),
  updateStatus: (id, status, notes) => apiCall(`/appeals/${id}/status`, "PUT", { status, notes }),
  resolve: (id, resolution) => apiCall(`/appeals/${id}/resolve`, "PUT", resolution)
};

export const decisionsAPI = {
  getAll: (filters = {}) => apiCall(`/decisions?${new URLSearchParams(filters)}`),
  getById: (id) => apiCall(`/decisions/${id}`),
  getByUser: (userId) => apiCall(`/decisions/user/${userId}`),
  flag: (id) => apiCall(`/decisions/${id}/flag`, "PUT"),
  overturn: (id) => apiCall(`/decisions/${id}/overturn`, "PUT")
};

export const tripsAPI = {
  getAll: () => apiCall("/trips"),
  getByUser: (userId) => apiCall(`/trips/user/${userId}`),
  getByDriver: (driverId) => apiCall(`/trips/driver/${driverId}`)
};

export const fairnessAPI = {
  getAll: () => apiCall("/fairness"),
  getSummary: () => apiCall("/fairness/summary"),
  getByZone: (zone) => apiCall(`/fairness/zone/${zone}`)
};

export const auditAPI = {
  getAll: (filters = {}) => apiCall(`/audit?${new URLSearchParams(filters)}`),
  getByDecision: (decisionId) => apiCall(`/audit/decision/${decisionId}`),
  export: () => apiCall("/audit/export")
};
