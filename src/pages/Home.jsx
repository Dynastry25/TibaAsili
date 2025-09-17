import React from "react";
import Hero from "../Components/Hero/Hero";
import './CSS/Home.css'
import Diseases from "../Components/Diseases/Diseases";
import Doctors from "../Components/Doctors/Doctors";
import Videos from "../Components/Videos/Videos";
import CTA from "../Components/CTA/CTA";

const Home = () => {
  return (
    <div className="shop-container">
      <Hero />
      
      <Diseases />
      <Doctors />
      <Videos />
      <CTA />
      
      
    </div>
  );
};

export default Home;