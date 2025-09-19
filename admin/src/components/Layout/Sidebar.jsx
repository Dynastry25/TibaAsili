import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: 'dashboard' },
    { path: '/patients', label: 'Patients', icon: 'patients' },
    { path: '/appointments', label: 'Appointments', icon: 'appointments' },
    { path: '/calendar', label: 'Calendar', icon: 'calendar' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Tiba Asili</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                <span className={`icon icon-${item.icon}`}></span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <p>Version 1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;