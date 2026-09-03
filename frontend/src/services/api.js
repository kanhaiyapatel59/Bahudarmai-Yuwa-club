import axios from 'axios';

// Auto-detect production API URL when deployed on Vercel or accessed via mobile
const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://bahudarmai-yuwa-club-api.onrender.com/api/v1';
  }
  return 'http://localhost:5001/api/v1';
};

const API = axios.create({
  baseURL: getBaseURL(),
  timeout: 8000,
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

// Intercept 401 unauth errors silently
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('byc_token');
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  login: (credentials) => API.post('/auth/login', credentials),
  register: (userData) => API.post('/auth/register', userData),
  getMe: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/language', data),
  changePassword: (data) => API.put('/auth/change-password', data),
  updateLanguage: (lang) => API.put('/auth/language', { lang, languagePreference: lang }),
};

// Members Services
export const memberService = {
  apply: (data) => API.post('/members/apply', data),
  getProfile: () => API.get('/members/my-status'),
  getMyStatus: () => API.get('/members/my-status'),
  getAll: (params) => API.get('/members', { params }),
  updateStatus: (id, status) => API.put(`/members/${id}/status`, { status }),
};

// Events Services
export const eventService = {
  getEvents: (params) => API.get('/events', { params }),
  getBySlug: (slug) => API.get(`/events/${slug}`),
  create: (data) => API.post('/events', data),
  update: (id, data) => API.put(`/events/${id}`, data),
  delete: (id) => API.delete(`/events/${id}`),
};

// News & Notices Services
export const articleService = {
  getAll: (params) => API.get('/news-notices', { params }),
  getBySlug: (slug) => API.get(`/news-notices/${slug}`),
  create: (data) => API.post('/news-notices', data),
  update: (id, data) => API.put(`/news-notices/${id}`, data),
  delete: (id) => API.delete(`/news-notices/${id}`),
};
export const newsNoticeService = articleService;

// Gallery Services
export const galleryService = {
  getAll: (params) => API.get('/gallery', { params }),
  create: (data) => API.post('/gallery', data),
  delete: (id) => API.delete(`/gallery/${id}`),
};

// Leadership / Executive Committee Services
export const leadershipService = {
  getAll: (params) => API.get('/leadership', { params }),
  create: (data) => API.post('/leadership', data),
  update: (id, data) => API.put(`/leadership/${id}`, data),
  delete: (id) => API.delete(`/leadership/${id}`),
};

// Achievements Services
export const achievementService = {
  getAll: () => API.get('/achievements'),
  create: (data) => API.post('/achievements', data),
  delete: (id) => API.delete(`/achievements/${id}`),
};

// Blood Donors Services
export const bloodDonorService = {
  search: (params) => API.get('/blood-donors', { params }),
  register: (data) => API.post('/blood-donors/register', data),
  requestContact: (data) => API.post('/blood-donors/request-contact', data),
};

// Community Help Request Services
export const helpService = {
  requestHelp: (data) => API.post('/help-requests/request', data),
  trackTicket: (ticketNo) => API.get(`/help-requests/track/${ticketNo}`),
  getAllAdmin: (params) => API.get('/help-requests/admin', { params }),
  updateStatus: (id, status) => API.put(`/help-requests/${id}/status`, { status }),
};

// Donations Services
export const donationService = {
  initiate: (data) => API.post('/donations/record', data),
  verifyPayment: (data) => API.post('/donations/verify', data),
  recordBankTransfer: (data) => API.post('/donations/record', data),
  getStats: () => API.get('/donations/stats'),
  getAllAdmin: (params) => API.get('/donations/admin', { params }),
  updateStatus: (id, status) => API.put(`/donations/${id}/status`, { status }),
};

// Contact & Volunteer Services
export const volunteerService = {
  register: (data) => API.post('/volunteers/apply', data),
  getAll: (params) => API.get('/volunteers', { params }),
  updateStatus: (id, status) => API.put(`/volunteers/${id}/status`, { status }),
};

export const contactService = {
  sendMessage: (data) => API.post('/contact/send', data),
  getAllAdmin: (params) => API.get('/contact/admin', { params }),
  markRead: (id) => API.put(`/contact/${id}/read`),
};

export const messageService = {
  sendContact: (data) => API.post('/contact/send', data),
  registerVolunteer: (data) => API.post('/volunteers/apply', data),
  getAllAdmin: (params) => API.get('/contact/admin', { params }),
};

// Site Settings Services
export const siteSettingsService = {
  getPublic: () => API.get('/site-settings'),
  updateSettings: (data) => API.put('/site-settings', data),
  update: (data) => API.put('/site-settings', data),
};

// Admin Services Alias Mapping
export const adminService = {
  getOverviewStats: () => API.get('/site-settings'),
  getMembers: (params) => API.get('/members', { params }),
  updateMemberRole: (id, role) => API.put(`/members/${id}/status`, { role }),
  getVolunteers: (params) => API.get('/volunteers', { params }),
  updateVolunteerStatus: (id, status) => API.put(`/volunteers/${id}/status`, { status }),
  getHelpRequests: (params) => API.get('/help-requests/admin', { params }),
  updateHelpStatus: (id, data) => API.put(`/help-requests/${id}/status`, data),
  getDonations: (params) => API.get('/donations/admin', { params }),
  verifyDonation: (id, status) => API.put(`/donations/${id}/status`, { status }),
  getMessages: (params) => API.get('/contact/admin', { params }),
};

export default API;
