import React from "react";
import FrameworkCard from "./frameworkCard"; // Assuming FrameworkCard is styled independently
import { useWindowSize } from "@docusaurus/theme-common/internal";

// Import the CSS Module
import styles from "./frameworkGrid.module.css"; // Correct path to the CSS module

// Define the Framework interface (remains the same)
export interface Framework {
  id: string;
  title: string;
  version: string;
  icon: string;
  link: string;
}

// Define props interface for FrameworkGrid component (remains the same)
export interface FrameworkGridProps {
  title: string;
  description: string;
  frameworks: Framework[];
}

export default function FrameworkGrid({
  title,
  description,
  frameworks,
}: FrameworkGridProps): React.ReactElement {
  const windowSize = useWindowSize();
  const isMobile = windowSize === "mobile";
  return (
    // Use CSS module class for the section container
    <div className={styles.gridSection}>
      {/* Use CSS module class for the Section Title */}
      <p className={`${styles.gridTitle} ${isMobile?'text-h3':'text-h2'} font-semibold`}>{title}</p>
      {/* Use CSS module class for the Section Description */}
      <p className={`${styles.gridDescription} ${isMobile?'text-caption-1':'text-body-2'}`}>{description}</p>

      {/* Use CSS module class for the Grid Layout */}
      <div className={styles.frameworkItemsGrid}>
        {Array.isArray(frameworks) &&
          frameworks.map((framework) => (
            // Pass framework data to FrameworkCard
            // FrameworkCard needs to handle its own styling.
            // If FrameworkCard needs specific grid item styling (like height),
            // it should define those styles itself or accept classNames.
            <FrameworkCard
              key={framework.id}
              icon={framework.icon}
              title={framework.title}
              version={framework.version}
              link={framework.link}
              // className={styles.gridItemCard} // Example if FrameworkCard accepted a className
            />
          ))}
      </div>
    </div>
  );
}
