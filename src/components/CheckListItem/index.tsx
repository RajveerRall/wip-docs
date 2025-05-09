// src/components/CheckListItem/index.tsx
import React, { useState, type ReactNode } from 'react';
import clsx from 'clsx';
import { FaCheck } from "react-icons/fa"; // Import the icon
import styles from './CheckListItem.module.css';

type Props = {
  children: ReactNode;
  initialChecked?: boolean;
};

const CheckListItem: React.FC<Props> = ({ children, initialChecked = false }) => {
  const [isChecked, setIsChecked] = useState<boolean>(initialChecked);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      className={clsx(styles.checkListItemContainer, isChecked && styles.checked)}
      onClick={toggleCheck}
      role="checkbox"
      aria-checked={isChecked}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          toggleCheck();
        }
      }}
    >
      {/* Container for the custom checkbox visual (the box) */}
      <div className={styles.customCheckboxBox}>
        {/* Conditionally render the FaCheck icon when isChecked is true */}
        {isChecked && <FaCheck className={styles.checkIcon} />}
      </div>

      {/* The actual content/label */}
      <div className={`${styles.checkListItemContent} text-body-1 font-regular`}>{children}</div>
    </div>
  );
};

export default CheckListItem;