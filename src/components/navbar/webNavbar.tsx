import React, { useState } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useColorMode } from "@docusaurus/theme-common";
import clsx from "clsx";
import "./Navbar.css";
import ThemeToggle from "./theme-toggle";
import IntegrationDropdownMenu from "./integrationMenuBar";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import PlatformDropdownMenu from "./platformMenuBar";
import SearchBar from "@theme/SearchBar";
type DropdownType = "integrate" | "platform" | null;

function WebNavbar(): React.ReactNode {
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
    }
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
          <div className="dropdown-container">
            {" "}
            {/* Position relative */}
            <button
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
              <div className="dropdown-content">
                {" "}
                {/* Position absolute */}
                <IntegrationDropdownMenu /> {/* The visual menu */}
              </div>
            )}
          </div>

          <div className="dropdown-container">
            {" "}
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
              <div className="dropdown-content">
                {" "}
                {/* Position absolute */}
                <PlatformDropdownMenu /> {/* The visual menu */}
              </div>
            )}
          </div>
        </nav>

        {/* Search Box */}
        <div className="search-container">
          <SearchBar />
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
