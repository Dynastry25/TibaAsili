import React from 'react';
import './CSS/About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="container">
          <h1>Kuhusu Tiba Asili Tanzania</h1>
          <p>Jukwaa la kuunganisha wataalamu wa tiba asili na wagonjwa kutoka kote nchini Tanzania</p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Dhumana Letu</h2>
              <p>
                Kuwa na jukwaa la kuunganisha wataalamu wa tiba asili na wagonjwa kwa 
                huduma bora za matibabu ya asili. Tunaima kuendeleza na kueneza tiba asili 
                ya kitamaduni kwa faida ya wananchi wote.
              </p>
              <div className="mission-stats">
                <div className="stat">
                  <h3>50+</h3>
                  <p>Wataalamu Waliojisajili</p>
                </div>
                <div className="stat">
                  <h3>1,000+</h3>
                  <p>Wagonjwa Waliotibiwa</p>
                </div>
                <div className="stat">
                  <h3>25+</h3>
                  <p>Mikoa Inayohudumiwa</p>
                </div>
              </div>
            </div>
            <div className="mission-image">
              <div className="image-placeholder">
                <i className="fas fa-leaf"></i>
                <p>Picha ya Wataalamu Wetu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Thamani Zetu</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-hand-holding-heart"></i>
              </div>
              <h3>Ukarimu</h3>
              <p>Tunatoa huduma kwa upendo na ukarimu kwa wagonjwa wetu</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Usalama</h3>
              <p>Huduma zetu ni salama na zimehakikishiwa ubora wa juu</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Ushirikiano</h3>
              <p>Tunaamini kwa kushirikiana tunaweza kufikia matokeo bora</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3>Elimu</h3>
              <p>Tunatoa elimu kuhusu tiba asili kwa jamii yetu</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Timu Yetu</h2>
          <p className="section-subtitle">Wanachama wanaoongoza mradi huu muhimu</p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <i className="fas fa-user-md"></i>
              </div>
              <h3>Dk. Jamal Mwakyembe</h3>
              <p className="member-role">Mkurugenzi Mtendaji</p>
              <p className="member-desc">Daktari mwenye uzoefu wa miaka 15 katika tiba asili</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <i className="fas fa-user-md"></i>
              </div>
              <h3>Bw. Hassan Ali</h3>
              <p className="member-role">Meneja Miradi</p>
              <p className="member-desc">Mtaalamu wa kuendesha miradi ya kijamii</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <i className="fas fa-user-md"></i>
              </div>
              <h3>Bi. Sarah Juma</h3>
              <p className="member-role">Mtaalamu Mawasiliano</p>
              <p className="member-desc">Anahakikisha mawasiliano bora na jamii</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <i className="fas fa-user-md"></i>
              </div>
              <h3>Dk. Anna Michael</h3>
              <p className="member-role">Mtaalamu Tiba Asili</p>
              <p className="member-desc">Daktari wa tiba asili mwenye sifa kubwa</p>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="history-section">
        <div className="container">
          <div className="history-content">
            <div className="history-image">
              <div className="image-placeholder">
                <i className="fas fa-history"></i>
                <p>Historia ya Tiba Asili Tanzania</p>
              </div>
            </div>
            <div className="history-text">
              <h2>Historia Yetu</h2>
              <p>
                Tiba Asili Tanzania ilianzishwa mwaka 2018 kwa lengo la kuokoa na 
                kuendeleza utamaduni wa tiba asili uliokuwa ukipotea. Tangu wakati huo 
                tumekuwa tukifanya kazi kwa karibu na wataalamu wa tiba asili na jamii 
                kuhakikisha kuwa huduma bora za matibabu zinawafikia wote walio na mahitaji.
              </p>
              <p>
                Kwa miaka michache tu, tumeweza kuunda mtandao wa wataalamu zaidi ya 50 
                na kuwasaidia wagonjwa zaidi ya 1,000 kupata matibabu ya asili.
              </p>
              <div className="milestones">
                <div className="milestone">
                  <span className="year">2018</span>
                  <span className="event">Kuanzishwa kwa mradi</span>
                </div>
                <div className="milestone">
                  <span className="year">2019</span>
                  <span className="event">Kujiunga kwa wataalamu 20 wa kwanza</span>
                </div>
                <div className="milestone">
                  <span className="year">2020</span>
                  <span className="event">Kupanuka kwa huduma kwa mikoa 10</span>
                </div>
                <div className="milestone">
                  <span className="year">2023</span>
                  <span className="event">Kufikia wagonjwa 1,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <h2>Jiunge Nasi Leo</h2>
          <p>Waweza kuwa mwanachama wa jukwaa letu la tiba asili</p>
          <div className="cta-buttons">
            <button className="btn-primary">
              <i className="fas fa-user-md"></i>
              Kuwa Mtaalamu
            </button>
            <button className="btn-secondary">
              <i className="fas fa-hands-helping"></i>
              Kuwa Mfadhili
            </button>
            <button className="btn-outline">
              <i className="fas fa-info-circle"></i>
              Pata Maelezo Zaidi
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;