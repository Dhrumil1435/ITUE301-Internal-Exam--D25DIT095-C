const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const Appointment = require('./models/Appointment');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hospital_system';

const initialDoctors = [
  { name: 'Dr. Sarah Jenkins', email: 'sarah.jenkins@medcare.com', specialisation: 'Cardiology', available: true },
  { name: 'Dr. Rajesh Sharma', email: 'rajesh.sharma@medcare.com', specialisation: 'Neurology', available: true },
  { name: 'Dr. Emily Wong', email: 'emily.wong@medcare.com', specialisation: 'Pediatrics', available: false },
  { name: 'Dr. Michael Chang', email: 'michael.chang@medcare.com', specialisation: 'Orthopedics', available: true }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for seeding...');

    await Doctor.deleteMany({});
    await Patient.deleteMany({});
    await Appointment.deleteMany({});

    const createdDoctors = await Doctor.insertMany(initialDoctors);
    console.log(`Seeded ${createdDoctors.length} doctors into MongoDB.`);

    const samplePatient = await Patient.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '9876543210',
      bloodGroup: 'O+',
      age: 32
    });
    console.log('Seeded sample patient into MongoDB.');

    await Appointment.create({
      patientId: samplePatient._id,
      doctorId: createdDoctors[0]._id,
      patientName: samplePatient.name,
      doctorName: createdDoctors[0].name,
      date: '2026-08-25',
      timeSlot: '10:00 AM',
      status: 'confirmed',
      reason: 'Routine cardiac checkup'
    });

    await Appointment.create({
      patientName: 'Alice Smith',
      doctorName: createdDoctors[1].name,
      doctorId: createdDoctors[1]._id,
      date: '2026-08-26',
      timeSlot: '02:30 PM',
      status: 'pending',
      reason: 'Frequent migraines and dizziness'
    });

    console.log('Seeded initial appointments successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDatabase();
}

module.exports = { initialDoctors, seedDatabase };
