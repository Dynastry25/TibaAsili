import React, { useState, useEffect } from 'react';
import './CSS/DoctorsPage.css';
import Doctors from '../Components/Doctors/Doctors';
import { useDoctors } from '../Context/DoctorContext';
import { useLocation } from 'react-router-dom';

const DoctorsPage = () => {
  const { filterDoctors } = useDoctors();
  const location = useLocation();
  const [filters, setFilters] = useState({
    specialty: 'all',
    location: 'all'
  });

  useEffect(() => {
    // Handle search from homepage
    if (location.state?.search) {
      filterDoctors(location.state.search, 'all');
      setFilters({ specialty: location.state.search, location: 'all' });
    }
  }, [location, filterDoctors]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    filterDoctors(newFilters.specialty, newFilters.location);
  };

  const specialties = ["Shinikizo la Damu", "Uzazi", "Kisukari", "Mifupa", "Saratani"];
  const locations = ["Dar es Salaam", "Mwanza", "Arusha", "Dodoma"];

  return (
    <div className="doctors-page">
      <div className="doctors-hero">
        <h1>Wataalamu wa Tiba Asili</h1>
        <p>Pata mtaalamu wa tiba asili anayekufaa zaidi kwa mahitaji yako</p>
      </div>
      
      <div className="filters-container">
        <div className="container">
          <h3>Tafuta Mtaalamu</h3>
          <div className="filters">
            <div className="filter-group">
              <label htmlFor="specialty">Aina ya Utaalamu</label>
              <select 
                id="specialty" 
                name="specialty" 
                value={filters.specialty}
                onChange={handleFilterChange}
              >
                <option value="all">Chagua Utaalamu</option>
                {specialties.map((spec, index) => (
                  <option key={index} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="location">Eneo</label>
              <select 
                id="location" 
                name="location" 
                value={filters.location}
                onChange={handleFilterChange}
              >
                <option value="all">Chagua Eneo</option>
                {locations.map((loc, index) => (
                  <option key={index} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            
            <button 
              className="btn-primary"
              onClick={() => {
                setFilters({ specialty: 'all', location: 'all' });
                filterDoctors('all', 'all');
              }}
            >
              Safisha Uchaguzi
            </button>
          </div>
        </div>
      </div>
      
      <Doctors />
    </div>
  );
};

export default DoctorsPage;