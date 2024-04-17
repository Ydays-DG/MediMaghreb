import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './style.css';

const PractitionerLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Login submitted for:', username);
    };

    return (
        <div className="practitioner-login-container">
            <div className="container d-flex">
                <div className="login-description">
                    <h2>Bienvenue sur MediMaghreb</h2>
                    <p>Rejoignez notre communauté de professionnels de la santé et découvrez une suite d'outils conçus pour optimiser la gestion de votre pratique médicale.</p>
                    <ul>
                        <li>Amélioration de la gestion des rendez-vous</li>
                        <li>Communication facilitée avec vos patients</li>
                        <li>Accès à des outils avancés de suivi et diagnostic</li>
                    </ul>
                </div>
                <div className="login-form-container">
                    <form onSubmit={handleSubmit} className="practitioner-login-form">
                        <h3>Espace Praticien</h3>
                        <div className="form-group">
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                placeholder="Nom d'utilisateur"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-conx-practitioner">Connexion</button>
                        <p className="register-link">
                            Pas encore inscrit? <Link to="/practitioner-registration" className="link-practitioner">Créez votre compte</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PractitionerLogin;
