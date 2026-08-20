import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HeartPulse, Calendar, Users, Home } from 'lucide-react';

const Navigation = () => {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="brand-logo">
          <div className="logo-icon">
            <HeartPulse size={26} color="#ffffff" />
          </div>
          <div className="brand-text">
            <span className="brand-title">MedCare<span className="brand-plus">+</span></span>
            <span className="brand-subtitle">Hospital System</span>
          </div>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <Home size={18} />
            <span>Home</span>
          </NavLink>

          <NavLink to="/doctors" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <Users size={18} />
            <span>Doctors</span>
          </NavLink>

          <NavLink to="/booking" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <Calendar size={18} />
            <span>Book Appointment</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
