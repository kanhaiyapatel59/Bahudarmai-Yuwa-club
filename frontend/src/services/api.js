import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach bearer token if present
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('byc_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept 401 unauth errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear invalid token
      localStorage.removeItem('byc_token');
    }
    return Promise.reject(error);
  }
);

// Auth Service
export const authService = {
  login: (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
  getMe: () => API.get('/auth/me'),
  updateLanguage: (lang) => API.put('/auth/language', { lang }),
};

// Member Service
export const memberService = {
  apply: (data) => API.post('/members/apply', data),
  getMyStatus: () => API.get('/members/my-status'),
  getAll: (params) => API.get('/members', { params }),
  updateStatus: (id, data) => API.put(`/members/${id}/status`, data),
};

// Volunteer Service
export const volunteerService = {
  apply: (data) => API.post('/volunteers/apply', data),
  getAll: (params) => API.get('/volunteers', { params }),
  updateStatus: (id, data) => API.put(`/volunteers/${id}/status`, data),
};

// Event Service
export const eventService = {
  getEvents: (params) => API.get('/events', { params }),
  getBySlug: (slug) => API.get(`/events/${slug}`),
  register: (data) => API.post('/events/register', data),
  create: (data) => API.post('/events', data),
  update: (id, data) => API.put(`/events/${id}`, data),
  delete: (id) => API.delete(`/events/${id}`),
  getParticipants: (eventId) => API.get(`/events/${eventId}/participants`),
};

// News and Notice Service
export const newsNoticeService = {
  getAll: (params) => API.get('/news-notices', { params }),
  getAllAdmin: (params) => API.get('/news-notices/admin', { params }),
  getBySlug: (slug) => API.get(`/news-notices/${slug}`),
  create: (data) => API.post('/news-notices', data),
  update: (id, data) => API.put(`/news-notices/${id}`, data),
  delete: (id) => API.delete(`/news-notices/${id}`),
};

// Blood Donor Service
export const bloodDonorService = {
  search: (params) => API.get('/blood-donors/search', { params }),
  register: (data) => API.post('/blood-donors/register', data),
  requestContact: (data) => API.post('/blood-donors/request-contact', data),
  getAllAdmin: (params) => API.get('/blood-donors/admin', { params }),
  updateAvailability: (id, isAvailable) => API.put(`/blood-donors/${id}/availability`, { isAvailable }),
};

// Community Help Request Service
export const helpService = {
  requestHelp: (data) => API.post('/help-requests/request', data),
  trackTicket: (ticketNo) => API.get(`/help-requests/track/${ticketNo}`),
  getAllAdmin: (params) => API.get('/help-requests/admin', { params }),
  updateStatus: (id, data) => API.put(`/help-requests/${id}/status`, data),
};

// Donation Service
export const donationService = {
  record: (data) => API.post('/donations/record', data),
  getStats: () => API.get('/donations/stats'),
  getAllAdmin: (params) => API.get('/donations/admin', { params }),
  updateStatus: (id, data) => API.put(`/donations/${id}/status`, data),
};

// Leadership Service
export const leadershipService = {
  getAll: () => API.get('/leadership'),
  create: (data) => API.post('/leadership', data),
  update: (id, data) => API.put(`/leadership/${id}`, data),
  delete: (id) => API.delete(`/leadership/${id}`),
};

// Achievement Service
export const achievementService = {
  getAll: () => API.get('/achievements'),
  create: (data) => API.post('/achievements', data),
  update: (id, data) => API.put(`/achievements/${id}`, data),
  delete: (id) => API.delete(`/achievements/${id}`),
};

// Gallery Service
export const galleryService = {
  getAll: (params) => API.get('/gallery', { params }),
  getById: (id) => API.get(`/gallery/${id}`),
  create: (data) => API.post('/gallery', data),
  update: (id, data) => API.put(`/gallery/${id}`, data),
  delete: (id) => API.delete(`/gallery/${id}`),
};

// Contact Service
export const contactService = {
  sendMessage: (data) => API.post('/contact/send', data),
  getAllAdmin: (params) => API.get('/contact/admin', { params }),
  markRead: (id) => API.put(`/contact/${id}/read`),
};

// Site Settings Service
export const siteSettingsService = {
  getPublic: () => API.get('/site-settings/public'),
  update: (data) => API.put('/site-settings', data),
};

export default API;
