import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './style.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const { name, email, message } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <div className="logo-container">
                        <img
                            src="LogoDG.png"
                            alt="Logo"
                            className="logo"
                            style={{ width: "20%", height: 'auto' }} // Adjust the width as needed
                        />
                    </div>
                    <h2 className="contact-header">Contacter-nous</h2>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="login__field">
                            <i className="login__icon fa fa-user"></i>
                            <input
                                type="text"
                                className="login__input"
                                placeholder="Nom et Prénom"
                                name="name"
                                value={name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fa fa-envelope"></i>
                            <input
                                type="email"
                                className="login__input"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fa fa-comment"></i>
                            <textarea
                                className="login__input"
                                placeholder="Votre Message"
                                name="message"
                                value={message}
                                rows="4"
                                style={{ maxHeight: '250px' }}
                                onChange={handleChange}
                            />
                        </div>
                        <button className="button login__submit" type="submit">
                            <span className="button__text">Envoyer</span>
                            <i className="button__icon fa fa-chevron-right"></i>
                        </button>
                    </form>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </div>
    );
};

export default Contact;
