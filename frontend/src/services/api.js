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
  updateProfile: (data) => API.put('/auth/profile', data),
  changePassword: (data) => API.put('/auth/change-password', data),
  updateLanguage: (lang) => API.put('/auth/profile', { languagePreference: lang }),
};

// Members Services
export const memberService = {
  apply: (data) => API.post('/members/apply', data),
  getProfile: () => API.get('/members/profile'),
  getMyStatus: () => API.get('/members/profile'),
  getAll: (params) => API.get('/admin/members', { params }),
  updateStatus: (id, status) => API.put(`/admin/members/${id}/role`, { status }),
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
  getAll: (params) => API.get('/news', { params }),
  getBySlug: (slug) => API.get(`/news/${slug}`),
  create: (data) => API.post('/news', data),
  update: (id, data) => API.put(`/news/${id}`, data),
  delete: (id) => API.delete(`/news/${id}`),
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
  requestHelp: (data) => API.post('/help', data),
  trackTicket: (ticketNo) => API.get(`/help/track/${ticketNo}`),
  getAllAdmin: (params) => API.get('/admin/help-requests', { params }),
};

// Donations Services
export const donationService = {
  initiate: (data) => API.post('/donations/initiate', data),
  verifyPayment: (data) => API.post('/donations/verify', data),
  recordBankTransfer: (data) => API.post('/donations/bank-transfer', data),
  getStats: () => API.get('/admin/donations'),
};

// Contact & Volunteer Services
export const volunteerService = {
  register: (data) => API.post('/volunteer/register', data),
  getAll: (params) => API.get('/admin/volunteers', { params }),
};

export const contactService = {
  sendMessage: (data) => API.post('/contact', data),
  getAllAdmin: (params) => API.get('/admin/messages', { params }),
};

export const messageService = {
  sendContact: (data) => API.post('/contact', data),
  registerVolunteer: (data) => API.post('/volunteer/register', data),
};

// Site Settings Services
export const siteSettingsService = {
  getPublic: () => API.get('/site-settings'),
  updateSettings: (data) => API.put('/site-settings', data),
};

// Admin Services
export const adminService = {
  getOverviewStats: () => API.get('/admin/overview'),
  getMembers: (params) => API.get('/admin/members', { params }),
  updateMemberRole: (id, role) => API.put(`/admin/members/${id}/role`, { role }),
  getVolunteers: (params) => API.get('/admin/volunteers', { params }),
  updateVolunteerStatus: (id, status) => API.put(`/admin/volunteers/${id}/status`, { status }),
  getHelpRequests: (params) => API.get('/admin/help-requests', { params }),
  updateHelpStatus: (id, data) => API.put(`/admin/help-requests/${id}`, data),
  getDonations: (params) => API.get('/admin/donations', { params }),
  verifyDonation: (id, status) => API.put(`/admin/donations/${id}/verify`, { status }),
  getMessages: (params) => API.get('/admin/messages', { params }),
};

export default API;
