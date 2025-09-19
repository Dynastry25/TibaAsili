import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const ModernSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/patients', label: 'Patients', icon: '👥' },
    { path: '/appointments', label: 'Appointments', icon: '📅' },
    { path: '/calendar', label: 'Calendar', icon: '🗓️' },
    { 
      path: '/manage-experts', 
      label: 'Manage Experts', 
      icon: '🎓',
      subItems: [
        { path: '/experts', label: 'View Experts' },
        { path: '/manage-experts', label: 'Manage Experts' }
      ]
    },
    { 
      path: '/manage-videos', 
      label: 'Manage Videos', 
      icon: '🎬',
      subItems: [
        { path: '/videos', label: 'View Videos' },
        { path: '/manage-videos', label: 'Manage Videos' }
      ]
    },
    { path: '/reports', label: 'Reports', icon: '📈' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="modern-sidebar">
      <div className="modern-sidebar-header">
        <h3>🌿 Tiba Asili</h3>
      </div>
      
      <nav className="modern-nav">
        {menuItems.map((item) => (
          <div key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => 
                `modern-nav-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="modern-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
            
            {/* Show sub-items if active */}
            {item.subItems && location.pathname.startsWith(item.path) && (
              <div style={{ paddingLeft: '2rem', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>
                {item.subItems.map((subItem) => (
                  <NavLink
                    key={subItem.path}
                    to={subItem.path}
                    className={({ isActive }) => 
                      `modern-nav-link ${isActive ? 'active' : ''}`
                    }
                    style={{ 
                      padding: '0.75rem 1rem',
                      fontSize: '0.9rem',
                      borderLeft: '2px solid transparent'
                    }}
                  >
                    <span style={{ marginLeft: '0.5rem' }}>↳ {subItem.label}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      
      <div className="modern-sidebar-footer">
        <p style={{ padding: '1rem', textAlign: 'center', color: '#95a5a6', fontSize: '0.8rem' }}>
          Version 2.0.0
        </p>
      </div>
    </aside>
  );
};

export default ModernSidebar;