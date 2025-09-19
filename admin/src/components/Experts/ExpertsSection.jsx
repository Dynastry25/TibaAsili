import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getExperts } from '../../services/experts';

const ExpertsSection = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      const response = await getExperts();
      setExperts(response.data.slice(0, 3)); // Show only 3 experts
    } catch (error) {
      console.error('Error fetching experts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="modern-card">
        <div className="loading-spinner"></div>
        <p>Loading experts...</p>
      </div>
    );
  }

  return (
    <div className="modern-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0, color: '#2c3e50' }}>🎓 Our Experts</h3>
        <Link
          to="/manage-experts"
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
          Manage Experts
        </Link>
      </div>

      <div className="experts-grid">
        {experts.map((expert) => (
          <div key={expert.id} className="expert-card">
            <img
              src={expert.image || `https://ui-avatars.com/api/?name=${expert.name}&background=3498db&color=fff&size=100`}
              alt={expert.name}
              className="expert-image"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${expert.name}&background=3498db&color=fff&size=100`;
              }}
            />
            
            <h4 className="expert-name">{expert.name}</h4>
            <div className="expert-specialty">{expert.specialty}</div>
            
            <div style={{ 
              background: 'linear-gradient(135deg, #3498db, #2980b9)', 
              color: 'white', 
              padding: '0.25rem 0.75rem', 
              borderRadius: '20px', 
              fontSize: '0.8rem',
              marginBottom: '1rem',
              display: 'inline-block'
            }}>
              {expert.experience} years experience
            </div>
            
            <p className="expert-bio">
              {expert.bio.length > 100 ? `${expert.bio.substring(0, 100)}...` : expert.bio}
            </p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <Link
          to="/manage-experts"
          style={{
            background: 'transparent',
            color: '#3498db',
            border: '2px solid #3498db',
            padding: '0.75rem 1.5rem',
            borderRadius: '25px',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            display: 'inline-block'
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
          👥 View All Experts
        </Link>
      </div>
    </div>
  );
};

export default ExpertsSection;