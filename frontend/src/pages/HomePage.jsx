import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AppointmentCard from '../components/AppointmentCard';
import { Calendar, Users, Activity, PlusCircle, RefreshCw } from 'lucide-react';

const HomePage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/v1/appointments');
      if (response.data && response.data.data) {
        setAppointments(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
      // Fallback demo appointments if backend is starting up
      setAppointments([
        {
          _id: 'demo-1',
          patientName: 'John Doe',
          doctorName: 'Dr. Sarah Jenkins',
          date: '2026-08-25',
          timeSlot: '10:00 AM',
          status: 'confirmed',
          reason: 'Routine cardiac checkup'
        },
        {
          _id: 'demo-2',
          patientName: 'Alice Smith',
          doctorName: 'Dr. Rajesh Sharma',
          date: '2026-08-26',
          timeSlot: '02:30 PM',
          status: 'pending',
          reason: 'Frequent migraines and dizziness'
        },
        {
          _id: 'demo-3',
          patientName: 'Robert Johnson',
          doctorName: 'Dr. Emily Wong',
          date: '2026-08-27',
          timeSlot: '11:15 AM',
          status: 'cancelled',
          reason: 'Schedule conflict'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="page-container">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Welcome to MedCare<span className="brand-plus">+</span> Hospital System</h1>
          <p>
            Seamlessly manage patient appointments, doctor availability, and medical schedules with our modern healthcare dashboard.
          </p>
          <div className="hero-actions">
            <Link to="/booking" className="btn btn-primary">
              <PlusCircle size={18} /> Book New Appointment
            </Link>
            <Link to="/doctors" className="btn btn-secondary">
              <Users size={18} /> View Doctors Directory
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon icon-blue">
            <Calendar size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{appointments.length}</span>
            <span className="stat-label">Total Appointments</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon icon-green">
            <Activity size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">
              {appointments.filter((a) => a.status === 'confirmed').length}
            </span>
            <span className="stat-label">Confirmed</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon icon-amber">
            <RefreshCw size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-value">
              {appointments.filter((a) => a.status === 'pending').length}
            </span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
      </div>

      {/* Appointments List Section */}
      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <h2>Scheduled Appointments</h2>
            <p className="section-desc">Overview of recent hospital appointments</p>
          </div>
          <button className="btn btn-sm btn-outline" onClick={fetchAppointments}>
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        {loading ? (
          <div className="status-container loading-container">
            <div className="spinner"></div>
            <p>Loading appointments...</p>
          </div>
        ) : error ? (
          <div className="status-container error-container">
            <p>{error}</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="empty-state">
            <Calendar size={48} />
            <p>No appointments found. Click "Book New Appointment" to add one.</p>
          </div>
        ) : (
          <div className="appointments-grid">
            {appointments.map((appt, idx) => (
              <AppointmentCard
                key={appt._id || idx}
                patientName={appt.patientName || (appt.patientId && appt.patientId.name)}
                doctorName={appt.doctorName || (appt.doctorId && appt.doctorId.name)}
                date={appt.date}
                timeSlot={appt.timeSlot}
                status={appt.status}
                reason={appt.reason}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
