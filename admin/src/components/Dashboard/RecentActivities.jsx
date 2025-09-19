import React, { useState, useEffect } from 'react';
import { getRecentActivities } from '../../services/api';

const RecentActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await getRecentActivities();
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setError('Failed to load recent activities');
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'appointment':
        return '📅';
      case 'patient':
        return '👤';
      case 'payment':
        return '💰';
      case 'system':
        return '⚙️';
      default:
        return '📋';
    }
  };

  if (loading) {
    return (
      <div className="recent-activities">
        <h3>Recent Activities</h3>
        <div className="loading">Loading activities...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recent-activities">
        <h3>Recent Activities</h3>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="recent-activities">
      <h3>Recent Activities</h3>
      <div className="activities-list">
        {activities.length === 0 ? (
          <p className="no-activities">No recent activities</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                <span className="icon">{getActivityIcon(activity.type)}</span>
              </div>
              <div className="activity-content">
                <p className="activity-text">{activity.description}</p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivities;