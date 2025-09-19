import React from 'react';
import ModernSidebar from './ModernSidebar';
import ModernHeader from './ModernHeader';
import '../../styles/Modern.css';

const ModernLayout = ({ children }) => {
  return (
    <div className="modern-layout">
      <ModernSidebar />
      <div className="modern-main-content">
        <ModernHeader />
        <main className="modern-content animate-fade">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ModernLayout;