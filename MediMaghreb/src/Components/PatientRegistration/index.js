import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Registration = () => {
    const [formData, setFormData] = useState({
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthDate: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [succesMessage, setSuccesMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Les mots de passe ne correspondent pas');
            return;
        }
        setErrorMessage('');
        setSuccesMessage('');
        fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone: formData.phone,
                email: formData.email,
                password: formData.password,
                birthDate: formData.birthDate
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.status === "Ok") {
                setSuccesMessage('Inscription réussie! Vous pouvez se connecter maintenant.');
            } else if(data.error){
                setErrorMessage(data.error);
            }
        })
        .catch((error) => {
            console.error(error);
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
                    <h2 className="form-title">Inscription</h2>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    {succesMessage && <div className='succes-message'>{succesMessage}</div>}
                    <div className="form-group">
                        <input type="tel" name="phone" className="form-control" placeholder="+212xxxxxxxxx" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" className="form-control" placeholder="exemple@exemple.com" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" className="form-control" placeholder="**********" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <input type="password" name="confirmPassword" className="form-control" placeholder="***********" value={formData.confirmPassword} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <input type="date" name="birthDate" className="form-control" value={formData.birthDate} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-conx">Inscription</button>
                    <p className="register-link">
                        J'ai déjà un compte MediMaghreb? <Link to="/authentication" className="link">Connectez-vous ici</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Registration;
