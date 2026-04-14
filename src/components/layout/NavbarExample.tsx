'use client';

import React from 'react';
import { Logo } from '../ui/Logo';

/**
 * Example Header component demonstrating Logo integration
 */
export const NavbarExample: React.FC = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        {/* Basic Brand Integration */}
        <div className="brand">
          <Logo 
            width={140} 
            height={42} 
            className="brand-logo" 
          />
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <a href="#" className="nav-item">Dashboard</a>
          <a href="#" className="nav-item">Projects</a>
          <a href="#" className="nav-item">Team</a>
        </div>

        {/* Custom Color Integration Example */}
        <div className="nav-actions">
          <button className="theme-btn">
            {/* Using a custom primary color via prop */}
            <Logo 
              width={100} 
              height={30} 
              primaryColor="#10b981" 
              secondaryColor="#334155"
              title="Secondary Branded Logo"
            />
          </button>
        </div>
      </div>

      <style jsx>{`
        .navbar-container {
          width: 100%;
          border-bottom: 1px solid #e2e8f0;
          background: #ffffff;
          padding: 1rem 1.5rem;
        }
        .navbar-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
        }
        .nav-item {
          font-size: 0.875rem;
          font-weight: 500;
          color: #64748b;
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-item:hover {
          color: #0f172a;
        }
        .brand {
          display: flex;
          align-items: center;
        }
        .theme-btn {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 0.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .theme-btn:hover {
          background: #f1f5f9;
        }
      `}</style>
    </nav>
  );
};
