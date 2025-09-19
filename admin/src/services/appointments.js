import api from './api';

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