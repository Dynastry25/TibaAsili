import React, { useState } from 'react';
import './Diseases.css';
import { useDiseases } from '../../Context/DiseasesContext';

const Diseases = () => {
  const { diseases, setSelectedDisease } = useDiseases();
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (disease) => {
    if (activeCard === disease.id) {
      setActiveCard(null);
      setSelectedDisease(null);
    } else {
      setActiveCard(disease.id);
      setSelectedDisease(disease);
    }
  };

  return (
    <section className="container" id="diseases">
      <h2 className="section-title">Aina za Magonjwa ambayo Matabibu Wanapatikana</h2>
      <p className="section-subtitle">Tunatoa huduma za tiba asili kwa magonjwa mbalimbali</p>
      
      <div className="diseases-grid">
        {diseases.map((disease) => (
          <div 
            key={disease.id} 
            className={`disease-card ${activeCard === disease.id ? 'active' : ''}`}
            onClick={() => handleCardClick(disease)}
          >
            <div className="disease-icon">
              <i className={disease.icon}></i>
            </div>
            <h3>{disease.name}</h3>
            <p>{disease.description}</p>
            {activeCard === disease.id && (
              <div className="disease-details">
                <h4>Matibabu Tunayotoa:</h4>
                <ul>
                  {disease.treatments.map((treatment, index) => (
                    <li key={index}>{treatment}</li>
                  ))}
                </ul>
                <div className="specialists">
                  <h4>Wataalamu Wetu:</h4>
                  <p>{disease.specialists.join(', ')}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Diseases;