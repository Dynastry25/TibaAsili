import React, { createContext, useContext, useState } from 'react';

const DoctorContext = createContext();

export  const useDoctors = () => {
  return useContext(DoctorContext);
};

export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dk. Amina Juma",
      specialty: "Shinikizo la Damu",
      location: "Dar es Salaam",
      phone: "+255 789 456 123",
      experience: "Miaka 10",
      image: "amina",
      description: "Daktari mwenye uzoefu wa kutumia dawa za asili kwa matibabu ya shinikizo la damu"
    },
    {
      id: 2,
      name: "Dk. Rajab Mohamed",
      specialty: "Uzazi",
      location: "Mwanza",
      phone: "+255 754 321 987",
      experience: "Miaka 8",
      image: "rajab",
      description: "Mtaalamu wa uzazi na tiba za asili kwa akina mama wajawazito"
    },
    {
      id: 3,
      name: "Dk. Sarah William",
      specialty: "Kisukari",
      location: "Arusha",
      phone: "+255 713 654 321",
      experience: "Miaka 12",
      image: "sarah",
      description: "Daktari wa kisukari anayetumia mbinu za asili na kisasa"
    },
    {
      id: 4,
      name: "Dk. Michael Johnson",
      specialty: "Mifupa",
      location: "Dodoma",
      phone: "+255 787 123 456",
      experience: "Miaka 15",
      image: "michael",
      description: "Mtaalamu wa matibabu ya mifupa na misuli kwa njia za asili"
    }
  ]);

  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const filterDoctors = (specialty, location) => {
    let filtered = doctors;
    
    if (specialty && specialty !== "all") {
      filtered = filtered.filter(doctor => 
        doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
      );
    }
    
    if (location && location !== "all") {
      filtered = filtered.filter(doctor => 
        doctor.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    setFilteredDoctors(filtered);
  };

  const value = {
    doctors,
    filteredDoctors,
    selectedDoctor,
    setSelectedDoctor,
    filterDoctors
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};