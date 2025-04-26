import React from "react";
import Link from "@docusaurus/Link";

// Import the CSS Module
import styles from "./frameworkCard.module.css"; // Correct path

// Props interface remains the same
interface FrameworkCardProps {
  icon: string;
  title: string;
  version: string;
  link: string;
  className?: string; // Keep className prop for potential overrides or additions
}

export default function FrameworkCard({
  icon,
  title,
  version,
  link,
  className = "", // Default to empty string
}: FrameworkCardProps): React.ReactElement {
  // Combine module class with any passed className
  const linkClasses = `${styles.cardLink} ${className}`.trim();

  return (
    <div
      // to={link}
      onClick={() => {
        window.location.href = link;
      }}
      className={linkClasses} // Use combined classes
    >
      {/* Use CSS module class for the card body */}
      <div className={styles.cardBody}>
        {/* Icon Container */}
        <div className={styles.iconContainer}>
          <img
            src={icon}
            alt={`${title} logo`}
            className={styles.iconImage} // Use CSS module class for the icon
          />
        </div>

        {/* Card Content */}
        <div className={styles.cardContent}>
          {/* Title */}
          <span
            className={`${styles.cardTitle} font-semibold text-body-2`} // Use CSS module class for the title
            title={title} // Keep title attribute for accessibility on truncation
          >
            {title}
          </span>

          {/* Version Badge */}
          {version && (
            <span
              className={styles.versionBadge} // Use CSS module class for the badge
            >
              V{version}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
