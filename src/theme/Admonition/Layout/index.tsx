// src/theme/Admonition/Layout/index.tsx
// (Or wherever your AdmonitionLayout component resides)

import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import type {Props} from '@theme/Admonition/Layout';

import styles from './styles.module.css'; // Make sure this path is correct

// --- Define your Custom Icons Here ---
// Option 1: Import SVG files as React Components (Recommended for custom icons)
// Make sure your build setup supports this (Docusaurus usually does via SVGR)
// Place your SVGs somewhere like `src/components/icons/`
// import NoteIcon from '@site/src/components/icons/note.svg';
// import TipIcon from '@site/src/components/icons/tip.svg';
// import WarningIcon from '@site/src/components/icons/warning.svg';
// import DangerIcon from '@site/src/components/icons/danger.svg';
// import InfoIcon from '@site/src/components/icons/info.svg'; // Default/fallback

// Option 2: Use an Icon Library (Example: react-icons)
import {
    IoInformationCircleOutline,
    IoCheckmarkCircleOutline,
    IoWarningOutline,
    IoCloseCircleOutline,
    IoBookOutline, // Example for 'note'
} from 'react-icons/io5';

// --- Create the Icon Mapping ---
// Map the 'type' string to the corresponding icon component
const AdmonitionIconComponents = {
    note: IoBookOutline, // Replace with NoteIcon if using custom SVG
    tip: IoCheckmarkCircleOutline, // Replace with TipIcon
    warning: IoWarningOutline, // Replace with WarningIcon
    danger: IoCloseCircleOutline, // Replace with DangerIcon
    info: IoInformationCircleOutline, // Replace with InfoIcon
    // Add mappings for any other custom types you might have
    // You can also define a default/fallback icon
    default: IoInformationCircleOutline, // Replace with InfoIcon or your preferred default
};
// --- End Icon Definitions ---


// AdmonitionContainer remains the same
function AdmonitionContainer({
  type,
  className,
  children,
}: Pick<Props, 'type' | 'className'> & {children: ReactNode}) {
  return (
    <div
      // Apply base classes, type-specific class (for CSS styling), and custom class
      className={clsx(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(type), // e.g., 'admonition-note'
        styles.admonition,
        className,
      )}>
      {children}
    </div>
  );
}

// AdmonitionContent remains the same
function AdmonitionContent({children}: Pick<Props, 'children'>) {
  return children ? (
    <div className={styles.admonitionContent}>{children}</div>
  ) : null;
}

// *** MODIFIED AdmonitionLayout ***
export default function AdmonitionLayout(props: Props): JSX.Element {
  const {type,children, className} = props;

  // Select the correct Icon Component based on the type
  const IconComponent =
    AdmonitionIconComponents[type] || AdmonitionIconComponents.default;

  return (
    <AdmonitionContainer type={type} className={className}>
      {/* Render the selected Icon Component */}
      <span className={styles.admonitionIconContainer}> {/* Optional: Container for styling */}
        <IconComponent className={styles.admonitionIconSvg} /> {/* Apply styling class */}
      </span>

      {/* Wrapper for the main content (no title needed as per your previous code) */}
      {/* Apply text styling classes here if desired, or in CSS */}
      <div className={styles.admonitionTextContent} >
        <AdmonitionContent>{children}</AdmonitionContent>
      </div>
    </AdmonitionContainer>
  );
}