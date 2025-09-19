import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAppointment } from '../../services/appointments';
import { getPatients } from '../../services/patients';
import { getDoctors } from '../../services/api';

const AppointmentForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    type: 'consultation',
    reason: '',
    notes: ''
  });

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const [patientsResponse, doctorsResponse] = await Promise.all([
        getPatients(),
        getDoctors()
      ]);
      
      setPatients(patientsResponse.data);
      setDoctors(doctorsResponse.data);
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createAppointment(formData);
      navigate('/appointments');
    } catch (error) {
      console.error('Error creating appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointment-form">
      <h2>Schedule New Appointment</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="patientId">Patient</label>
            <select
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
            >
              <option value="">Select Patient</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="doctorId">Doctor</label>
            <select
              id="doctorId"
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="type">Appointment Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="consultation">Consultation</option>
              <option value="checkup">Checkup</option>
              <option value="followup">Follow-up</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="reason">Reason for Visit</label>
          <input
            type="text"
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate('/appointments')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Scheduling...' : 'Schedule Appointment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;