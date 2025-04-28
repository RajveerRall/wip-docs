// src/components/MobileIntegrate.tsx
import React from "react";
import Link from "@docusaurus/Link";
import styles from "./mobileIntegration.module.css"; // Import the CSS Module

// Define the structure for the NEW button data
interface NewPlatformData {
  name: string;
  icon: string; // Icon is now a URL string
  href?: string; // Optional pre-defined href
}

// --- Your NEW Data Arrays --- (Keep data as is)
const uiKitsList: NewPlatformData[] = [
  // ... (data remains the same)
  { name: "React", icon: "https://img.icons8.com/color/144/react-native.png" },
  {
    name: "React Native",
    icon: "https://img.icons8.com/color/144/react-native.png",
  },
  { name: "ios", icon: "https://img.icons8.com/color/144/swift.png" },
  { name: "Android", icon: "https://img.icons8.com/color/144/android-os.png" },
  { name: "Flutter", icon: "https://img.icons8.com/color/144/flutter.png" },
];

const sdks: NewPlatformData[] = [
  // ... (data remains the same)
  { name: "React", icon: "https://img.icons8.com/color/144/react-native.png" },
  {
    name: "React Native",
    icon: "https://img.icons8.com/color/144/react-native.png",
  },
  { name: "ios", icon: "https://img.icons8.com/color/144/swift.png" },
  { name: "Android", icon: "https://img.icons8.com/color/144/android-os.png" },
  { name: "Flutter", icon: "https://img.icons8.com/color/144/flutter.png" },
  {
    name: "Ionic/Capacitor",
    icon: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-ionic-a-complete-open-source-sdk-for-hybrid-mobile-app-development-logo-color-tal-revivo.png",
  },
];

const widgets: NewPlatformData[] = [
  // ... (data remains the same)
  {
    name: "Wordpress /BuddyPress",
    icon: "https://img.icons8.com/color/144/wordpress.png",
  },
  {
    name: "HTML/ Bootstrap/ JQuery",
    icon: "https://img.icons8.com/color/144/html-5--v1.png",
  },
];
// --- End Data ---

// --- Reusable PlatformButton Component (Inline with CSS Modules) ---
const PlatformButton: React.FC<{
  icon: React.ReactNode;
  text: string;
  href: string;
}> = ({ icon, text, href }) => {
  return (
    <Link to={href} className={styles.platformButton}>
      {/* Icon container */}
      <span className={styles.iconContainer}>
        {/* The icon prop will now contain the <img> tag */}
        {icon}
      </span>
      {/* Text */}
      <span className="text-body-2 font-medium">{text}</span>
    </Link>
  );
};

// --- Main Component ---
const MobileIntegrate: React.FC = () => {
  // Helper function to generate placeholder hrefs (Keep as is)
  const generateHref = (basePath: string, name: string): string => {
    const slug = name.toLowerCase().replace(/[\s/]+/g, "-");
    return `/docs/${basePath}/${slug}`; // Adjust base path structure as needed
  };

  return (
    // Apply styles to the main container
    <div className={styles.integrateContainer}>
      {/* UI Kits Section */}
      <div className={styles.section}>
        {" "}
        {/* Added section class */}
        <p className={`${styles.sectionTitle} text-context-1 font-semibold`}>UI Kits</p>
        <div className={styles.gridContainer}>
          {uiKitsList.map((item) => (
            <PlatformButton
              key={`ui-kit-${item.name}`}
              icon={
                <img
                  src={item.icon}
                  alt={`${item.name} icon`}
                  className={styles.iconImage} // Style the image itself
                />
              }
              text={item.name}
              href={item.href ?? generateHref("ui-kits", item.name)}
            />
          ))}
        </div>
      </div>

      {/* Divider */}
      <hr className={styles.divider} />

      {/* SDKs Section */}
      <div className={styles.section}>
        {" "}
        {/* Added section class */}
        <p className={`${styles.sectionTitle} text-context-1 font-semibold`}>SDKs</p>
        <div className={styles.gridContainer}>
          {sdks.map((item) => (
            <PlatformButton
              key={`sdk-${item.name}`}
              icon={
                <img
                  src={item.icon}
                  alt={`${item.name} icon`}
                  className={styles.iconImage} // Style the image itself
                />
              }
              text={item.name}
              href={item.href ?? generateHref("sdks", item.name)}
            />
          ))}
        </div>
      </div>

      {/* Divider */}
      <hr className={styles.divider} />

      {/* Widgets Section */}
      <div className={styles.section}>
        {" "}
        {/* Added section class */}
        <p className={`${styles.sectionTitle} text-context-1 font-semibold`}>Widgets</p>
          {widgets.map((item) => (
            <div style={{marginBottom:'0.5rem'}}>
              <PlatformButton
                key={`widget-${item.name}`}
                icon={
                  <img
                    src={item.icon}
                    alt={`${item.name} icon`}
                    className={styles.iconImage} // Style the image itself
                  />
                }
                text={item.name}
                href={item.href ?? generateHref("widgets", item.name)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MobileIntegrate;
