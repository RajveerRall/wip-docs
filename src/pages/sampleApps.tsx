import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useWindowSize } from "@docusaurus/theme-common/internal";

// Import the CSS Module
import styles from "./sampleApps.module.css"; // Make sure path is correct
import OfficeHoursCard from "./OfficeHoursCard";

// GitHub Icon component - Modified to use currentColor and accept className
const GithubIcon = (
  props: React.SVGProps<SVGSVGElement> & { width?: number; height?: number }
) => (
  <svg
    viewBox="0 0 16 16"
    aria-hidden="true"
    width={props.width || 16}
    height={props.height || 16}
    {...props} // Pass other props like className
  >
    <path
      fillRule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
      fill="currentColor" // Set fill to currentColor here
    ></path>
  </svg>
);

const SampleAppsSection = () => {
  const windowSize = useWindowSize();
  const isMobile = windowSize === "mobile";
  const sampleApps = [
    // Data remains the same
    {
      title: "React Chat App",
      link: "https://github.com/cometchat/cometchat-chat-sample-app-react",
    },
    {
      title: "Android Chat App (Kotlin)",
      link: "https://github.com/cometchat/cometchat-sample-app-android-kotlin",
    },
    {
      title: "React Native Chat App",
      link: "https://github.com/cometchat-pro/cometchat-chat-sample-app-react-native",
    },
    {
      title: "Flutter Chat App",
      link: "https://github.com/cometchat/cometchat-chat-sample-app-flutter",
    },
    {
      title: "iOS Chat App",
      link: "https://github.com/cometchat/cometchat-chat-sample-app-ios-swift",
    },
    {
      title: "Vue Chat App",
      link: "https://github.com/cometchat/cometchat-chat-sample-app-vue",
    },
    {
      title: "Android Chat App (Java)",
      link: "https://github.com/cometchat/cometchat-chat-sample-app-android-java",
    },
    {
      title: "Angular Chat App",
      link: "https://github.com/cometchat/cometchat-chat-sample-app-angular",
    },
  ];

  return (
    // Section Container
    <section className={styles.sectionContainer}>
      {/* Section Header */}
      <div className={styles.sectionHeader}>
        {/* Section Title */}
        <span className={`${styles.sectionTitle} ${isMobile?'text-h3':'text-h1'} font-semibold`}>Sample Apps</span>

        {/* View All Button */}
        <Link
          to="https://github.com/cometchat"
          className={`${styles.viewAllButton} text-button font-medium`} // Use module class
          target="_blank"
          rel="noopener noreferrer"
        >
          View All
        </Link>
      </div>

      {/* Section Description */}
      <p className={`${styles.sectionDescription} ${isMobile?'text-caption-1':'text-body-1'} font-regular`}>
        Explore practical examples of what you can achieve, and don't forget to
        check out our Interactive Demo.
      </p>

      {/* Apps Grid */}
      <div className={styles.appsGridContainer}>
        {/* Column 1 */}
        <div className={styles.appsColumn}>
          {sampleApps.slice(0, 4).map((app) => (
            <div key={app.title} className={styles.appRow}>
              {" "}
              {/* Use module class */}
              <div className={`${styles.appTitleText} text-body-1 font-semibold`}>
                {" "}
                {/* Use module class */}
                {app.title}
              </div>
              <Link
                to={app.link}
                className={`${styles.cloneButton} font-semibold`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className={styles.githubIcon} />{" "}
                {/* Use module class */}
                Clone
              </Link>
            </div>
          ))}
        </div>
        {/* Divider */}
        <div className={styles.divider} />
        {/* Column 2 */}
        <div className={styles.appsColumn}>
          {sampleApps.slice(4, 8).map((app) => (
            <div key={app.title} className={styles.appRow}>
            {" "}
            {/* Use module class */}
            <div className={`${styles.appTitleText} text-body-1 font-semibold`}>
              {" "}
              {/* Use module class */}
              {app.title}
            </div>
            <Link
              to={app.link}
              className={`${styles.cloneButton} font-semibold`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className={styles.githubIcon} />{" "}
              {/* Use module class */}
              Clone
            </Link>
          </div>
          ))}
        </div>
      </div>
      
      {/* Office Hours Section */}
      <OfficeHoursCard buttonLink="/contact" />
    </section>
  );
};

export default SampleAppsSection;
