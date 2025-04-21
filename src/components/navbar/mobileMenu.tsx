import React, { useState } from "react"; // Re-added useState for integrate/platform toggle
import { IoChevronForward, IoChevronDownOutline } from "react-icons/io5";
import ThemeToggle from "./theme-toggle"; // Assuming this handles its own styles/imports
import MobileIntegrate from "./mobileIntegration"; // Assuming uses its own styles or passed classNames
import MobilePlatform from "./mobilePlatform"; // Assuming uses its own styles or passed classNames
import styles from "./mobileMenu.module.css"; // Import the CSS Module
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
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
    <Drawer
      open={isOpen}
      onClose={onClose}
      lockBackgroundScroll={isOpen}

      direction='left'
      size={'100vw'}

    >
      <div style={{ padding: '20px', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
        {/* Add more content here */}
        <div style={{ marginTop: '3rem' }}>
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

          <div className={styles.actionButtonsContainer}>
            <div onClick={handleLinkClick} className={styles.dashboardButton}>
              Dashboard
            </div>
            <div onClick={handleLinkClick} className={styles.contactButton}>
              Contact Support
            </div>

          </div>
          <div className={styles.spacer}></div>
          <div className={styles.themeToggleContainer}>
          {/* ThemeToggle should ideally handle its own styles */}
          <ThemeToggle />
        </div>
        </div>
      </div>
    </Drawer>
  );
};

export default MobileMenu;
