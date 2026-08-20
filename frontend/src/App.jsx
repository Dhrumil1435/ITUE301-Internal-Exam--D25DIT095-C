import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import BookingPage from './pages/BookingPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        {/* Navigation bar with links to all 3 routes (Task 2 requirement) */}
        <Navigation />

        <main className="main-content">
          {/* React Router Configuration (Task 2 requirement) */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/booking" element={<BookingPage />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <div className="footer-container">
            <p>&copy; 2026 MedCare+ Hospital Appointment System. All Rights Reserved.</p>
            <p className="footer-meta">ITUE301 — Advanced Web Development Frameworks</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
