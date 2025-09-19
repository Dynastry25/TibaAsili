import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  const actions = [
    {
      title: "Add Patient",
      icon: "👥",
      path: "/patients/new",
      color: "linear-gradient(135deg, #3498db, #2980b9)"
    },
    {
      title: "Schedule Appointment",
      icon: "📅",
      path: "/appointments/new",
      color: "linear-gradient(135deg, #e74c3c, #c0392b)"
    },
    {
      title: "Add Expert",
      icon: "🎓",
      path: "/manage-experts",
      color: "linear-gradient(135deg, #27ae60, #219a52)"
    },
    {
      title: "Add Video",
      icon: "🎬",
      path: "/manage-videos",
      color: "linear-gradient(135deg, #f39c12, #e67e22)"
    }
  ];

  return (
    <div className="quick-actions">
      {actions.map((action, index) => (
        <Link
          key={index}
          to={action.path}
          style={{
            background: action.color,
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            textDecoration: 'none',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '120px'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-4px)';
            e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            {action.icon}
          </span>
          <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>
            {action.title}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default QuickActions;