import React from 'react';
import './Videos.css';

const Videos = () => {
  return (
    <section className="videos container">
      <h2 className="section-title">Video za Elimu na Ushuhuda</h2>
      <p className="section-subtitle">Tazama video za elimu kuhusu tiba asili na ushuhuda wa wagonjwa</p>
      
      <div className="videos-grid">
        {/* Video 1 */}
        <div className="video-card">
          <div className="video-container">
            <iframe src="https://www.youtube.com/embed/6DGNZnfKYnU" allowFullScreen></iframe>
          </div>
          <div className="video-info">
            <h3>Faidha za Mimea ya Kienyeji</h3>
            <p>Dk. Mwajuma anaeleza faida za mimea ya kienyeji katika tiba asili</p>
          </div>
        </div>
        
        {/* Video 2 */}
        <div className="video-card">
          <div className="video-container">
            <iframe src="https://www.youtube.com/embed/6DGNZnfKYnU" allowFullScreen></iframe>
          </div>
          <div className="video-info">
            <h3>Ushuhuda wa Mgonjwa wa Kisukari</h3>
            <p>Bwana Juma anashiriki uzoefu wake wa kupona kwa kutumia tiba asili</p>
          </div>
        </div>
      </div>
      
      <div className="view-all">
        <button className="btn-primary">Tazama Video Zaidi</button>
      </div>
    </section>
  );
};

export default Videos;