import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../../services/api';
import StatsCard from './StatsCard';
import RecentActivities from './RecentActivities';
import '../../styles/Dashboard.css'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalAppointments: 0,
    todayAppointments: 0,
    completedAppointments: 0,
    totalDoctors: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setError('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <h2>Dashboard</h2>
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <h2>Dashboard</h2>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      
      <div className="stats-grid">
        <StatsCard
          title="Total Patients"
          value={stats.totalPatients}
          icon="patients"
          trend="up"
          trendValue="+12%"
        />
        <StatsCard
          title="Total Appointments"
          value={stats.totalAppointments}
          icon="appointments"
          trend="up"
          trendValue="+8%"
        />
        <StatsCard
          title="Today's Appointments"
          value={stats.todayAppointments}
          icon="today"
        />
        <StatsCard
          title="Completed Appointments"
          value={stats.completedAppointments}
          icon="completed"
          trend="up"
          trendValue="+15%"
        />
        <StatsCard
          title="Total Doctors"
          value={stats.totalDoctors}
          icon="doctors"
        />
      </div>

      <RecentActivities />
    </div>
  );
};

export default Dashboard;