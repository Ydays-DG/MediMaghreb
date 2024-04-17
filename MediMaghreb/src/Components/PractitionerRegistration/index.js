import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const PractitionerRegistration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        postalCode: '',
        phone: '',
        specialty: '',
        email: '',
        subject: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Practitioner Registration Data:', formData);
    };

    return (
        <div className="practitioner-registration-container">
            <div className="container d-flex">
                <div className="description-section">
                    <h2>Bienvenue sur MediMaghreb</h2>
                    <p>Rejoignez notre communauté de professionnels de la santé.</p>
                    <h3>Votre spécialité est importante</h3>
                    <p>Optimisez votre gestion de patientèle avec des outils adaptés.</p>
                </div>
                <div className="registration-form-section">
                    <form onSubmit={handleSubmit} className="registration-form">
                        <h2>Inscrivez-vous sur MediMaghreb</h2>
                        <div className="form-group">
                            <label htmlFor="firstName">Prénom</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Nom</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="postalCode">Code postal du cabinet</label>
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Téléphone portable</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                pattern="\+212\d{9}"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="specialty">Votre spécialité</label>
                            <input
                                type="text"
                                id="specialty"
                                name="specialty"
                                value={formData.specialty}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Adresse email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-conx-practitioner">Envoyer la Demande</button>
                        <p className="register-link">
                            Déjà inscrit? <Link to="/doctor-login" className="link-practitioner">Connectez-vous ici</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PractitionerRegistration;
