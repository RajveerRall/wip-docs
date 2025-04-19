import React, { useState, useEffect, useRef } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useColorMode } from "@docusaurus/theme-common";
import clsx from 'clsx';
import "./Navbar.css";
import ThemeToggle from "./theme-toggle";
import IntegrationDropdownMenu from "./integrationMenuBar";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import PlatformDropdownMenu from "./platformMenuBar";
import SearchBar from "@theme/SearchBar";
type DropdownType = "integrate" | "platform" | null;

function WebNavbar(): React.ReactNode {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [hovering, setHovering] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const { colorMode } = useColorMode();

  // Call useBaseUrl outside of any conditional logic
  const lightLogoUrl = useBaseUrl("/imgs/lightlogo.svg");
  const darkLogoUrl = useBaseUrl("/imgs/logo.svg");

  const handleDropdownToggle = (dropdown: DropdownType): void => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
      setHovering(true);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (
            activeDropdown &&
            dropdownRef.current &&
            buttonRef.current &&
            !dropdownRef.current.contains(event.target as Node) &&
            !buttonRef.current.contains(event.target as Node)
        ) {
            setActiveDropdown(null);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [activeDropdown]);

  const handleMouseLeave = () => {
    setHovering(false);
    setTimeout(() => {
      if (!hovering) setActiveDropdown(null);
    }, 100);
  };

  const closeDropdowns = (): void => {
    setActiveDropdown(null);
  };

  return (
    <header className="navbar-container navbar">
      <div className="navbar-content">
        {/* Logo - Theme-aware */}
        <div className="navbar-logo">
          <Link to="/" onClick={closeDropdowns}>
            <img
              src={lightLogoUrl}
              alt="CometChat Docs"
              className="logo-image logo-light"
              style={{ height: "2.2rem" }}
            />
            <img
              src={darkLogoUrl}
              alt="CometChat Docs"
              className="logo-image logo-dark"
              style={{ height: "1.5rem" }}
            />
          </Link>
        </div> 

        {/* Navigation Links */}
        <nav className="navbar-links">
          <div
            className="dropdown-container"
            onMouseLeave={handleMouseLeave}
          >
            {/* Position relative */}
            <button
               ref={buttonRef}
              className={clsx("dropdown-button  text-caption-1", {
                active: activeDropdown === "integrate",
              })}
              onMouseEnter={() => handleDropdownToggle("integrate")}
              
            >
              Integrate
              {activeDropdown === "integrate" ? (
                <MdKeyboardArrowUp
                  style={{ marginLeft: "0.4rem", marginTop: "0.1rem" }}
                />
              ) : (
                <MdKeyboardArrowDown
                  style={{ marginLeft: "0.4rem", marginTop: "0.1rem" }}
                />
              )}
              {/* <span className="dropdown-arrow">▼</span> */}
            </button>
             {/* The Dropdown Content itself */}
            {activeDropdown === "integrate" && ( 
              <div ref={dropdownRef}
                className="dropdown-content"
                
              >
                <IntegrationDropdownMenu /> {/* The visual menu */}
              </div>
              
            )}
          </div>

          <div className="dropdown-container" >
           
           {/* Position relative */}
            <button
              className={clsx("dropdown-button text-caption-1", {
                active: activeDropdown === "platform",
              })}
              onMouseEnter={() => handleDropdownToggle("platform")}
              // ... aria attributes ...
            >
              Platform
              {activeDropdown === "platform" ? (
                <MdKeyboardArrowUp
                  style={{ marginLeft: "0.4rem", marginTop: "0.1rem" }}
                />
              ) : (
                <MdKeyboardArrowDown
                  style={{ marginLeft: "0.4rem", marginTop: "0.1rem" }}
                />
              )}
            </button>
            {/* The Dropdown Content itself */}
            {activeDropdown === "platform" && (
              <div ref={dropdownRef} className="dropdown-content">
               
                 {/* Position absolute */}
                <PlatformDropdownMenu /> {/* The visual menu */}
                
              </div>
            )}
          </div>
        </nav>

        {/* Search Box */}
        <div className="search-container">
          <SearchBar/>

        </div>

        {/* Action Buttons */}
        <div className="navbar-actions">
          <button className="dashboard-button">Dashboard</button>
          <button className="contact-button">Contact Support</button>

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

export default WebNavbar;
