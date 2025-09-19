import React, { useState } from 'react';

const VideoForm = ({ video, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: video?.title || '',
    youtubeId: video?.youtubeId || '',
    description: video?.description || '',
    category: video?.category || 'education',
    duration: video?.duration || '',
    isActive: video?.isActive !== undefined ? video.isActive : true
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.youtubeId.trim()) {
      newErrors.youtubeId = 'YouTube ID is required';
    } else if (!/^[a-zA-Z0-9_-]{11}$/.test(formData.youtubeId)) {
      newErrors.youtubeId = 'Invalid YouTube ID format';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (video) {
        onSubmit(video.id, formData);
      } else {
        onSubmit(formData);
      }
    }
  };

  const extractYouTubeId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  const handlePasteUrl = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const videoId = extractYouTubeId(text);
      if (videoId) {
        setFormData(prev => ({ ...prev, youtubeId: videoId }));
      } else {
        alert('Invalid YouTube URL');
      }
    } catch (error) {
      console.error('Failed to read clipboard:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modern-form">
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter video title"
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label>YouTube ID *</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            name="youtubeId"
            value={formData.youtubeId}
            onChange={handleChange}
            placeholder="YouTube video ID"
            className={errors.youtubeId ? 'error' : ''}
            style={{ flex: 1 }}
          />
          <button
            type="button"
            onClick={handlePasteUrl}
            style={{
              background: '#95a5a6',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Paste URL
          </button>
        </div>
        {errors.youtubeId && <span className="error-message">{errors.youtubeId}</span>}
        <small className="form-help">
          Enter YouTube ID (11 characters) or paste a YouTube URL
        </small>
      </div>

      <div className="form-group">
        <label>Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter video description"
          rows="3"
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="education">Education</option>
            <option value="tutorial">Tutorial</option>
            <option value="interview">Interview</option>
            <option value="demonstration">Demonstration</option>
            <option value="testimonial">Testimonial</option>
          </select>
        </div>

        <div className="form-group">
          <label>Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration in minutes"
            min="1"
          />
        </div>
      </div>

      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          Active (Visible to users)
        </label>
      </div>

      {formData.youtubeId && (
        <div className="form-group">
          <label>Preview</label>
          <div style={{ 
            width: '100%', 
            height: '200px', 
            borderRadius: '8px',
            overflow: 'hidden',
            background: '#f8f9fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img
              src={`https://img.youtube.com/vi/${formData.youtubeId}/mqdefault.jpg`}
              alt="Video thumbnail"
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%',
                borderRadius: '4px'
              }}
            />
          </div>
        </div>
      )}

      <div className="form-actions">
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: '#95a5a6',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            background: 'linear-gradient(135deg, #27ae60, #219a52)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          {video ? 'Update Video' : 'Create Video'}
        </button>
      </div>
    </form>
  );
};

export default VideoForm;