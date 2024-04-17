import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Ensure you create a corresponding CSS file for styling

const HomePage = () => {

    const navigate = useNavigate(); 

    const goToAppointments = () => {
        navigate('/doctors');
    };

    const goToMedicalRecords = () => {
        navigate('/medical-records');
    };

    return (
        <div className="home-page">
            <main className="home-content">
                <h1>Bienvenue sur MediMaghreb</h1>
                <p>Accédez facilement à vos informations médicales et gérez vos rendez-vous de santé en quelques clics.</p>
                <div className="buttons">
                    <button onClick={goToAppointments}>Prendre un rendez-vous</button>
                    <button onClick={goToMedicalRecords}>Consulter mon dossier médical</button>
                </div>
            </main>
            <footer className="home-footer">
                <p>© 2024 MediMaghreb. Tous droits réservés.</p>
            </footer>
        </div>
    );
};

export default HomePage;
