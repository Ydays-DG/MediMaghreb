const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Define Schemas
const timeSlotSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    times: [{ type: Date, required: true }]
});

const doctorSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    phone: String,
    specialty: String,
    bio: String,
    address: String,
    city: String,
    availableDates: [timeSlotSchema]
});

const Doctor = mongoose.model('Doctor', doctorSchema);

const PatientSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    birthDate: Date
});

const Patient = mongoose.model('Patient', PatientSchema);

const appointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    date: Date,
    status: { type: String, default: 'Scheduled' }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/medimaghreb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
    seedDoctors();
}).catch(err => console.error('Error connecting to MongoDB:', err));

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Accès refusé' });

    jwt.verify(token, 'SECRET_KEY', (err, user) => {
        if (err) return res.status(403).json({ error: 'Token non valide ou expiré' });
        req.user = user;
        next();
    });
};

// Default doctors
const defaultDoctors = [
    {
        name: "Amine El Bakkali",
        email: "amine.bakkali@example.com",
        phone: "+212 600 000001",
        specialty: "Cardiologie",
        bio: "Spécialiste en cardiologie avec plus de 10 ans d'expérience.",
        address: "100 Boulevard de la Santé",
        city: "Casablanca",
        availableDates: [
            {
                date: new Date('2024-04-22T00:00:00Z'),
                times: [
                    new Date('2024-04-22T09:00:00Z'),
                    new Date('2024-04-22T11:00:00Z'),
                    new Date('2024-04-22T14:00:00Z')
                ]
            },
            {
                date: new Date('2024-04-23T00:00:00Z'),
                times: [
                    new Date('2024-04-23T10:00:00Z'),
                    new Date('2024-04-23T13:00:00Z'),
                    new Date('2024-04-23T15:00:00Z')
                ]
            }
        ]
    },
    {
        name: "Laila Amrani",
        email: "laila.amrani@example.com",
        phone: "+212 600 000002",
        specialty: "Dermatologie",
        bio: "Dermatologue réputée avec une expertise en maladies de la peau.",
        address: "450 Avenue de la Peau",
        city: "Rabat",
        availableDates: [
            {
                date: new Date('2024-04-22T00:00:00Z'),
                times: [
                    new Date('2024-04-22T09:00:00Z'),
                    new Date('2024-04-22T11:00:00Z'),
                    new Date('2024-04-22T14:00:00Z')
                ]
            },
            {
                date: new Date('2024-04-23T00:00:00Z'),
                times: [
                    new Date('2024-04-23T09:00:00Z'),
                    new Date('2024-04-23T11:00:00Z'),
                    new Date('2024-04-23T14:00:00Z')
                ]
            },
            {
                date: new Date('2024-04-24T00:00:00Z'),
                times: [
                    new Date('2024-04-24T09:00:00Z'),
                    new Date('2024-04-24T11:00:00Z'),
                    new Date('2024-04-24T14:00:00Z')
                ]
            },
            {
                date: new Date('2024-04-25T00:00:00Z'),
                times: [
                    new Date('2024-04-25T09:00:00Z'),
                    new Date('2024-04-25T11:00:00Z'),
                    new Date('2024-04-25T14:00:00Z')
                ]
            },
            {
                date: new Date('2024-04-26T00:00:00Z'),
                times: [
                    new Date('2024-04-26T10:00:00Z'),
                    new Date('2024-04-26T13:00:00Z'),
                    new Date('2024-04-26T15:00:00Z')
                ]
            }
        ]
    },
    {
        name: "Youssef Rahoui",
        email: "youssef.rahoui@example.com",
        phone: "+212 600 000003",
        specialty: "Pédiatrie",
        bio: "Pédiatre aimant, spécialisé dans le soin des enfants et des adolescents.",
        address: "789 Rue des Enfants",
        city: "Marrakech",
        availableDates: [
            {
                date: new Date('2024-04-22T00:00:00Z'),
                times: [
                    new Date('2024-04-22T09:00:00Z'),
                    new Date('2024-04-22T11:00:00Z'),
                    new Date('2024-04-22T14:00:00Z')
                ]
            },
            {
                date: new Date('2024-04-23T00:00:00Z'),
                times: [
                    new Date('2024-04-23T10:00:00Z'),
                    new Date('2024-04-23T13:00:00Z'),
                    new Date('2024-04-23T15:00:00Z')
                ]
            }
        ]
    }

];

async function seedDoctors() {
    const count = await Doctor.countDocuments();
    if (count === 0) {
        await Doctor.insertMany(defaultDoctors);
        console.log('Default doctors inserted successfully');
    }
}

// Routes
app.post('/register', async (req, res) => {
    const { username, email, password, birthDate } = req.body;
    try {
        if (await Patient.findOne({ email })) {
            return res.status(400).json({ error: 'Un compte avec cet email existe déjà' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newPatient = new Patient({ username, email, password: hashedPassword, birthDate });
        await newPatient.save();
        res.json({ status: 'Ok', message: 'Inscription réussie' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const patient = await Patient.findOne({ email });
        if (!patient) return res.status(400).json({ error: 'Aucun utilisateur trouvé avec cet email' });
        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch) return res.status(400).json({ error: 'Mot de passe incorrect' });

        const token = jwt.sign({ id: patient._id }, 'SECRET_KEY', { expiresIn: '1h' });
        res.json({ token, patientId: patient._id });
    } catch (error) {
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

app.get('/doctors', authenticateToken, async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

app.post('/appointments', authenticateToken, async (req, res) => {
    const { patientId, doctorId, time } = req.body;

    try {
        const appointmentTime = new Date(time);

        if (isNaN(appointmentTime.getTime())) {
            return res.status(400).json({ status: 'error', error: 'Date/heure fournie invalide' });
        }

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ status: 'error', error: 'Médecin non trouvé' });
        }

        let isAvailable = false;
        doctor.availableDates.forEach(dateObj => {
            if (dateObj.date.toISOString().split('T')[0] === appointmentTime.toISOString().split('T')[0]) {
                const index = dateObj.times.findIndex(t => t.getTime() === appointmentTime.getTime());
                if (index !== -1) {
                    dateObj.times.splice(index, 1);
                    isAvailable = true;
                }
            }
        });

        if (!isAvailable) {
            return res.status(400).json({ status: 'error', error: 'Créneau non disponible' });
        }

        await doctor.save();

        const newAppointment = new Appointment({
            patientId,
            doctorId,
            date: appointmentTime,
            status: 'Scheduled'
        });

        await newAppointment.save();
        res.json({ status: 'Ok', message: 'Rendez-vous réservé avec succès' });
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ status: 'error', error: 'Internal server error' });
    }
});

app.get('/appointments/:patientId', authenticateToken, async (req, res) => {
    const patientId = req.params.patientId;

    try {
        const appointments = await Appointment.find({ patientId}).populate('doctorId');
        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});



app.delete('/appointments/:id', authenticateToken, async (req, res) => {
    const appointmentId = req.params.id;

    try {
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ error: 'Rendez-vous non trouvé' });
        }

        appointment.status = 'Cancelled';
        await appointment.save();

        const doctorId = appointment.doctorId;

        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({ error: 'Médecin non trouvé' });
        }

        const appointmentDate = appointment.date;
        const dateObj = doctor.availableDates.find(date => date.date.toISOString().split('T')[0] === appointmentDate.toISOString().split('T')[0]);
        
        if (dateObj) {
            dateObj.times.push(appointmentDate);
            await doctor.save();
        }

        res.json({ status: 'Ok' });
    } catch (error) {
        console.error('Erreur lors de l\'annulation du rendez-vous:', error);
        res.status(500).json({ error: 'Erreur lors de l\'annulation du rendez-vous' });
    }
});









const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
