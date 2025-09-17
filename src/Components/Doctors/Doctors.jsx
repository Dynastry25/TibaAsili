import React, { useState } from 'react';
import './Doctors.css';
import { useDoctors } from '../../Context/DoctorContext';

const Doctors = () => {
  const { filteredDoctors, setSelectedDoctor } = useDoctors();
  const [showAll, setShowAll] = useState(false);

  const displayedDoctors = showAll ? filteredDoctors : filteredDoctors.slice(0, 3);

  const handleContact = (doctor, e) => {
    e.stopPropagation();
    setSelectedDoctor(doctor);
    // In a real app, this would open a contact modal or similar
    alert(`Itakupeleka kwenye simu ya ${doctor.name}: ${doctor.phone}`);
  };

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    // Navigate to doctor details page or show modal
  };

  return (
    <section className="doctors" id="doctors">
      <div className="container">
        <h2 className="section-title">Wataalamu Wetu</h2>
        <p className="section-subtitle">Wataalamu waliohitimu na wenye uzoefu wa kutumia tiba asili</p>
        
        <div className="doctors-grid">
          {displayedDoctors.map((doctor) => (
            <div 
              key={doctor.id} 
              className="doctor-card"
              onClick={() => handleDoctorClick(doctor)}
            >
              <div className="doctor-image">
                <i className="fas fa-user-md"></i>
              </div>
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p className="doctor-specialty">
                  <i className="fas fa-stethoscope"></i>
                  {doctor.specialty}
                </p>
                <p className="doctor-experience">
                  <i className="fas fa-award"></i>
                  Uzoefu: {doctor.experience}
                </p>
                <p className="doctor-location">
                  <i className="fas fa-map-marker-alt"></i>
                  {doctor.location}
                </p>
                <p className="doctor-description">{doctor.description}</p>
                <div className="doctor-contact">
                  <a href={`tel:${doctor.phone}`} className="doctor-phone">
                    <i className="fas fa-phone"></i>
                    {doctor.phone}
                  </a>
                  <button className="btn-primary" onClick={(e) => handleContact(doctor, e)}>
                    Wasiliana
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredDoctors.length > 3 && (
          <div className="view-all">
            <button 
              className="btn-primary" 
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Ficha Baadhi' : 'Ona Wataalamu Wote'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Doctors;