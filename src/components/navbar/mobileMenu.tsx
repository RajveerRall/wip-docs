import React, { useState, useEffect } from "react";
import { IoChevronForward, IoChevronDownOutline, IoClose } from "react-icons/io5";
import ThemeToggle from "./theme-toggle";
import MobileIntegrate from "./mobileIntegration";
import MobilePlatform from "./mobilePlatform";
import styles from "./mobileMenu.module.css"; // Your CSS module

// Example Close Function (replace with your actual logic)
const handleClose = () => {
  console.log("Close menu clicked");
  // --- Add your logic here to hide the menu ---
  document.body.style.overflow = ''; // Re-enable scroll on close
};

const MobileMenu = () => {
  const [isDisplayIntegration, setDisplayIntegration] = useState(false);
  const [isDisplayPlatform, setDisplayPlatform] = useState(false);

  // Effect to disable body scroll when the menu is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow || '';
    };
  }, []);

  // Click handler for the Integrate button
  const handleIntegrateClick = () => {
    const nextState = !isDisplayIntegration; // Calculate next state before setting
    setDisplayIntegration(nextState);
    if (nextState) { // If we are turning Integrate ON
      setDisplayPlatform(false); // Turn Platform OFF
    }
  };

  // Click handler for the Platform button
  const handlePlatformClick = () => {
    const nextState = !isDisplayPlatform; // Calculate next state before setting
    setDisplayPlatform(nextState);
    if (nextState) { // If we are turning Platform ON
      setDisplayIntegration(false); // Turn Integrate OFF
    }
  };


  return (
    // Main overlay container
    <div className={styles.mobileMenuOverlay}>

      {/* 1. Header (Fixed Top) */}
      <div className={styles.mobileMenuHeader}>
        <span className={styles.menuTitle}>Menu</span>
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close menu"
        >
          <IoClose size={24} />
        </button>
      </div>

      {/* 2. Main Content (Scrollable Area) */}
      <div className={styles.mainContent}>

        {/* --- Navigation Buttons --- */}
        {/* Removed dl/dt structure */}
        <div className={styles.navSection}> {/* Using navSection for spacing */}
          {/* Integrate Button */}
          <button
            type="button"
            onClick={handleIntegrateClick} // Use specific handler
            className={styles.navLink} // Use navLink style for the button
             // Indicate active state visually via icon or different style if needed
             aria-pressed={isDisplayIntegration} // Use aria-pressed for toggle buttons controlling other regions
          >
            <span className="text-body-2 font-regular">Integrate</span>
             {/* Icon can indicate state or just presence */}
            {isDisplayIntegration ? (
                <IoChevronDownOutline className={styles.chevronIcon} />
              ) : (
                <IoChevronForward className={styles.chevronIcon} />
            )}
          </button>
          <div className={styles.dynamicContentSection}> {/* Add spacing/styling via CSS */}
          {isDisplayIntegration && (
              <MobileIntegrate />
          )}
        </div>

          {/* Platform Button */}
          <button
            type="button"
            onClick={handlePlatformClick} // Use specific handler
            className={styles.navLink} // Use navLink style for the button
             aria-pressed={isDisplayPlatform} // Use aria-pressed
          >
            <span className="text-body-2 font-regular">Platform</span>
             {/* Icon can indicate state or just presence */}
            {isDisplayPlatform ? (
                <IoChevronDownOutline className={styles.chevronIcon} />
              ) : (
                <IoChevronForward className={styles.chevronIcon} />
            )}
          </button>
        </div>
        {/* --- End Navigation Buttons --- */}


        {/* --- Conditionally Rendered Content Area --- */}
        {/* This div appears below the buttons when a corresponding state is true */}
        <div className={styles.dynamicContentSection}> {/* Add spacing/styling via CSS */}
          {isDisplayPlatform && (
              <MobilePlatform />
          )}
        </div>
        {/* --- End Conditionally Rendered Content Area --- */}

        {/* --- Action Buttons --- */}
        {/* These appear below the navigation buttons and the dynamic content area */}
        <div className={styles.actionButtonsContainer}>
          <a href="/dashboard" className={`${styles.dashboardButton} text-content-1`}>
            Dashboard
          </a>
          <a href="/contact" className={`${styles.contactButton} text-footnote`}>
            Contact Support
          </a>
        </div>
        {/* --- End Action Buttons --- */}

      </div> {/* End of mainContent */}


      {/* 3. Footer (Fixed Bottom) */}
      <div className={styles.themeToggleContainer}>
        <span className="text-footnote">Theme:</span>
        <ThemeToggle />
      </div>

    </div> // End of mobileMenuOverlay
  );
};

export default MobileMenu;