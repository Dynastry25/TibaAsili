import React, { useState, useEffect } from 'react';
import { getVideos, createVideo, updateVideo, deleteVideo } from '../../services/videos';
import VideoForm from './VideoForm';
import VideoList from './VideoList';

const VideoManager = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await getVideos();
      setVideos(response.data);
    } catch (error) {
      setError('Failed to fetch videos');
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVideo = async (videoData) => {
    try {
      const response = await createVideo(videoData);
      setVideos([...videos, response.data]);
      setShowForm(false);
      setError('');
    } catch (error) {
      setError('Failed to create video');
      console.error('Error creating video:', error);
    }
  };

  const handleUpdateVideo = async (id, videoData) => {
    try {
      const response = await updateVideo(id, videoData);
      setVideos(videos.map(video => video.id === id ? response.data : video));
      setEditingVideo(null);
      setError('');
    } catch (error) {
      setError('Failed to update video');
      console.error('Error updating video:', error);
    }
  };

  const handleDeleteVideo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video?')) {
      return;
    }

    try {
      await deleteVideo(id);
      setVideos(videos.filter(video => video.id !== id));
      setError('');
    } catch (error) {
      setError('Failed to delete video');
      console.error('Error deleting video:', error);
    }
  };

  const handleEditVideo = (video) => {
    setEditingVideo(video);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingVideo(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="modern-card">
        <div className="loading-spinner"></div>
        <p>Loading videos...</p>
      </div>
    );
  }

  return (
    <div className="video-manager">
      <div className="modern-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3>🎬 Video Management</h3>
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: 'linear-gradient(135deg, #3498db, #2980b9)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            + Add New Video
          </button>
        </div>

        {error && (
          <div className="error-message" style={{ marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        {showForm ? (
          <VideoForm
            video={editingVideo}
            onSubmit={editingVideo ? handleUpdateVideo : handleCreateVideo}
            onCancel={handleCancelEdit}
          />
        ) : (
          <VideoList
            videos={videos}
            onEdit={handleEditVideo}
            onDelete={handleDeleteVideo}
          />
        )}
      </div>
    </div>
  );
};

export default VideoManager;