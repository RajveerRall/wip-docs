// src/components/StepBlock.tsx
import React, { type ReactNode } from 'react';
import styles from './StepBlock.module.css'; // Import the CSS module

// Define the props the component accepts
type Props = {
  label: string; // The text for the step label (e.g., "Step 01")
  children: ReactNode; // The content that follows the label
};

// Define the functional component
const StepBlock: React.FC<Props> = ({ label, children }) => {
  return (
    // The main container div for spacing
    <div className={styles.stepBlockContainer}>
      {/* The styled label box */}
      {/* We ensure label exists before rendering */}
      {label && <div className={styles.stepLabel}>{label}</div>}

      {/* The main content area */}
      <div className={styles.stepContent}>{children}</div>
    </div>
  );
};

export default StepBlock;