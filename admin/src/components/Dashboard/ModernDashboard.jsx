import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../../services/api';
import StatsCard from './StatsCard';
import RecentActivities from './RecentActivities';
import VideoSection from '../Video/VideoSection';
import ExpertsSection from '../Experts/ExpertsSection';
import QuickActions from './QuickActions';

const ModernDashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalAppointments: 0,
    todayAppointments: 0,
    completedAppointments: 0,
    totalDoctors: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-dashboard">
      {/* Quick Actions */}
      <QuickActions />
      
      {/* Stats Grid */}
      <div className="dashboard-grid">
        <StatsCard
          title="Total Patients"
          value={stats.totalPatients}
          icon="👥"
          color="linear-gradient(135deg, #3498db, #2980b9)"
          trend="up"
          trendValue="+12%"
        />
        <StatsCard
          title="Appointments"
          value={stats.totalAppointments}
          icon="📅"
          color="linear-gradient(135deg, #e74c3c, #c0392b)"
          trend="up"
          trendValue="+8%"
        />
        <StatsCard
          title="Today's Appointments"
          value={stats.todayAppointments}
          icon="⏰"
          color="linear-gradient(135deg, #f39c12, #e67e22)"
        />
        <StatsCard
          title="Completed"
          value={stats.completedAppointments}
          icon="✅"
          color="linear-gradient(135deg, #27ae60, #219a52)"
          trend="up"
          trendValue="+15%"
        />
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Left Column */}
        <div>
          <RecentActivities />
          <VideoSection />
        </div>

        {/* Right Column */}
        <div>
          <ExpertsSection />
        </div>
      </div>
    </div>
  );
};

export default ModernDashboard;