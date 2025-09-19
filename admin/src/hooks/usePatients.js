import { useState, useEffect } from 'react';
import { getPatients } from '../services/patients';

const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await getPatients();
      setPatients(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch patients');
      console.error('Error fetching patients:', err);
    } finally {
      setLoading(false);
    }
  };

  const addPatient = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  const updatePatient = (updatedPatient) => {
    setPatients(patients.map(patient => 
      patient.id === updatedPatient.id ? updatedPatient : patient
    ));
  };

  const deletePatient = (patientId) => {
    setPatients(patients.filter(patient => patient.id !== patientId));
  };

  return {
    patients,
    loading,
    error,
    refetch: fetchPatients,
    addPatient,
    updatePatient,
    deletePatient
  };
};

export default usePatients;