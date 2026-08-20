import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, User, Stethoscope, FileText, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

const BookingPage = () => {
  // Task 2 Requirement: At least two state values used meaningfully
  const [formData, setFormData] = useState({
    patientName: '',
    date: '',
    timeSlot: '09:00 AM',
    reason: ''
  });

  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Sarah Jenkins');

  // Additional UX states for API submission feedback
  const [doctorsList, setDoctorsList] = useState([
    'Dr. Sarah Jenkins',
    'Dr. Rajesh Sharma',
    'Dr. Emily Wong',
    'Dr. Michael Chang'
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  // Fetch doctor options from backend if available
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/v1/doctors')
      .then((res) => {
        if (res.data && res.data.data && res.data.data.length > 0) {
          const names = res.data.data.map((d) => d.name);
          setDoctorsList(names);
          setSelectedDoctor(names[0]);
        }
      })
      .catch((err) => {
        console.warn('Using default doctor options for booking form.');
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitResult(null);

    const payload = {
      patientName: formData.patientName,
      doctorName: selectedDoctor,
      date: formData.date,
      timeSlot: formData.timeSlot,
      reason: formData.reason,
      status: 'pending'
    };

    try {
      const res = await axios.post('http://localhost:5000/api/v1/appointments', payload);
      setSubmitResult({
        success: true,
        message: res.data.message || 'Appointment booked successfully!'
      });
      // Reset form
      setFormData({
        patientName: '',
        date: '',
        timeSlot: '09:00 AM',
        reason: ''
      });
    } catch (err) {
      console.error('Booking submission error:', err);
      setSubmitResult({
        success: false,
        message: err.response?.data?.message || err.message || 'Failed to submit appointment.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2>Book an Appointment</h2>
          <p className="section-desc">Schedule a consultation with our medical specialists</p>
        </div>
      </div>

      <div className="booking-layout">
        {/* Booking Form */}
        <div className="booking-card">
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="patientName">
                <User size={16} /> Patient Full Name *
              </label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="doctorSelect">
                <Stethoscope size={16} /> Select Doctor *
              </label>
              {/* Task 2 Requirement: selectedDoctor state management */}
              <select
                id="doctorSelect"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="form-control"
                required
              >
                {doctorsList.map((doc, idx) => (
                  <option key={idx} value={doc}>
                    {doc}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label htmlFor="date">
                  <Calendar size={16} /> Appointment Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group flex-1">
                <label htmlFor="timeSlot">
                  <Clock size={16} /> Time Slot *
                </label>
                <select
                  id="timeSlot"
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:45 AM">11:45 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:30 PM">03:30 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reason">
                <FileText size={16} /> Reason for Visit (Max 300 chars)
              </label>
              <textarea
                id="reason"
                name="reason"
                rows="3"
                value={formData.reason}
                onChange={handleChange}
                maxLength={300}
                placeholder="Briefly describe your symptoms or medical concern..."
                className="form-control"
              ></textarea>
              <div className="char-count">{formData.reason.length} / 300 characters</div>
            </div>

            <button type="submit" disabled={submitting} className="btn btn-primary btn-block">
              {submitting ? 'Submitting Appointment...' : 'Submit Appointment'}
            </button>

            {submitResult && (
              <div className={`alert ${submitResult.success ? 'alert-success' : 'alert-error'}`}>
                {submitResult.success ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                <span>{submitResult.message}</span>
              </div>
            )}
          </form>
        </div>

        {/* Task 2 Requirement: Display entered patient name or selected doctor live as state changes */}
        <div className="preview-card">
          <div className="preview-header">
            <Sparkles size={20} className="sparkle-icon" />
            <h3>Live Booking Preview</h3>
          </div>
          <div className="preview-content">
            <div className="preview-item">
              <span className="preview-label">Patient Name:</span>
              <span className="preview-value highlight-patient">
                {formData.patientName ? formData.patientName : '(Type patient name to see live update)'}
              </span>
            </div>

            <div className="preview-item">
              <span className="preview-label">Selected Doctor:</span>
              <span className="preview-value highlight-doctor">{selectedDoctor}</span>
            </div>

            <div className="preview-item">
              <span className="preview-label">Date:</span>
              <span className="preview-value">{formData.date || 'Not selected'}</span>
            </div>

            <div className="preview-item">
              <span className="preview-label">Time Slot:</span>
              <span className="preview-value">{formData.timeSlot}</span>
            </div>

            <div className="preview-item">
              <span className="preview-label">Status:</span>
              <span className="status-badge status-pending">Pending</span>
            </div>

            {formData.reason && (
              <div className="preview-reason">
                <span className="preview-label">Reason Summary:</span>
                <p>{formData.reason}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
