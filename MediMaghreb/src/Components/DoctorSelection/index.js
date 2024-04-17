import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import { format, parseISO } from 'date-fns';
import fr from 'date-fns/locale/fr';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';
import Swal from 'sweetalert2';

const DoctorSelection = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [availableWeeks, setAvailableWeeks] = useState([]);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = () => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:5000/doctors', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setDoctors(data.map(doctor => ({
                ...doctor,
                availableDates: doctor.availableDates.map(av => ({
                    ...av,
                    date: parseISO(av.date),
                    times: av.times.map(t => parseISO(t))
                }))
            })));
        })
        .catch(error => console.error('Erreur lors de la récupération des médecins:', error));
    };

    const openModalWithDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setAvailableWeeks(organizeDatesByWeeks(doctor.availableDates));
        setCurrentPage(0);
        setSelectedDate(null);
        setSelectedTime('');
        setIsModalOpen(true);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectedTime('');
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const bookAppointment = () => {
        if (!selectedTime || !selectedDoctor || !selectedDate) {
            Swal.fire('Attention!', 'Veuillez sélectionner un docteur, une date et un horaire pour votre rendez-vous.', 'warning');
            return;
        }
    
        const patientId = localStorage.getItem('patientId');
        const token = localStorage.getItem('token');
        const formattedTime = selectedTime instanceof Date ? selectedTime.toISOString() : '';
    
        if (!formattedTime) {
            Swal.fire('Erreur!', 'Date ou heure invalide. Veuillez sélectionner une date et une heure valides.', 'error');
            return;
        }
    
        const appointmentDetails = {
            patientId: patientId,
            doctorId: selectedDoctor._id,
            time: formattedTime
        };
    
        fetch('http://localhost:5000/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(appointmentDetails)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'Ok') {
                Swal.fire('Réservé!', `Rendez-vous réservé avec succès le ${format(selectedDate, 'yyyy-MM-dd', { locale: fr })} à ${format(selectedTime, 'HH:mm', { locale: fr })} avec le Dr. ${selectedDoctor.name}`, 'success');
                setIsModalOpen(false);
            } else {
                Swal.fire('Erreur de réservation', data.error, 'error');
            }
            fetchDoctors();  // Refresh all doctors after attempt
        })
        .catch(error => {
            console.error('Erreur lors de la réservation du rendez-vous:', error);
            Swal.fire('Erreur!', 'Erreur lors de la communication avec le serveur.', 'error');
            fetchDoctors();  // Refresh all doctors after error
        });
    };

    const organizeDatesByWeeks = (dates) => {
        const weeks = {};
        dates.forEach(({ date, times }) => {
            const weekLabel = format(date, "wo 'semaine de' yyyy", { locale: fr });
            if (!weeks[weekLabel]) {
                weeks[weekLabel] = [];
            }
            weeks[weekLabel].push({ date, times });
        });
        return Object.entries(weeks).sort((a, b) => a[0].localeCompare(b[0]));
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };
    
    return (
        <div className="doctor-selection">
            <input
                type="text"
                placeholder="Rechercher par nom, ville ou spécialité..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                className="search-input"
            />
            {doctors.filter(doctor => doctor.name.toLowerCase().includes(searchTerm) || doctor.specialty.toLowerCase().includes(searchTerm) || doctor.city.toLowerCase().includes(searchTerm))
                .map(doctor => (
                    <div key={doctor._id} className="doctor-card" onClick={() => openModalWithDoctor(doctor)}>
                        <img src={doctor.image || '/unknown.png'} alt={doctor.name} className="doctor-image" />
                        <h2>Dr. {doctor.name}</h2>
                        <p>Spécialité : {doctor.specialty}</p>
                    </div>
                ))}
            {selectedDoctor && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div className="doctor-details">
                        <section className="doctor-info-section">
                            <img src={selectedDoctor.image || '/unknown.png'} alt={selectedDoctor.name} className="doctor-detail-image" />
                            <h2>Dr. {selectedDoctor.name} - {selectedDoctor.specialty}</h2>
                        </section>
                        <section className="doctor-general-info-section">
                            <p><strong>Email :</strong> {selectedDoctor.email}</p>
                            <p><strong>Téléphone :</strong> {selectedDoctor.phone}</p>
                            <p><strong>Adresse :</strong> {selectedDoctor.address}</p>
                            <p><strong>Ville :</strong> {selectedDoctor.city}</p>
                        </section>
                        <section className="doctor-bio-section">
                            <p><strong>Biographie :</strong> {selectedDoctor.bio}</p>
                        </section>
                        <section className="appointment-booking-section">
                            <div className="pagination">
                                <button className="pagination-arrow" onClick={handlePrevPage} disabled={currentPage === 0}>←</button>
                                <button className="pagination-arrow" onClick={handleNextPage} disabled={currentPage === availableWeeks.length - 1}>→</button>
                            </div>
                            {availableWeeks.slice(currentPage, currentPage + 1).map(([week, dates]) => (
                                <div key={week} className="week-container">
                                    <h4>{week}</h4>
                                    <div className="agenda">
                                        <div className="date-container">
                                            {dates.map(({ date, times }) => (
                                                <div key={date.toISOString()} className="date-time-container">
                                                    <button
                                                        className={`date-button ${selectedDate?.toISOString() === date.toISOString() ? 'selected-date' : ''}`}
                                                        onClick={() => handleDateSelect(date)}
                                                    >
                                                        {format(date, 'EEEE dd MMMM', { locale: fr })}
                                                    </button>
                                                    <div className="time-selection">
                                                        {selectedDate?.toISOString() === date.toISOString() && times.map(time => (
                                                            <button
                                                                key={time.toISOString()}
                                                                className={`time-button ${selectedTime === time ? 'selected-time' : ''}`}
                                                                onClick={() => handleTimeSelect(time)}
                                                            >
                                                                {format(time, 'HH:mm')}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {selectedTime && (
                                <div className="book-button-container">
                                    <button className="book-button" onClick={bookAppointment}>Réserver le rendez-vous</button>
                                </div>
                            )}
                        </section>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default DoctorSelection;
