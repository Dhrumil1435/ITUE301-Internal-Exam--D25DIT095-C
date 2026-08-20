const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const requestLogger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const Appointment = require('./models/Appointment');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hospital_system';

// In-memory fallback data (Task 3 requirement support)
let fallbackDoctors = [
  { _id: '1', name: 'Dr. Sarah Jenkins', email: 'sarah.jenkins@medcare.com', specialisation: 'Cardiology', available: true },
  { _id: '2', name: 'Dr. Rajesh Sharma', email: 'rajesh.sharma@medcare.com', specialisation: 'Neurology', available: true },
  { _id: '3', name: 'Dr. Emily Wong', email: 'emily.wong@medcare.com', specialisation: 'Pediatrics', available: false },
  { _id: '4', name: 'Dr. Michael Chang', email: 'michael.chang@medcare.com', specialisation: 'Orthopedics', available: true }
];

let fallbackAppointments = [
  {
    _id: 'app-1',
    patientName: 'John Doe',
    doctorName: 'Dr. Sarah Jenkins',
    date: '2026-08-25',
    timeSlot: '10:00 AM',
    status: 'confirmed',
    reason: 'Routine cardiac checkup'
  },
  {
    _id: 'app-2',
    patientName: 'Alice Smith',
    doctorName: 'Dr. Rajesh Sharma',
    date: '2026-08-26',
    timeSlot: '02:30 PM',
    status: 'pending',
    reason: 'Frequent migraines and dizziness'
  }
];

let isDbConnected = false;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(async () => {
    isDbConnected = true;
    console.log(`Connected to MongoDB successfully at ${MONGO_URI}`);
    
    // Seed doctors if DB is empty
    const doctorCount = await Doctor.countDocuments();
    if (doctorCount === 0) {
      await Doctor.insertMany(fallbackDoctors.map(({ _id, ...doc }) => doc));
      console.log('Seeded initial doctors into MongoDB');
    }
  })
  .catch((err) => {
    console.warn(`MongoDB Connection Warning: ${err.message}. Running with in-memory store fallback.`);
    isDbConnected = false;
  });

// Apply global middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// --- REST API ENDPOINTS ---

// Task 3 & 4: GET /api/v1/doctors
app.get('/api/v1/doctors', async (req, res, next) => {
  try {
    if (isDbConnected && mongoose.connection.readyState === 1) {
      const doctors = await Doctor.find({});
      return res.status(200).json({ success: true, count: doctors.length, data: doctors });
    }
    return res.status(200).json({ success: true, count: fallbackDoctors.length, data: fallbackDoctors });
  } catch (error) {
    next(error);
  }
});

// Task 3: GET /api/v1/appointments
app.get('/api/v1/appointments', async (req, res, next) => {
  try {
    if (isDbConnected && mongoose.connection.readyState === 1) {
      const appointments = await Appointment.find({}).populate('patientId doctorId');
      return res.status(200).json({ success: true, count: appointments.length, data: appointments });
    }
    return res.status(200).json({ success: true, count: fallbackAppointments.length, data: fallbackAppointments });
  } catch (error) {
    next(error);
  }
});

// Task 3: POST /api/v1/appointments
app.post('/api/v1/appointments', async (req, res, next) => {
  try {
    const { patientName, doctorName, date, timeSlot, status, reason } = req.body;

    if (!patientName || !doctorName || !date || !timeSlot) {
      res.status(400);
      throw new Error('Patient name, Doctor name, Date, and Time Slot are required fields');
    }

    if (reason && reason.length > 300) {
      res.status(400);
      throw new Error('Reason cannot exceed 300 characters');
    }

    const validStatuses = ['pending', 'confirmed', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      res.status(400);
      throw new Error(`Invalid status '${status}'. Must be one of: ${validStatuses.join(', ')}`);
    }

    if (isDbConnected && mongoose.connection.readyState === 1) {
      let doctor = await Doctor.findOne({ name: doctorName });
      if (!doctor) {
        doctor = await Doctor.create({ name: doctorName, specialisation: 'General Medicine' });
      }

      const newAppointment = new Appointment({
        doctorId: doctor._id,
        patientName,
        doctorName: doctor.name,
        date,
        timeSlot,
        status: status || 'pending',
        reason
      });

      await newAppointment.validate();
      const savedAppointment = await newAppointment.save();

      return res.status(201).json({
        success: true,
        message: 'Appointment created successfully in MongoDB',
        data: savedAppointment
      });
    } else {
      const newAppt = {
        _id: `app-${Date.now()}`,
        patientName,
        doctorName,
        date,
        timeSlot,
        status: status || 'pending',
        reason: reason || ''
      };
      fallbackAppointments.push(newAppt);
      return res.status(201).json({
        success: true,
        message: 'Appointment created successfully (in-memory)',
        data: newAppt
      });
    }
  } catch (error) {
    next(error);
  }
});

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    dbConnected: isDbConnected,
    timestamp: new Date().toISOString()
  });
});

// Task 3: Global error-handling middleware (must be registered last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`MedCare Plus Hospital Backend running on http://localhost:${PORT}`);
});
