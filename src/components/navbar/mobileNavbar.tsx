import React, { useState } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useColorMode } from "@docusaurus/theme-common";
import SearchBar from "@theme/SearchBar"; // <-- Keep this
import { FaEllipsisVertical } from "react-icons/fa6";
// Import the CSS Module
import styles from "./mobileNavbar.module.css";
// Keep existing CSS if it styles unrelated things or MobileMenu deeply
import MobileMenu from "./mobileMenu";
import { IoCloseSharp } from "react-icons/io5";

export default function YourMobileNavbarComponent() {
  const { colorMode } = useColorMode();
  const lightLogoUrl = useBaseUrl("/imgs/lightlogo.svg");
  const darkLogoUrl = useBaseUrl("/imgs/logo.svg");
  const logoUrl = colorMode === "dark" ? darkLogoUrl : lightLogoUrl;
  const [isDisplayMobileMenu, setIsDisplayMobileMenu] =
    useState<boolean>(false);

  return (
    <>
      {/* Keep base 'navbar' class for Docusaurus theme integration */}
      {/* Add module class for specific height or overrides */}
      <header className={`navbar ${styles.navbarHeader} mobile-navbar-context`}>
        <div className={styles.navbarContent}>
          {" "}
          {/* Use module class */}
          <div className={styles.logoContainer}>
            {" "}
            {/* Use module class */}
            <Link to="/">
              <img
                src={logoUrl}
                alt="CometChat Docs"
                className={styles.logoImage} // Use module class
              />
            </Link>
          </div>
          {!isDisplayMobileMenu && (
            <div className={styles.rightActions}>
              {" "}
              {/* Use module class */}
              {/* SearchBar likely uses theme styling */}
              <SearchBar />
              {/* Options Button */}
              <div
                className={styles.optionsButtonWrapper} // Use module class
                aria-label="Options"
                onClick={() => setIsDisplayMobileMenu(true)} // Move onClick here
                role="button" // Add role for accessibility
                tabIndex={0} // Make it focusable
                onKeyDown={(e) =>
                  e.key === "Enter" && setIsDisplayMobileMenu(true)
                } // Keyboard activation
              >
                <FaEllipsisVertical
                  className={styles.optionsIcon} // Use module class
                  aria-hidden="true"
                  // Removed onClick from icon, it's on the wrapper now
                />
              </div>
            </div>
          )}
          {isDisplayMobileMenu && (
            // Close Button - Apply module style and onClick
            <IoCloseSharp
              size={20} // Keep size prop
              className={styles.closeButton} // Use module class
              onClick={() => setIsDisplayMobileMenu(false)}
              role="button" // Accessibility
              aria-label="Close menu" // Accessibility
            />
          )}
        </div>
      </header>
      {/* MobileMenu likely handles its own styling */}
      {isDisplayMobileMenu && (
        <MobileMenu
          isOpen={isDisplayMobileMenu}
          onClose={() => setIsDisplayMobileMenu(false)}
        />
      )}
    </>
  );
}
