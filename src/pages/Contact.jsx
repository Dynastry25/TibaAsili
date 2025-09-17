import React, { useState } from 'react';
import './CSS/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Asante kwa ujumbe wako! Tutawasiliana nawe hivi karibuni.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact">
      <div className="contact-header">
        <h1>Wasiliana Nasi</h1>
        <p>Tuna karibu kukusikiliza na kukujibu</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info">
          <h2>Maelezo ya Mawasiliano</h2>
          <div className="contact-item">
            <h3>Anwani</h3>
            <p>Soko Kuu la Dawa za Asili, Dar es Salaam, Tanzania</p>
          </div>
          <div className="contact-item">
            <h3>Simu</h3>
            <p>+255 755 123 456</p>
          </div>
          <div className="contact-item">
            <h3>Barua Pepe</h3>
            <p>info@tibaasili.co.tz</p>
          </div>
          <div className="contact-item">
            <h3>Masaa ya Huduma</h3>
            <p>Jumatatu - Ijumaa: 8:00 asubuhi - 6:00 jioni</p>
            <p>Jumamosi: 9:00 asubuhi - 4:00 jioni</p>
          </div>
        </div>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Tuma Ujumbe</h2>
          <input
            type="text"
            name="name"
            placeholder="Jina Kamili"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Barua Pepe"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Mada"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Ujumbe wako"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Tuma Ujumbe</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;