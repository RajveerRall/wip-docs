import React from 'react';
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from './OfficeHoursCard.module.css'; // CSS Module for styling

interface OfficeHoursCardProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string; // URL for the button
}

export default function OfficeHoursCard({
  title = "CometChat Solutions Office Hours", // Default title
  description = "Join our solutions office hours to brainstorm and ideate on your use cases, get guidance on integration from our solution engineers.", // Default description
  buttonText = "Book Your Slot", // Default button text
  buttonLink = "#", // Default link (can be updated via props)
}: OfficeHoursCardProps): JSX.Element {
  return (
    <div className={`${styles.cardContainer}`}>
      {/* Left side content */}
      <div className={styles.contentArea}>
        <p className={`${styles.title} text-h1 font-semibold`}>{title}</p>
        <p className={`${styles.description} text-body-1 font-regular`}>{description}</p>
        {buttonLink && buttonText && (
          <div className={styles.bookButton}>
            {buttonText}
          </div>
        )}
      </div>

      {/* Right side icon */}
      <div className={styles.iconContainer}>
        {/* <FiClock className={styles.clockIcon} /> */}
        <img
            src={useBaseUrl("imgs/clock-bg.svg")}
            alt="Office Hours"
            className={styles.officeHoursImage} // Use module class
            aria-hidden="true"
          />
      </div>
    </div>
  );
}