import React from 'react';
import { Calendar, Clock, User, Stethoscope, CheckCircle2, Clock3, XCircle } from 'lucide-react';

const AppointmentCard = ({ patientName, doctorName, date, timeSlot, status, reason }) => {
  // Determine badge style and icon according to status prop value (Task 1 requirement)
  const getStatusBadge = (statusValue) => {
    const normalizedStatus = (statusValue || 'pending').toLowerCase();

    switch (normalizedStatus) {
      case 'confirmed':
        return (
          <span className="status-badge status-confirmed">
            <CheckCircle2 size={14} /> Confirmed
          </span>
        );
      case 'cancelled':
        return (
          <span className="status-badge status-cancelled">
            <XCircle size={14} /> Cancelled
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="status-badge status-pending">
            <Clock3 size={14} /> Pending
          </span>
        );
    }
  };

  return (
    <div className={`appointment-card card-status-${(status || 'pending').toLowerCase()}`}>
      <div className="card-header">
        <div className="patient-info">
          <User className="card-icon" size={18} />
          <h3 className="patient-name">{patientName || 'Unknown Patient'}</h3>
        </div>
        {getStatusBadge(status)}
      </div>

      <div className="card-body">
        <div className="info-row">
          <Stethoscope size={16} className="info-icon" />
          <span className="info-label">Doctor:</span>
          <span className="info-value doctor-highlight">{doctorName || 'Not Assigned'}</span>
        </div>

        <div className="info-row">
          <Calendar size={16} className="info-icon" />
          <span className="info-label">Date:</span>
          <span className="info-value">{date}</span>
        </div>

        <div className="info-row">
          <Clock size={16} className="info-icon" />
          <span className="info-label">Time Slot:</span>
          <span className="info-value">{timeSlot}</span>
        </div>

        {reason && (
          <div className="reason-box">
            <span className="reason-label">Reason:</span> {reason}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
