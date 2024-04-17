import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './style.css';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/authentication');
    };    

    return (
        <header className="header__main fixed-top">
            <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <img src="logo.png" alt="Logo" style={{ width: "120px" }} />
                    </Link>
                    <div className="d-flex justify-content-end align-items-center">
                        {isLoggedIn ? (
                            <>
                                {location.pathname === '/appointments' ? (
                                    <Link to="/doctors" className="btn btn-secondary me-2">
                                        <i className="fa fa-calendar-check-o"></i> Prendre un rendez-vous
                                    </Link>
                                ) : (
                                    <Link to="/appointments" className="btn btn-secondary me-2">
                                        <i className="fa fa-calendar-check-o"></i> Mes rendez-vous
                                    </Link>
                                )}
                                <Link to="/records" className="btn btn-secondary me-2">
                                    <i className="fa fa-folder-open-o"></i> Mon dossier médical
                                </Link>
                                <button onClick={handleLogout} className="btn btn-danger">
                                    <i className="fa fa-sign-out"></i> Déconnexion
                                </button>
                            </>
                        ) : (
                            <>
                                <a href="/doctor-login" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary me-2">
                                    <i className="fa fa-user-md"></i> Espace praticien
                                </a>
                                <Link to="/authentication" className="btn btn-primary" title="Prendre ou gérer vos rendez-vous">
                                    <i className="fa fa-sign-in"></i> Connexion
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
