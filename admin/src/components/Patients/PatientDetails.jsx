import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPatient } from '../../services/patients';

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPatient();
  }, [id]);

  const fetchPatient = async () => {
    try {
      const response = await getPatient(id);
      setPatient(response.data);
    } catch (error) {
      setError('Failed to fetch patient details');
      console.error('Error fetching patient:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading patient details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!patient) return <div>Patient not found</div>;

  return (
    <div className="patient-details">
      <div className="page-header">
        <h2>Patient Details</h2>
        <Link to="/patients" className="btn-secondary">
          Back to Patients
        </Link>
      </div>
      
      <div className="patient-info-card">
        <div className="patient-header">
          <h3>{patient.name}</h3>
          <span className={`status-badge ${patient.status || 'active'}`}>
            {patient.status || 'Active'}
          </span>
        </div>
        
        <div className="patient-details-grid">
          <div className="detail-group">
            <label>Email</label>
            <p>{patient.email}</p>
          </div>
          
          <div className="detail-group">
            <label>Phone</label>
            <p>{patient.phone}</p>
          </div>
          
          <div className="detail-group">
            <label>Age</label>
            <p>{patient.age}</p>
          </div>
          
          <div className="detail-group">
            <label>Gender</label>
            <p>{patient.gender}</p>
          </div>
          
          <div className="detail-group full-width">
            <label>Address</label>
            <p>{patient.address || 'No address provided'}</p>
          </div>
          
          {patient.medicalHistory && (
            <div className="detail-group full-width">
              <label>Medical History</label>
              <p>{patient.medicalHistory}</p>
            </div>
          )}
        </div>
        
        <div className="patient-actions">
          <Link 
            to={`/patients/edit/${patient.id}`} 
            className="btn-primary"
          >
            Edit Patient
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;