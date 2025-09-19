import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAppointments, updateAppointmentStatus } from '../../services/appointments';
import Table from '../Common/Table';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAppointments();
  }, [filter]);

  const fetchAppointments = async () => {
    try {
      const response = await getAppointments(filter);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await updateAppointmentStatus(appointmentId, newStatus);
      fetchAppointments(); // Refresh the list
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const columns = [
    { header: 'Patient', accessor: 'patientName' },
    { header: 'Date', accessor: 'date' },
    { header: 'Time', accessor: 'time' },
    { header: 'Doctor', accessor: 'doctorName' },
    { header: 'Type', accessor: 'type' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => (
        <span className={`status-badge ${row.status}`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className="action-buttons">
          {row.status === 'scheduled' && (
            <>
              <button
                onClick={() => handleStatusChange(row.id, 'completed')}
                className="btn-success btn-sm"
              >
                Complete
              </button>
              <button
                onClick={() => handleStatusChange(row.id, 'cancelled')}
                className="btn-danger btn-sm"
              >
                Cancel
              </button>
            </>
          )}
          <Link to={`/appointments/${row.id}`} className="btn-view btn-sm">
            View
          </Link>
        </div>
      )
    }
  ];

  if (loading) return <div>Loading appointments...</div>;

  return (
    <div className="appointment-list">
      <div className="page-header">
        <h2>Appointments</h2>
        <div className="header-actions">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Appointments</option>
            <option value="today">Today</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <Link to="/appointments/new" className="btn-primary">
            New Appointment
          </Link>
        </div>
      </div>
      
      <Table data={appointments} columns={columns} />
    </div>
  );
};

export default AppointmentList;