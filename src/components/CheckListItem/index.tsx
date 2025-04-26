// src/components/CheckListItem/index.tsx
import React, { useState, type ReactNode } from 'react';
import clsx from 'clsx'; // Utility for conditional classes
import styles from './CheckListItem.module.css';

type Props = {
  children: ReactNode;
  initialChecked?: boolean; // Optional: set the initial state
};

const CheckListItem: React.FC<Props> = ({ children, initialChecked = false }) => {
  // State to track if the item is checked
  const [isChecked, setIsChecked] = useState<boolean>(initialChecked);

  // Function to toggle the state
  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    // Main container div - make it clickable
    // Apply 'checked' class conditionally using clsx
    <div
      className={clsx(styles.checkListItemContainer, isChecked && styles.checked)}
      onClick={toggleCheck}
      role="checkbox" // ARIA role
      aria-checked={isChecked} // ARIA state
      tabIndex={0} // Make it focusable
      onKeyDown={(e) => { // Allow toggling with Space key
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault(); // Prevent scrolling/default action
          toggleCheck();
        }
      }}
    >
      {/* Visually hidden but accessible real checkbox */}
      <input
        type="checkbox"
        className={styles.hiddenCheckbox}
        checked={isChecked}
        onChange={toggleCheck} // Sync state if interacted with directly (e.g., screen reader)
        tabIndex={-1} // Remove from default tab order (parent div handles it)
        aria-hidden="true" // Hide from accessibility tree as parent handles role/state
      />

      {/* The custom styled checkbox icon (using ::before) */}
      <div className={styles.customCheckboxIcon}></div>

      {/* The actual content */}
      <div className={`${styles.checkListItemContent} text-body-1 font-regular`}>{children}</div>
    </div>
  );
};

export default CheckListItem;