import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Home = () => {
    return (
        <div className="home-container">
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1>Bienvenue sur Votre Plateforme Médicale</h1>
                        <p>Découvrez une nouvelle manière de gérer vos rendez-vous médicaux en ligne, rapidement et facilement.</p>
                        <Link to="/doctors" className="btn btn-primary btn-find-doctor">Trouver un médecin</Link>
                    </div>
                </div>
            </section>

            <section className="services-section">
                <div className="container">
                    <h2 className="section-heading">Explorez Nos Services</h2>
                    <div className="services-grid">
                        <div className="service">
                            <i className="fa fa-video-camera fa-2x" aria-hidden="true"></i>
                            <h3>Consultation Virtuelle</h3>
                            <p>Accédez à des consultations en ligne, où que vous soyez.</p>
                        </div>
                        <div className="service">
                            <i className="fa fa-calendar-check-o fa-2x" aria-hidden="true"></i>
                            <h3>Prise de Rendez-vous Facile</h3>
                            <p>Organisez vos rendez-vous avec simplicité auprès des meilleurs spécialistes.</p>
                        </div>
                        <div className="service">
                            <i className="fa fa-life-ring fa-2x" aria-hidden="true"></i>
                            <h3>Support Client 24/7</h3>
                            <p>Nous sommes là pour vous aider à tout moment, jour et nuit.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
