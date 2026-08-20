import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserCheck, UserX, Stethoscope, Mail, RefreshCw, AlertTriangle } from 'lucide-react';

const DoctorsPage = () => {
  // Task 4 Requirement: Maintain three states - data, loading, error
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Task 4 Requirement: Use useEffect() to fetch API when component mounts
  useEffect(() => {
    let isMounted = true;

    const fetchDoctors = async () => {
      setLoading(true);
      setError(null);

      try {
        // Task 4 Requirement: GET /api/v1/doctors using Axios / fetch with async pattern
        const response = await axios.get('http://localhost:5000/api/v1/doctors');

        if (isMounted) {
          if (response.data && response.data.data) {
            setData(response.data.data);
          } else {
            setData(response.data);
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error('API Error in DoctorsPage:', err);
          setError(
            err.response?.data?.message || err.message || 'Failed to fetch doctor details from Express server.'
          );
          setLoading(false);
        }
      }
    };

    fetchDoctors();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2>Medical Specialists & Doctors</h2>
          <p className="section-desc">List of registered healthcare providers at MedCare Plus</p>
        </div>
        <button
          className="btn btn-sm btn-outline"
          onClick={() => {
            setLoading(true);
            setError(null);
            axios
              .get('http://localhost:5000/api/v1/doctors')
              .then((res) => {
                setData(res.data.data || res.data);
                setLoading(false);
              })
              .catch((err) => {
                setError(err.message);
                setLoading(false);
              });
          }}
        >
          <RefreshCw size={14} /> Refresh List
        </button>
      </div>

      {/* Task 4 Requirement 1: Display loading indicator while request is in progress */}
      {loading && (
        <div className="status-container loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Fetching doctors data from Express API (/api/v1/doctors)...</p>
        </div>
      )}

      {/* Task 4 Requirement 2: Display error message if request fails */}
      {!loading && error && (
        <div className="status-container error-container">
          <AlertTriangle size={32} color="#ef4444" />
          <h3>Error Loading Doctors Data</h3>
          <p>{error}</p>
          <p className="error-tip">Please ensure the Express backend is running on <code>http://localhost:5000</code>.</p>
        </div>
      )}

      {/* Task 4 Requirement 3 & 4: Display doctor data (Name, Specialisation, Availability) */}
      {!loading && !error && data && data.length > 0 && (
        <div className="doctors-grid">
          {data.map((doctor, index) => (
            <div key={doctor._id || index} className="doctor-card">
              <div className="doctor-avatar">
                <Stethoscope size={28} />
              </div>
              <div className="doctor-details">
                <h3 className="doctor-name">{doctor.name}</h3>
                <div className="doctor-spec">
                  <span>{doctor.specialisation}</span>
                </div>
                {doctor.email && (
                  <div className="doctor-contact">
                    <Mail size={14} />
                    <span>{doctor.email}</span>
                  </div>
                )}
                <div className="doctor-availability">
                  {doctor.available ? (
                    <span className="badge badge-available">
                      <UserCheck size={14} /> Available
                    </span>
                  ) : (
                    <span className="badge badge-unavailable">
                      <UserX size={14} /> Not Available
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && (!data || data.length === 0) && (
        <div className="empty-state">
          <Stethoscope size={48} />
          <p>No doctors found in the directory.</p>
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
