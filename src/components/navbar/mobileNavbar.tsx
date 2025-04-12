import React, { useState } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useLocation } from "@docusaurus/router"; // <-- Import useLocation
import { useColorMode } from "@docusaurus/theme-common";
import SearchBar from "@theme/SearchBar";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi"; // <-- Import menu icon
import { IoCloseSharp } from "react-icons/io5";

// Import the CSS Module
import styles from "./mobileNavbar.module.css";

// Import the actual Mobile Menu content component
import MobileMenu from "./mobileMenu";

// Renamed component for clarity
export default function MobileNavbar() {
  const { colorMode } = useColorMode();
  const location = useLocation(); // Get location object
  const { pathname } = location; // Extract the current path

  const lightLogoUrl = useBaseUrl("/imgs/lightlogo.svg");
  const darkLogoUrl = useBaseUrl("/imgs/logo.svg");
  const logoUrl = colorMode === "dark" ? darkLogoUrl : lightLogoUrl;

  // State to control the visibility of the slide-out MobileMenu content
  const [isDisplayMobileMenu, setIsDisplayMobileMenu] =
    useState<boolean>(false);

  // --- Condition for showing the docs-specific menu trigger ---
  // Show if path starts with '/docs' but is not just '/'.
  // Adjust '/docs/' if your main docs landing page should NOT show the icon.
  const showDocsMenuTrigger = pathname
    ? pathname.split("/wip-docs/")[1].length == 0
      ? false
      : true
    : false;
  // Example alternative: Show ONLY if path is deeper than /docs/ (e.g., /docs/intro)
  // const showDocsMenuTrigger = pathname.startsWith('/docs/');

  const openMenu = () => setIsDisplayMobileMenu(true);
  const closeMenu = () => setIsDisplayMobileMenu(false);

  // Keyboard handler for accessibility on icon wrappers acting as buttons
  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      action();
    }
  };

  return (
    <>
      {/* --- Main Mobile Navbar Header --- */}
      {/* Base 'navbar' class for Docusaurus theme, module class for overrides */}
      <header className={`mobile-navbar-context navbar ${styles.navbarHeader}`}>
        <div className={styles.navbarContent}>
          {/* --- Conditional Docs Menu Trigger (e.g., Hamburger) --- */}
          {/* Show only if in docs context AND menu is currently closed */}

          <div style={{ display: "flex", flexDirection: "row" }}>
            {showDocsMenuTrigger && (
              <button
                className={styles.docsMenuTriggerButton} // Specific style for this button
                // onClick={openMenu}
                aria-label="Open menu"
              >
                <FiMenu size={10} aria-hidden="true" />{" "}
                {/* Adjust size as needed */}
              </button>
            )}

            <div className={styles.logoContainer}>
              <Link to="/" onClick={closeMenu}>
                {" "}
                {/* Close menu if logo is clicked */}
                <img
                  src={logoUrl}
                  alt="CometChat Docs"
                  className={`${
                    colorMode == "dark" ? styles.darkLogo : styles.lightLogo
                  }`}
                />
              </Link>
            </div>
          </div>

          {/* --- Logo --- */}
          {/* Logo is generally always visible in the header */}

          {/* --- Right Side Actions (Search, Ellipsis/Options) --- */}
          {/* Show only when the main mobile menu is CLOSED */}
          {!isDisplayMobileMenu && (
            <div className={styles.rightActions}>
              {/* Docusaurus Search Bar */}
              <SearchBar />

              {/* --- General Options Trigger (Ellipsis) --- */}
              {/* Show this when NOT in docs context, OR always show it */}
              {/* Current logic: Show ellipsis always when menu is closed, even if FiMenu is also shown */}
              {/* To hide ellipsis when FiMenu is shown: {!showDocsMenuTrigger && (...)} */}
              <div
                className={styles.optionsButtonWrapper}
                aria-label="Open options menu" // More specific label
                onClick={openMenu}
                role="button"
                tabIndex={0} // Make focusable
                onKeyDown={(e) => handleKeyDown(e, openMenu)} // Keyboard activation
              >
                <FaEllipsisVertical
                  className={styles.optionsIcon}
                  aria-hidden="true"
                />
              </div>
            </div>
          )}

          {/* --- Close Button --- */}
          {/* Show only when the main mobile menu is OPEN */}
          {isDisplayMobileMenu && (
            <IoCloseSharp
              size={24} // Adjust size
              aria-hidden="true" // Icon is decorative for the button
              className={styles.closeIcon}
              onClick={closeMenu}
            />
          )}
        </div>
      </header>

      {/* --- Mobile Menu Content Area --- */}
      {/* This is the actual menu panel that slides out/appears */}
      {/* It's rendered conditionally based on the state */}
      {isDisplayMobileMenu && (
        <MobileMenu
          isOpen={isDisplayMobileMenu}
          onClose={closeMenu} // Pass the close function
        />
      )}
    </>
  );
}
