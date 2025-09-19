import api from './api';

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    const { token, user } = response.data;
    
    if (token) {
      localStorage.setItem('authToken', token);
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    
    return user;
  } catch (error) {
    // Handle different error responses
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data.message || 'Login failed');
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      throw new Error('An unexpected error occurred');
    }
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.Authorization;
  } catch (error) {
    throw new Error('Logout failed');
  }
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    const response = await api.get('/auth/me');
    return response.data.user;
  } catch (error) {
    localStorage.removeItem('authToken');
    return null;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    const { token, user } = response.data;
    
    if (token) {
      localStorage.setItem('authToken', token);
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    
    return user;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};