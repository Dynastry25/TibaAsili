import axios from 'axios';

// Tumia URL ya localhost au production
const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth functions
export const login = (credentials) => {
  return api.post('/auth/login', credentials);
};

export const register = (userData) => {
  return api.post('/auth/register', userData);
};

export const getCurrentUser = () => {
  return api.get('/auth/me');
};

// Patient functions
export const getPatients = (params = {}) => {
  return api.get('/patients', { params });
};

export const getPatient = (id) => {
  return api.get(`/patients/${id}`);
};

export const createPatient = (data) => {
  return api.post('/patients', data);
};

export const updatePatient = (id, data) => {
  return api.put(`/patients/${id}`, data);
};

export const deletePatient = (id) => {
  return api.delete(`/patients/${id}`);
};

export const searchPatients = (query) => {
  return api.get('/patients/search', { params: { q: query } });
};

// Dashboard functions
export const getDashboardStats = () => {
  return api.get('/dashboard/stats');
};

export const getRecentActivities = () => {
  return api.get('/dashboard/activities');
};

// Doctor functions
export const getDoctors = () => {
  return api.get('/doctors');
};

export const getDoctor = (id) => {
  return api.get(`/doctors/${id}`);
};

export const createDoctor = (data) => {
  return api.post('/doctors', data);
};

export const updateDoctor = (id, data) => {
  return api.put(`/doctors/${id}`, data);
};

export const deleteDoctor = (id) => {
  return api.delete(`/doctors/${id}`);
};

// Appointment functions
export const getAppointments = (filter = 'all') => {
  return api.get('/appointments', { params: { filter } });
};

export const getAppointment = (id) => {
  return api.get(`/appointments/${id}`);
};

export const createAppointment = (data) => {
  return api.post('/appointments', data);
};

export const updateAppointment = (id, data) => {
  return api.put(`/appointments/${id}`, data);
};

export const deleteAppointment = (id) => {
  return api.delete(`/appointments/${id}`);
};

export const updateAppointmentStatus = (id, status) => {
  return api.patch(`/appointments/${id}/status`, { status });
};

export const getAppointmentStats = () => {
  return api.get('/appointments/stats');
};

// System functions
export const getDatabaseStatus = () => {
  return api.get('/system/database-status');
};

export const getDatabaseStats = () => {
  return api.get('/system/database-stats');
};

export default api;