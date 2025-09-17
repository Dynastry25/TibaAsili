import React from 'react';
import './CTA.css';
import { useNavigate } from 'react-router-dom';

const CTA = () => {
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate('/login');
  };

  const handleContact = () => {
    navigate('/contact');
  };

  return (
    <section className="cta">
      <div className="container">
        <h2>Tafuta Mtaalamu wa Tiba Asili Leo</h2>
        <p>Jiunge na mfumo wetu na upate huduma bora za tiba asili kutoka kwa wataalamu wetu</p>
        <div className="cta-buttons">
          <button className="btn-secondary" onClick={handleJoin}>Jiunge Sasa</button>
          <button className="btn-primary" onClick={handleContact}>Wasiliana Nasi</button>
        </div>
      </div>
    </section>
  );
};

export default CTA;