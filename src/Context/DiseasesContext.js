import React, { createContext, useContext, useState } from 'react';

const DiseasesContext = createContext();

export const useDiseases = () => {
  const context = useContext(DiseasesContext);
  if (!context) {
    throw new Error('useDiseases must be used within a DiseasesProvider');
  }
  return context;
};

export const DiseasesProvider = ({ children }) => {
  const [diseases, setDiseases] = useState([
    {
      id: 1,
      name: "Shinikizo la Damu",
      description: "Pata matibabu ya asili kwa shinikizo la damu kutoka kwa wataalamu wetu.",
      icon: "fas fa-heartbeat",
      treatments: ["Mimea ya asili", "Mabadiliko ya lishe", "Mazoezi ya viungo"],
      specialists: ["Dk. Amina Juma", "Dk. John Mwamba"]
    },
    {
      id: 2,
      name: "Uzazi",
      description: "Huduma za uzazi na uzazi kwa kutumia dawa za asili na mbinu za kitamaduni.",
      icon: "fas fa-baby",
      treatments: ["Tiba za asili", "Ushauri wa lishe", "Tiba za nyongeza"],
      specialists: ["Dk. Rajab Mohamed", "Dk. Fatuma Ali"]
    },
    {
      id: 3,
      name: "Mifupa",
      description: "Tibabu za asili kwa magonjwa ya mifupa na misuli.",
      icon: "fas fa-bone",
      treatments: ["Uchunguzi wa mifupa", "Matibabu ya asili", "Mazoezi maalum"],
      specialists: ["Dk. Michael Johnson", "Dk. Paul Wilson"]
    },
    {
      id: 4,
      name: "Kisukari",
      description: "Dawa za asili na ushauri wa lishe kwa wagonjwa wa kisukari.",
      icon: "fas fa-tint",
      treatments: ["Dawa za asili", "Mpango wa lishe", "Ufuatiliaji wa damu"],
      specialists: ["Dk. Sarah William", "Dk. James Anderson"]
    },
    {
      id: 5,
      name: "Saratani",
      description: "Msaada wa ziada na tiba za asili kwa wagonjwa wa saratani.",
      icon: "fas fa-band-aid",
      treatments: ["Tiba ya nyongeza", "Uimarishaji wa mwili", "Usaidizi wa kiroho"],
      specialists: ["Dk. Elizabeth Kim", "Dk. Robert Smith"]
    },
    {
      id: 6,
      name: "Magonjwa Mengine",
      description: "Tunatoa huduma za tiba asili kwa magonjwa mengine mbalimbali.",
      icon: "fas fa-plus-circle",
      treatments: ["Tiba mbalimbali", "Uchunguzi wa asili", "Mapendekezo ya lishe"],
      specialists: ["Dk. Anna Thomas", "Dk. David Brown"]
    }
  ]);

  const [selectedDisease, setSelectedDisease] = useState(null);

  const value = {
    diseases,
    selectedDisease,
    setSelectedDisease
  };

  return (
    <DiseasesContext.Provider value={value}>
      {children}
    </DiseasesContext.Provider>
  );
};