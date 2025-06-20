import React, { useState, useEffect, useRef } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useColorMode } from "@docusaurus/theme-common";
import clsx from 'clsx';
import "./Navbar.css"; // Make sure this file has styles for .dropdown-backdrop
import ThemeToggle from "./theme-toggle";
import IntegrationDropdownMenu from "./integrationMenuBar";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import PlatformDropdownMenu from "./platformMenuBar";
import SearchBar from "@theme/SearchBar";

type DropdownType = "integrate" | "platform" | null;

function WebNavbar(): React.ReactNode {
  const dropdownContentRef = useRef<HTMLDivElement>(null);
  const integrateButtonRef = useRef<HTMLButtonElement>(null);
  const platformButtonRef = useRef<HTMLButtonElement>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);

  const lightLogoUrl = useBaseUrl("/imgs/light_logo.png");
  const darkLogoUrl = useBaseUrl("/imgs/dark_logo.png");

  const handleMouseEnter = (dropdown: DropdownType): void => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = (): void => {
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 500);
  };

  const handleDropdownContentEnter = (): void => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
  };

  // --- Close Dropdowns (used by backdrop, logo, etc.) ---
  const closeDropdowns = (): void => {
    setActiveDropdown(null);
    if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = null;
      }
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // *** No change needed here - it still works alongside the backdrop ***
      // It handles clicks on elements OTHER than the backdrop, button, or content.
      if (!activeDropdown) return;

      const activeButtonRef = activeDropdown === 'integrate' ? integrateButtonRef : platformButtonRef;

      if (
        activeButtonRef.current &&
        !activeButtonRef.current.contains(event.target as Node) &&
        dropdownContentRef.current &&
        !dropdownContentRef.current.contains(event.target as Node)
        // No need to check for backdrop here, as clicking backdrop is handled by its own onClick
      ) {
        // Call closeDropdowns to ensure timeout is also cleared
        closeDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, [activeDropdown]);

  return (
    <header className="navbar-container navbar">
      <div className="navbar-content">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" onClick={closeDropdowns}> {/* Close on logo click */}
             <img
              src={lightLogoUrl}
              alt="CometChat Docs"
              className="logo-image logo-light"
              style={{ maxHeight: '32px', minWidth:'156px' }}
            />
            <img
              src={darkLogoUrl}
              alt="CometChat Docs"
              className="logo-image logo-dark"
              style={{ maxHeight: '32px', minWidth:'156px', marginBottom:'5px' }}
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="navbar-links">
          {/* Integrate Dropdown */}
          <div
            className="dropdown-container"
            onMouseLeave={handleMouseLeave}
          >
            <button
              ref={integrateButtonRef}
              className={clsx("dropdown-button text-body-2 font-medium", { active: activeDropdown === "integrate" })}
              onMouseEnter={() => handleMouseEnter("integrate")}
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'integrate'}
            >
              Integrate {activeDropdown === "integrate" ? <MdKeyboardArrowUp style={{marginLeft:'8px'}} /> : <MdKeyboardArrowDown  style={{marginLeft:'8px'}}/>}
            </button>
            {activeDropdown === "integrate" && (
              <div
                ref={dropdownContentRef}
                className="dropdown-content"
                onMouseEnter={handleDropdownContentEnter}
                onMouseLeave={handleMouseLeave}
              >
                <IntegrationDropdownMenu />
              </div>
            )}
          </div>

          {/* Platform Dropdown */}
          <div
            className="dropdown-container"
            onMouseLeave={handleMouseLeave}
          >
            <button
              ref={platformButtonRef}
              className={clsx("dropdown-button text-body-2 font-medium", { active: activeDropdown === "platform" })}
              onMouseEnter={() => handleMouseEnter("platform")}
              aria-haspopup="true"
              aria-expanded={activeDropdown === 'platform'}
            >
              Platform {activeDropdown === "platform" ? <MdKeyboardArrowUp style={{marginLeft:'8px'}} /> : <MdKeyboardArrowDown style={{marginLeft:'8px'}} />}
            </button>
            {activeDropdown === "platform" && (
              <div
                ref={dropdownContentRef}
                className="dropdown-content"
                onMouseEnter={handleDropdownContentEnter}
                onMouseLeave={handleMouseLeave}
              >
                <PlatformDropdownMenu />
              </div>
            )}
          </div>
        </nav>

        {/* Search Box */}
        <div className="search-container">
          <SearchBar
          />
        </div>

        {/* Action Buttons */}
        <div className="navbar-actions">
          <button className={`dashboard-button text-button font-medium`}>Dashboard</button>
          {/* <button className={`contact-button text-button font-medium`}>Contact Support</button> */}
           <button className={`contact-button text-button font-medium`}>
           <span className="contact-button-text">Contact Support</span>
         </button>
          <ThemeToggle />
        </div>
      </div>

      {/* --- Backdrop for visual separation and closing --- */}
      {/* Render this conditionally when any dropdown is active */}
      {activeDropdown && (
        <div
          className="dropdown-backdrop"
          onClick={closeDropdowns} // Clicking backdrop closes the dropdown
          aria-hidden="true" // It's purely visual/functional, not content
        />
      )}
    </header>
  );
}

export default WebNavbar;