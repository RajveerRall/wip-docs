// src/components/FeatureCard/index.tsx
import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link'; // Import Docusaurus Link for potential linking
import styles from './FeatureCard.module.css'; // Import the CSS module

// Define the props the component accepts
type Props = {
  number: string;      // The number (e.g., "01", "02")
  title: string;       // The main title (e.g., "Image")
  description: ReactNode; // The description content
  href?: string;       // Optional URL to make the card a link
};

const FeatureCard: React.FC<Props> = ({
  number,
  title,
  description,
  href,
}) => {
  // Determine the main container element: Link if href exists, else div
  const ContainerElement = href ? Link : 'div';
  const containerProps = href ? { to: href, className: styles.cardLink } : { className: styles.cardContainer };

  return (
    // Use the determined container element and props
    <ContainerElement {...containerProps}>
      {/* Numbered Box */}
      <div className={styles.numberBox}>
        {number}
      </div>

      {/* Content Area (Title + Description) */}
      <div className={styles.contentArea}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </ContainerElement>
  );
};

export default FeatureCard;