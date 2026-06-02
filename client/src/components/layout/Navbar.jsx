import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: '🏠 Home' },
    { path: '/activities', label: '✅ Daily Activities' },
    { path: '/workout', label: '💪 Workout' },
    { path: '/study', label: '📚 Study' },
    { path: '/timetable', label: '🗓️ Timetable' },
    { path: '/whatsnew', label: '✨ What\'s New' },
  ];

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-label="Daily Tracker">
            <rect width="32" height="32" rx="8" fill="#01696f"/>
            <path d="M8 10h16M8 16h10M8 22h12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="24" cy="22" r="4" fill="#4f98a3"/>
            <path d="M22.5 22l1 1 2-2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', color: 'var(--color-primary)' }}>DailyTracker</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path}
              style={{
                padding: '8px 14px', borderRadius: 'var(--radius-md)', textDecoration: 'none',
                fontSize: '14px', fontWeight: 500, transition: 'all var(--transition)',
                background: location.pathname === link.path ? '#f0fafb' : 'transparent',
                color: location.pathname === link.path ? 'var(--color-primary)' : 'var(--color-text-muted)'
              }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* User menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Hi, {user?.name?.split(' ')[0]}</span>
          <button className="btn btn-secondary btn-sm" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
