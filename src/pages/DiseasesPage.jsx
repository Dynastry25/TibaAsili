import React from 'react';
import './CSS/DiseasesPage.css';
import Diseases from '../Components/Diseases/Diseases';

const DiseasesPage = () => {
  return (
    <div className="diseases-page">
      <div className="diseases-hero">
        <h1>Magonjwa Tunayotibu</h1>
        <p>Pata maelezo kuhusu magonjwa tunayotibu na mbinu za tiba asili tunazotumia</p>
      </div>
      
      <Diseases />
      
      <div className="additional-info container">
        <h2>Kwa Nini Utumie Tiba Asili?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <i className="fas fa-seedling"></i>
            <h3>Asili na Salama</h3>
            <p>Dawa za asili hazina madhara makubwa kama dawa za kikemia</p>
          </div>
          
          <div className="benefit-card">
            <i className="fas fa-money-bill-wave"></i>
            <h3>Bei Nafuu</h3>
            <p>Gharama ya matibabu ni ndogo ikilinganishwa na tiba za kisasa</p>
          </div>
          
          <div className="benefit-card">
            <i className="fas fa-history"></i>
            <h3>Imethibitika</h3>
            <p>Mbinu za kitamaduni zimekuwepo na kuthibitika kwa miaka mingi</p>
          </div>
          
          <div className="benefit-card">
            <i className="fas fa-hand-holding-heart"></i>
            <h3>Inayolenga Mwili Mzima</h3>
            <p>Tiba asili inalenga sababu ya ugonjwa na siyo dalili tu</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseasesPage;