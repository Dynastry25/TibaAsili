import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getVideos } from '../../services/videos';

const VideoSection = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await getVideos();
      setVideos(response.data.slice(0, 3)); // Show only 3 videos
      if (response.data.length > 0) {
        setSelectedVideo(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="modern-card">
        <div className="loading-spinner"></div>
        <p>Loading videos...</p>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="modern-card">
        <h3 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>📚 Educational Videos</h3>
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6c757d' }}>
          <p>No videos available. Add some educational content!</p>
          <Link
            to="/manage-videos"
            style={{
              background: 'linear-gradient(135deg, #3498db, #2980b9)',
              color: 'white',
              textDecoration: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '25px',
              fontWeight: '600',
              marginTop: '1rem',
              display: 'inline-block'
            }}
          >
            Add Videos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="modern-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0, color: '#2c3e50' }}>📚 Educational Videos</h3>
        <Link
          to="/manage-videos"
          style={{
            background: 'linear-gradient(135deg, #3498db, #2980b9)',
            color: 'white',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}
        >
          Manage Videos
        </Link>
      </div>

      {selectedVideo && (
        <>
          <div className="video-container">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>
              {selectedVideo.title}
            </h4>
            <p style={{ color: '#7f8c8d', margin: 0 }}>
              {selectedVideo.description}
            </p>
          </div>
        </>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', 
        gap: '1rem', 
        marginTop: '1.5rem' 
      }}>
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => setSelectedVideo(video)}
            style={{
              cursor: 'pointer',
              borderRadius: '8px',
              overflow: 'hidden',
              transition: 'transform 0.3s ease',
              border: selectedVideo?.id === video.id ? '3px solid #3498db' : '2px solid #e9ecef'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            <img
              src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
              alt={video.title}
              style={{ width: '100%', height: '80px', objectFit: 'cover' }}
            />
            <div style={{ 
              padding: '0.5rem', 
              fontSize: '0.8rem', 
              textAlign: 'center',
              background: selectedVideo?.id === video.id ? '#3498db' : '#f8f9fa',
              color: selectedVideo?.id === video.id ? 'white' : '#333'
            }}>
              {video.title.split(' ').slice(0, 3).join(' ')}...
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <Link
          to="/manage-videos"
          style={{
            background: 'transparent',
            color: '#3498db',
            border: '2px solid #3498db',
            padding: '0.75rem 1.5rem',
            borderRadius: '25px',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#3498db';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#3498db';
          }}
        >
          🎬 View All Videos
        </Link>
      </div>
    </div>
  );
};

export default VideoSection;