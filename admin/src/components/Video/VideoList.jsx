import React from 'react';

const VideoList = ({ videos, onEdit, onDelete }) => {
  if (videos.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#6c757d' }}>
        <p>No videos found. Add your first video to get started.</p>
      </div>
    );
  }

  return (
    <div className="video-list">
      <div style={{ 
        display: 'grid', 
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' 
      }}>
        {videos.map((video) => (
          <div
            key={video.id}
            className="modern-card"
            style={{ 
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow)';
            }}
          >
            <div style={{ position: 'relative' }}>
              <img
                src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                alt={video.title}
                style={{
                  width: '100%',
                  height: '160px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}
              />
              {!video.isActive && (
                <div style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  background: '#e74c3c',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  Inactive
                </div>
              )}
            </div>

            <h4 style={{ 
              margin: '0 0 0.5rem 0', 
              color: '#2c3e50',
              fontSize: '1rem',
              lineHeight: '1.4'
            }}>
              {video.title}
            </h4>

            <p style={{ 
              color: '#6c757d', 
              fontSize: '0.9rem',
              margin: '0 0 1rem 0',
              lineHeight: '1.4'
            }}>
              {video.description.length > 100 
                ? `${video.description.substring(0, 100)}...` 
                : video.description
              }
            </p>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{
                background: '#e3f2fd',
                color: '#1976d2',
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: '500'
              }}>
                {video.category}
              </span>
              
              {video.duration && (
                <span style={{
                  color: '#6c757d',
                  fontSize: '0.8rem'
                }}>
                  ⏱️ {video.duration} min
                </span>
              )}
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '0.5rem',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => onEdit(video)}
                style={{
                  background: '#f39c12',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(video.id)}
                style={{
                  background: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;