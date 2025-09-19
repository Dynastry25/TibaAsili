import React, { useState, useEffect } from 'react';

const ExpertForm = ({ expert, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: expert?.name || '',
    specialty: expert?.specialty || '',
    experience: expert?.experience || '',
    qualifications: expert?.qualifications || '',
    bio: expert?.bio || '',
    email: expert?.email || '',
    phone: expert?.phone || '',
    image: expert?.image || '',
    isActive: expert?.isActive !== undefined ? expert.isActive : true
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(expert?.image || '');

  const specialties = [
    'Herbal Medicine',
    'Traditional Healing',
    'Acupuncture',
    'Ayurveda',
    'Naturopathy',
    'Nutrition',
    'Physical Therapy',
    'Mental Health',
    'Chiropractic',
    'Homeopathy'
  ];

  useEffect(() => {
    if (expert?.image) {
      setImagePreview(expert.image);
    }
  }, [expert]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.specialty.trim()) {
      newErrors.specialty = 'Specialty is required';
    }

    if (!formData.experience.trim()) {
      newErrors.experience = 'Experience is required';
    } else if (isNaN(formData.experience) || parseInt(formData.experience) < 0) {
      newErrors.experience = 'Experience must be a valid number';
    }

    if (!formData.qualifications.trim()) {
      newErrors.qualifications = 'Qualifications are required';
    }

    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
    } else if (formData.bio.length < 50) {
      newErrors.bio = 'Bio should be at least 50 characters long';
    }

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (expert) {
        onSubmit(expert.id, formData);
      } else {
        onSubmit(formData);
      }
    }
  };

  const removeImage = () => {
    setImagePreview('');
    setFormData(prev => ({ ...prev, image: '' }));
  };

  return (
    <form onSubmit={handleSubmit} className="modern-form">
      <div className="form-row">
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter expert's full name"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Specialty *</label>
          <select
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            className={errors.specialty ? 'error' : ''}
          >
            <option value="">Select Specialty</option>
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
          {errors.specialty && <span className="error-message">{errors.specialty}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Years of Experience *</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Years of experience"
            min="0"
            max="50"
            className={errors.experience ? 'error' : ''}
          />
          {errors.experience && <span className="error-message">{errors.experience}</span>}
        </div>

        <div className="form-group">
          <label>Qualifications *</label>
          <input
            type="text"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            placeholder="e.g., MD, PhD, Certified Herbalist"
            className={errors.qualifications ? 'error' : ''}
          />
          {errors.qualifications && <span className="error-message">{errors.qualifications}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="expert@example.com"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+255 XXX XXX XXX"
          className={errors.phone ? 'error' : ''}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label>Bio *</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell us about the expert's background, expertise, and achievements..."
          rows="4"
          className={errors.bio ? 'error' : ''}
        />
        {errors.bio && <span className="error-message">{errors.bio}</span>}
        <small className="form-help">{formData.bio.length}/500 characters (Minimum 50)</small>
      </div>

      <div className="form-group">
        <label>Profile Image</label>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
          {imagePreview ? (
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  border: '2px solid #e9ecef'
                }}
              />
              <button
                type="button"
                onClick={removeImage}
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                ×
              </button>
            </div>
          ) : (
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '8px',
                background: '#f8f9fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed #dee2e6'
              }}
            >
              <span style={{ color: '#6c757d', fontSize: '12px' }}>No image</span>
            </div>
          )}
          
          <label
            style={{
              background: '#3498db',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            📷 Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <small className="form-help">Upload a professional profile photo (Recommended: 300x300px)</small>
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
            cursor: 'pointer',
            fontWeight: '600'
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
          {expert ? 'Update Expert' : 'Create Expert'}
        </button>
      </div>
    </form>
  );
};

export default ExpertForm;