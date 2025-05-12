import React from 'react';
// CRITICAL: Ensure this CSS module file is named MobileOfficeHoursCard.module.css
// and is in the same directory as this .tsx file.
import styles from './MobileOfficeHoursCard.module.css';
import useBaseUrl from "@docusaurus/useBaseUrl";

// Renamed for consistency
interface MobileOfficeHoursCardProps {
  title?: string;
  description?: string;
  buttonText?: string;
  imageSrc?: string; // Path to the background image (will be resolved by useBaseUrl)
}

const DEFAULT_TITLE = "CometChat Solutions Office Hours";
const DEFAULT_DESCRIPTION = "Join our solutions office hours to brainstorm and ideate on your use cases, get guidance on integration from our solution engineers.";
const DEFAULT_BUTTON_TEXT = "Book Your Slot";

// Default image path if imageSrc prop is not provided to the component
const DEFAULT_CLOCK_IMAGE_PATH = "imgs/clock-bg.svg";
const CALENDLY_LINK = 'https://calendly.com/cometchat-office-hours/cometchat-solutions-engineering-office-hours';

export default function MobileOfficeHoursCard({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  buttonText = DEFAULT_BUTTON_TEXT,
  imageSrc = DEFAULT_CLOCK_IMAGE_PATH, // Use the prop, or default if not provided
}: MobileOfficeHoursCardProps): JSX.Element {

  const handleButtonClick = () => {
    window.open(CALENDLY_LINK, '_blank', 'noopener,noreferrer');
  };

  // Resolve the image source using useBaseUrl.
  // It will use the imageSrc prop if provided, otherwise it uses DEFAULT_CLOCK_IMAGE_PATH.

  return (
    <div className={styles.cardContainer}>
      <img
        src={useBaseUrl("imgs/clock-bg.svg")}
        height={500}
        width={500}
        alt="" // Decorative
        className={styles.backgroundImage}
        aria-hidden="true"
      />
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        {buttonText && (
          <button
            type="button"
            className={styles.ctaButton}
            onClick={handleButtonClick}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}