import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./Components/Header";
import Authentication from './Components/Authentication';
import DoctorAuthentication from './Components/DoctorAuthentication';
import Contact from './Components/Contact';
import Home from './Components/Home';
import SearchPage from './Components/SearchPage';
import Registration from './Components/PatientRegistration';
import RegistrationPr from './Components/PractitionerRegistration';
import HomePage from './Components/HomePage';
import DoctorSelection from './Components/DoctorSelection';
import RequireAuth from './Components/RequireAuth';
import PatientAppointments from './Components/PatientAppointments'; // Importez le composant PatientAppointments

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/doctor-login" element={<DoctorAuthentication />} />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/patient-registration" element={<Registration />} />
          <Route path="/practitioner-registration" element={<RegistrationPr />} />
          <Route path="/HomePage" element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          } />
          <Route path="/doctors" element={
            <RequireAuth>
              <DoctorSelection />
            </RequireAuth>
          } />
          <Route path="/appointments" element={
            <RequireAuth>
              <PatientAppointments />
            </RequireAuth>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
