import api from './api';

export const getExperts = () => {
  return api.get('/experts');
};

export const getExpert = (id) => {
  return api.get(`/experts/${id}`);
};

export const createExpert = (expertData) => {
  return api.post('/experts', expertData);
};

export const updateExpert = (id, expertData) => {
  return api.put(`/experts/${id}`, expertData);
};

export const deleteExpert = (id) => {
  return api.delete(`/experts/${id}`);
};

export const getExpertSpecialties = () => {
  return api.get('/experts/specialties');
};