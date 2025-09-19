import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const ModernHeader = () => {
  const { user, logout } = useAuth();

  return (
    <header className="modern-header">
      <div className="header-left">
        <h1 style={{ 
          background: 'linear-gradient(135deg, #3498db, #e74c3c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0,
          fontSize: '1.5rem',
          fontWeight: '700'
        }}>
          Admin Dashboard
        </h1>
      </div>
      
      <div className="header-right">
        <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: '600', color: '#2c3e50' }}>{user?.name}</div>
            <div style={{ fontSize: '0.9rem', color: '#95a5a6' }}>{user?.role}</div>
          </div>
          
          <div 
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3498db, #e74c3c)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '600',
              fontSize: '1rem'
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          
          <button
            onClick={logout}
            style={{
              background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 15px rgba(231, 76, 60, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default ModernHeader;