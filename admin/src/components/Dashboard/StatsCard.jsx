import React from 'react';

const StatsCard = ({ title, value, icon, color, trend, trendValue }) => {
  return (
    <div 
      className="modern-card"
      style={{ 
        background: color,
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        fontSize: '6rem',
        opacity: '0.1',
        transform: 'rotate(15deg)'
      }}>
        {icon}
      </div>
      
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '1rem'
        }}>
          <div>
            <div style={{ 
              fontSize: '0.9rem', 
              opacity: 0.9,
              marginBottom: '0.5rem'
            }}>
              {title}
            </div>
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700',
              lineHeight: 1
            }}>
              {value}
            </div>
          </div>
          
          <div style={{
            fontSize: '2rem',
            opacity: 0.8
          }}>
            {icon}
          </div>
        </div>
        
        {trend && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            opacity: 0.9
          }}>
            <span>{trend === 'up' ? '📈' : '📉'}</span>
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;