import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useColorMode } from '@docusaurus/theme-common';
import clsx from 'clsx';
import './Navbar.css'; // We'll create this CSS file separately
import ThemeToggle from './theme-toggle'; // Import the separate theme toggle component

type DropdownType = 'integrate' | 'platform' | null;

// Import your dropdown components
import Implementation from '../components/navbar/Implementation';
import Platform from '../components/navbar/Platform';

function Navbar(): React.ReactNode {
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const { colorMode, setColorMode } = useColorMode();

  const handleDropdownToggle = (dropdown: DropdownType): void => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const closeDropdowns = (): void => {
    setActiveDropdown(null);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        {/* Logo - Theme-aware */}
        <div className="navbar-logo"style={{ width: "150px" }}>
          <Link to="/" onClick={closeDropdowns}>
            <img 
              src={useBaseUrl('/imgs/lightlogo.svg')} 
              alt="CometChat Docs" 
              className="logo-image logo-light" 
            />
            <img 
              src={useBaseUrl('/imgs/darklogo.svg')} 
              alt="CometChat Docs" 
              className="logo-image logo-dark" 
            />
          </Link>
        </div>


        {/* Navigation Links */}
        <nav className="navbar-links">
          <div className="dropdown-container">
            <button 
              className={clsx('dropdown-button', { 'active': activeDropdown === 'integrate' })}
              onClick={() => handleDropdownToggle('integrate')}
            >
              Integrate
              <span className="dropdown-arrow">▼</span>
            </button>
            {activeDropdown === 'integrate' && (
              <div className="dropdown-content">
                <Implementation />
              </div>
            )}
          </div>

          <div className="dropdown-container">
            <button 
              className={clsx('dropdown-button', { 'active': activeDropdown === 'platform' })}
              onClick={() => handleDropdownToggle('platform')}
            >
              Platform
              <span className="dropdown-arrow">▼</span>
            </button>
            {activeDropdown === 'platform' && (
              <div className="dropdown-content">
                <Platform />
              </div>
            )}
          </div>
        </nav>

        {/* Search Box */}
        <div className="search-container">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search docs..." 
              className="search-input" 
            />
            <button className="search-button">
              <span className="search-shortcut">⌘ K</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="navbar-actions">
          <Link to="/dashboard" className="dashboard-button">
            Dashboard
          </Link>
          <Link to="/contact" className="contact-button">
            Contact Support
          </Link>

          {/* Theme Toggle Switch */}
          <ThemeToggle />
        </div>
      </div>

      {/* Backdrop for closing dropdowns when clicking outside */}
      {activeDropdown && (
        <div className="dropdown-backdrop" onClick={closeDropdowns} />
      )}
    </header>
  );
}

export default Navbar;