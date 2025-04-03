import React, { useState } from "react"; // Re-added useState for integrate/platform toggle
import Link from "@docusaurus/Link";
import { useColorMode } from "@docusaurus/theme-common";
import { FiX } from "react-icons/fi";
import { IoChevronForward, IoChevronDownOutline } from "react-icons/io5";
import ThemeToggle from "./theme-toggle"; // Assuming this handles its own styles/imports
import MobileIntegrate from "./mobileIntegration"; // Assuming uses its own styles or passed classNames
import MobilePlatform from "./mobilePlatform"; // Assuming uses its own styles or passed classNames
import styles from "./mobileMenu.module.css"; // Import the CSS Module

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode(); // Keep if ThemeToggle needs it externally
  const [isDisplayIntegration, setDisplayIntegration] = useState(false);
  const [isDisplayPlatform, setDisplayPlatform] = useState(false);

  if (!isOpen) {
    return null;
  }

  // Function to close the menu when a navigational link is clicked
  const handleLinkClick = () => {
    onClose();
  };

  return (
    // Overlay container
    <div className={styles.mobileMenuOverlay} role="dialog" aria-modal="true">
      {/* Header */}
      <div className={styles.mobileMenuHeader}>
        <span className={styles.menuTitle}>cometchat docs</span>
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close menu"
        >
          <FiX size={24} /> {/* Keep size prop */}
        </button>
      </div>

      {/* Main Content Area */}
      <div className={styles.mainContent}>
        {/* --- START: Navigation Section with CSS Modules --- */}
        <nav className={styles.navSection}>
          <dl>
            {/* Integrate Section Toggle */}
            <dt>
              <button // Using button for better accessibility for toggle actions
                type="button"
                onClick={() => {
                  setDisplayIntegration(!isDisplayIntegration);
                  setDisplayPlatform(false);
                }}
                className={styles.navLink} // Use button specific styles if needed, or share navLink
              >
                <span>Integrate</span>
                {isDisplayIntegration ? (
                  <IoChevronDownOutline className={styles.chevronIcon} />
                ) : (
                  <IoChevronForward className={styles.chevronIcon} />
                )}
              </button>
            </dt>
            {isDisplayIntegration && (
              // Pass necessary styles or let component handle it
              <MobileIntegrate />
            )}

            {/* Platform Section Toggle */}
            <dt>
              <button // Using button for better accessibility for toggle actions
                type="button"
                onClick={() => {
                  setDisplayPlatform(!isDisplayPlatform);
                  setDisplayIntegration(false);
                }}
                className={styles.navLink} // Use button specific styles if needed, or share navLink
              >
                <span>Platform</span>
                {isDisplayPlatform ? (
                  <IoChevronDownOutline className={styles.chevronIcon} />
                ) : (
                  <IoChevronForward className={styles.chevronIcon} />
                )}
              </button>
            </dt>
            {isDisplayPlatform && (
              // Pass necessary styles or let component handle it
              <MobilePlatform />
            )}
          </dl>
        </nav>
        {/* --- END: Navigation Section --- */}

        {/* Action Buttons */}
        <div className={styles.actionButtonsContainer}>
          {/* Dashboard Button */}
          <Link
            to="/dashboard" // Adjust path as needed
            onClick={handleLinkClick}
            className={styles.dashboardButton}
          >
            Dashboard
          </Link>

          {/* Contact Support Button */}
          <Link
            to="/contact" // Adjust path as needed
            onClick={handleLinkClick}
            className={styles.contactButton}
          >
            Contact Support
          </Link>
        </div>

        {/* Spacer to push theme toggle to bottom */}
        <div className={styles.spacer}></div>

        {/* Theme Toggle Section */}
        <div className={styles.themeToggleContainer}>
          {/* ThemeToggle should ideally handle its own styles */}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
