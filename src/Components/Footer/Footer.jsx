import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <i className="fas fa-leaf"></i>
              <span>Tiba Asili Tanzania</span>
            </div>
            <p className="footer-description">
              Jukwaa la kuunganisha wataalamu wa tiba asili na wagonjwa kutoka kote nchini Tanzania. 
              Tunaima kuendeleza na kueneza tiba asili ya kitamaduni.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Menyu </h3>
            <ul className="footer-links">
              <li><Link to="/">Nyumbani</Link></li>
              <li><Link to="/doctors">Wataalamu</Link></li>
              <li><Link to="/diseases">Magonjwa</Link></li>
              <li><Link to="/about">Kuhusu Sisi</Link></li>
              <li><Link to="/contact">Wasiliana Nasi</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3>Huduma Zetu</h3>
            <ul className="footer-links">
              <li><a href="#">Tiba ya Shinikizo la Damu</a></li>
              <li><a href="#">Huduma za Uzazi</a></li>
              <li><a href="#">Tiba ya Kisukari</a></li>
              <li><a href="#">Matibabu ya Mifupa</a></li>
              <li><a href="#">Usaidizi wa Saratani</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3>Wasiliana Nasi</h3>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span> Dar es Salaam, Tanzania</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+255 713 254 000</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>tnyamhanga69@gmail.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-clock"></i>
                <span>Jumatatu - Ijumaa: 9:00 - 18:00</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h3>Jiandikishe Kwa Taarifa</h3>
            <p>Jiandikishe kwa newsletter yetu kupata taarifa muhimu za tiba asili.</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Barua pepe yako" 
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-btn">
                <i className="fas fa-paper-plane"></i>
                Jiandikisha
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; 2025 Tiba Asili Tanzania. Haki zote zimehifadhiwa.</p>
            </div>
            <div className="footer-bottom-links">
              <a href="#">Sera ya Faragha</a>
              <a href="#">Masharti ya Matumizi</a>
              <a href="#">Mapendekezo</a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Contact Buttons */}
      <div className="quick-contact">
        <a href="tel:+255713254000" className="quick-contact-btn phone">
          <i className="fas fa-phone"></i>
        </a>
        <a href="https://wa.me/+255713254000" className="quick-contact-btn whatsapp">
          <i className="fab fa-whatsapp"></i>
        </a>
        <a href="#top" className="quick-contact-btn scroll-top">
          <i className="fas fa-arrow-up"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;