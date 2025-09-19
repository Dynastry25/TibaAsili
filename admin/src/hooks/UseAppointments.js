import { useState, useEffect } from 'react';
import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from '../services/appointments';

const useAppointments = (filter = 'all') => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, [filter]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await getAppointments(filter);
      setAppointments(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch appointments');
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const addAppointment = async (appointmentData) => {
    try {
      const response = await createAppointment(appointmentData);
      setAppointments(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to create appointment');
    }
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      const response = await updateAppointment(id, { status });
      setAppointments(prev => 
        prev.map(app => app.id === id ? response.data : app)
      );
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to update appointment');
    }
  };

  const removeAppointment = async (id) => {
    try {
      await deleteAppointment(id);
      setAppointments(prev => prev.filter(app => app.id !== id));
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to delete appointment');
    }
  };

  return {
    appointments,
    loading,
    error,
    refetch: fetchAppointments,
    addAppointment,
    updateAppointmentStatus,
    removeAppointment
  };
};

export default useAppointments;