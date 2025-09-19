import api from './api';

export const getPatients = async (params = {}) => {
  try {
    const response = await api.get('/patients', { params });
    
    // Handle different response formats
    if (response.data && Array.isArray(response.data.patients)) {
      return { ...response, data: response.data.patients };
    } else if (response.data && Array.isArray(response.data)) {
      return response;
    } else if (Array.isArray(response.data)) {
      return response;
    } else {
      console.warn('Unexpected response format from /patients:', response.data);
      return { ...response, data: [] };
    }
  } catch (error) {
    console.error('Error in getPatients:', error);
    throw error;
  }
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