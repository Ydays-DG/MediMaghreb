import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

const Authentication = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email : username,
                password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setErrorMessage(data.error);
            } else if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('patientId', data.patientId);
                navigate('/HomePage');
            }
        })
        .catch(error => {
            console.error('Login failed:', error);
            setErrorMessage("Une erreur s'est produite, veuillez réessayer plus tard.");
        });
    };

    return (
        <div className="login-container">
            <div className="container">
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="login-logo">
                        <img src="logo.png" alt="Logo" style={{ width: '80px' }} />
                    </div>
                    <h2 className="form-title">Connexion Patient</h2>
                    <div className="form-group">
                        <input
                            type="text"
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
                            className="form-control"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <button type="submit" className="btn btn-conx">Connexion</button>
                    <p className="register-link">
                        Nouveau sur MediMaghreb ? <Link to="/patient-registration" className="link">Inscrivez-vous ici</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Authentication;
