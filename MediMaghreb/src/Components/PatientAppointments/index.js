import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';
import { FaTimes } from 'react-icons/fa'; // Assurez-vous d'avoir installé react-icons

import './style.css';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [showCancelledAppointments, setShowCancelledAppointments] = useState(false);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = () => {
        const token = localStorage.getItem('token');
        const patientId = localStorage.getItem('patientId');
        fetch(`http://localhost:5000/appointments/${patientId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setAppointments(data);
            })
            .catch(error => console.error('Erreur lors de la récupération des rendez-vous:', error));
    };

    const cancelAppointment = (appointmentId) => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:5000/appointments/${appointmentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'Ok') {
                    fetchAppointments();
                } else {
                    console.error('Erreur lors de l\'annulation du rendez-vous:', data.error);
                }
            })
            .catch(error => console.error('Erreur lors de l\'annulation du rendez-vous:', error));
    };

    const formatDate = (date) => format(new Date(date), 'dd MMMM yyyy', { locale: fr });

    return (
        <div className="appointments-container">
            <h2>Mes rendez-vous</h2>
            <div className="appointment-steps">
                <button
                    onClick={() => setShowCancelledAppointments(false)}
                    className={showCancelledAppointments ? 'step-button' : 'step-button active'}
                >
                    Rendez-vous actuels
                </button>
                <button
                    onClick={() => setShowCancelledAppointments(true)}
                    className={showCancelledAppointments ? 'step-button active' : 'step-button'}
                >
                    Rendez-vous annulés
                </button>
            </div>
            <table className="appointments-table">
                <thead>
                    <tr>
                        <th>Docteur</th>
                        <th>Date</th>
                        <th>Heure</th>
                        {showCancelledAppointments ? "" : <th> </th> }
                    </tr>
                </thead>
                <tbody>
                    {showCancelledAppointments ? (
                        appointments.filter(appointment => appointment.status === 'Cancelled').map(appointment => (
                            <tr key={appointment._id} className="cancelled-appointment">
                                <td>{`Dr. ${appointment.doctorId.name}`}</td>
                                <td>{formatDate(appointment.date)}</td>
                                <td>{format(new Date(appointment.date), 'HH:mm')}</td>
                            </tr>
                        ))
                    ) : (
                        appointments.filter(appointment => appointment.status !== 'Cancelled').map(appointment => (
                            <tr key={appointment._id}>
                                <td>{`Dr. ${appointment.doctorId.name}`}</td>
                                <td>{formatDate(appointment.date)}</td>
                                <td>{format(new Date(appointment.date), 'HH:mm')}</td>
                                <td>
                                    <button onClick={() => cancelAppointment(appointment._id)} className="cancel-button">
                                        <FaTimes />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Appointments;
