import React from 'react';

const ExpertList = ({ experts, onEdit, onDelete }) => {
  if (experts.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '3rem', 
        color: '#6c757d',
        background: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👨‍⚕️</div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>No Experts Found</h4>
        <p style={{ margin: 0 }}>Add your first expert to showcase your team of professionals.</p>
      </div>
    );
  }

  return (
    <div className="expert-list">
      <div style={{ 
        display: 'grid', 
        gap: '1.5rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' 
      }}>
        {experts.map((expert) => (
          <div
            key={expert.id}
            className="modern-card"
            style={{ 
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow)';
            }}
          >
            {!expert.isActive && (
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: '#e74c3c',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600',
                zIndex: 2
              }}>
                Inactive
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <img
                src={expert.image || `https://ui-avatars.com/api/?name=${expert.name}&background=3498db&color=fff&size=100`}
                alt={expert.name}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #e9ecef',
                  marginRight: '1rem'
                }}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${expert.name}&background=3498db&color=fff&size=80`;
                }}
              />
              
              <div style={{ flex: 1 }}>
                <h4 style={{ 
                  margin: '0 0 0.25rem 0', 
                  color: '#2c3e50',
                  fontSize: '1.1rem'
                }}>
                  {expert.name}
                </h4>
                
                <div style={{ 
                  background: 'linear-gradient(135deg, #3498db, #2980b9)',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  display: 'inline-block'
                }}>
                  {expert.specialty}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                  ⏱️ {expert.experience} years experience
                </span>
                
                <span style={{ 
                  background: '#e8f5e8',
                  color: '#27ae60',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: '500'
                }}>
                  {expert.qualifications}
                </span>
              </div>

              <p style={{ 
                color: '#6c757d', 
                fontSize: '0.9rem',
                margin: '0',
                lineHeight: '1.4',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {expert.bio}
              </p>
            </div>

            {(expert.email || expert.phone) && (
              <div style={{ 
                padding: '0.75rem',
                background: '#f8f9fa',
                borderRadius: '6px',
                marginBottom: '1rem'
              }}>
                {expert.email && (
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ marginRight: '0.5rem', color: '#6c757d' }}>📧</span>
                    <span style={{ fontSize: '0.9rem', color: '#2c3e50' }}>{expert.email}</span>
                  </div>
                )}
                
                {expert.phone && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '0.5rem', color: '#6c757d' }}>📞</span>
                    <span style={{ fontSize: '0.9rem', color: '#2c3e50' }}>{expert.phone}</span>
                  </div>
                )}
              </div>
            )}

            <div style={{ 
              display: 'flex', 
              gap: '0.5rem',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => onEdit(expert)}
                style={{
                  background: '#f39c12',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#e67e22';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#f39c12';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                ✏️ Edit
              </button>
              
              <button
                onClick={() => onDelete(expert.id)}
                style={{
                  background: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#c0392b';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#e74c3c';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertList;