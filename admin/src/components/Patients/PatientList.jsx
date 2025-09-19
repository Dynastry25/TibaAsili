import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPatients, deletePatient } from '../../services/patients';
import Table from '../Common/Table';
import Button from '../Common/Button';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await getPatients();
      
      // Ensure we have an array of patients
      if (response.data && Array.isArray(response.data.patients)) {
        setPatients(response.data.patients);
      } else if (Array.isArray(response.data)) {
        setPatients(response.data);
      } else {
        console.error('Invalid patients data format:', response.data);
        setPatients([]);
        setError('Invalid data format received from server');
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
      setError('Failed to fetch patients');
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await deletePatient(id);
        setPatients(patients.filter(patient => patient.id !== id));
      } catch (error) {
        setError('Failed to delete patient');
        console.error('Error deleting patient:', error);
      }
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Age', accessor: 'age' },
    { header: 'Gender', accessor: 'gender' },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className="action-buttons">
          <Link to={`/patients/${row.id}`} className="btn-view">
            View
          </Link>
          <Button
            variant="danger"
            size="small"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="patient-list">
      <div className="page-header">
        <h2>Patients</h2>
        <Link to="/patients/new" className="btn-primary">
          Add New Patient
        </Link>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <Button onClick={fetchPatients} size="small">
            Retry
          </Button>
        </div>
      )}

      <Table 
        data={patients} 
        columns={columns} 
        loading={loading}
        emptyMessage="No patients found. Click 'Add New Patient' to get started."
      />
    </div>
  );
};

export default PatientList;