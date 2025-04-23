// src/components/MobilePlatform.tsx

import React from "react";
import Link from "@docusaurus/Link";
// Removed useBaseUrl as it's not used in the provided code snippet
// import useBaseUrl from '@docusaurus/useBaseUrl';

// --- Import Icons --- (Keep as is)
import {
  MdDashboard,
  MdAccountTree,
  MdNotificationsActive,
  MdInsights,
} from "react-icons/md";
import { FaShapes } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import { RiFileCodeFill } from "react-icons/ri";
import { FaShield, FaRobot } from "react-icons/fa6";

// --- Import CSS Module ---
import styles from "./mobilePlatform.module.css";

// --- Interfaces for Data Structure --- (Keep as is)
interface NewCardItemBase {
  name: string;
  description?: string;
  link?: string;
  id?: string; // Make id optional, use name as key fallback
}
interface CardItemWithComponentIcon extends NewCardItemBase {
  icon: React.ComponentType<any>;
}
interface CardItemWithImageUrl extends NewCardItemBase {
  icon: string;
}
function isIconComponent(
  icon: React.ComponentType<any> | string
): icon is React.ComponentType<any> {
  return typeof icon === "function";
}
type NewCardItem = CardItemWithComponentIcon | CardItemWithImageUrl;
// Removed NewSectionData interface as it's not used for mapping

// --- Data Arrays --- (Keep as is, adding optional id if needed)
const chatsAndCalling: NewCardItem[] = [
  // ... (data remains the same)
  {
    id: "overview",
    name: "Overview",
    icon: MdDashboard,
    description: "Learn the basic of CometChat messaging system.",
  },
  {
    id: "features",
    name: "Features",
    icon: FaShapes,
    description: "Enhance in-app messaging with CometChat's extensions.",
  },
  {
    id: "multi-tenancy",
    name: "Multi-tenancy",
    icon: MdAccountTree,
    description: "Manage multiple accounts efficiently with multi-tenancy.",
  },
  {
    id: "data-migration",
    name: "Data Migration",
    icon: BiTransfer,
    description: "Seamlessly migrate chats from other provider to CometChat.",
  },
  {
    id: "webhooks",
    name: "Webhooks",
    icon: RiFileCodeFill,
    description: "Receive real-time CometChat events via HTTP requests.",
  },
];

const extendData: NewCardItem[] = [
  // ... (data remains the same)
  {
    id: "notification",
    name: "Notification",
    icon: MdNotificationsActive,
    description: "Boost engagment by sending instant user notification.",
  },
  {
    id: "moderation",
    name: "Moderation",
    icon: FaShield,
    description: "Ensure safety with advance content filtering tools.",
  },
  {
    id: "ai-chatbots",
    name: "AI Chatbots",
    icon: FaRobot,
    description: "Automate conversations using AI-powered chatbot technology.",
  },
  {
    id: "insights",
    name: "Insights",
    icon: MdInsights,
    description: "Generate AI-powered insights for meaningful conversation.",
  },
];

const sampleApps: NewCardItem[] = [
  // ... (data remains the same, note: type is CardItemWithImageUrl here)
  {
    name: "React Chat App",
    icon: "https://img.icons8.com/color/144/react-native.png",
  },
  {
    name: "React Native Chat App",
    icon: "https://img.icons8.com/color/144/react-native.png",
  },
  { name: "iOS chat App", icon: "https://img.icons8.com/color/144/swift.png" },
  {
    name: "Android chat App (JAVA)",
    icon: "https://img.icons8.com/color/144/android-os.png",
  },
  {
    name: "Android chat App (Kotlin)",
    icon: "https://img.icons8.com/color/144/kotlin.png",
  },
];

// --- Reusable InfoCard Component (Inline with CSS Modules) ---
interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  href: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  description,
  href,
}) => {
  const isExternal = href.startsWith("http");

  const content = (
    <>
      {/* Icon and Title Row */}
      <div className={styles.cardHeader}>
        <div className={styles.cardIconContainer}>{icon}</div>
        <p className={`${styles.cardTitle} font-semibold`}>{title}</p>
      </div>
      {/* Description */}
      {description && description.trim() && (
        <p className={styles.cardDescription}>{description}</p>
      )}
    </>
  );

  // Use the same style class for both link types
  return isExternal ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.infoCard}
    >
      {content}
    </a>
  ) : (
    <Link to={href} className={styles.infoCard}>
      {content}
    </Link>
  );
};
// --- End Inline InfoCard ---

// --- Reusable PlatformButton Component (Inline with CSS Modules) ---
// This is similar/identical to the one in MobileIntegrate
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
      <span className="text-caption-2 font-semibold">{text}</span>
    </Link>
  );
};
// --- End Inline PlatformButton ---

// --- Main Exported Component ---
const MobilePlatform: React.FC = () => {
  // Helper function (optional, if you need dynamic links for sample apps)
  // const generateHref = (basePath: string, name: string): string => {
  //   const slug = name.toLowerCase().replace(/[\s/()]+/g, '-');
  //   return `/docs/${basePath}/${slug}`;
  // };

  return (
    <div className={styles.platformContainer}>
      {/* --- Chats & Calling Section --- */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Chats & Calling</h2>
        <div className={styles.gridContainer}>
          {chatsAndCalling.map((item) => {
            let renderedIcon: React.ReactNode;
            // Icon Rendering Logic (Keep as is)
            if (isIconComponent(item.icon)) {
              const IconComponent = item.icon;
              // Apply size class if needed, or let CSS handle it
              renderedIcon = <IconComponent className={styles.iconComponent} />;
            } else {
              renderedIcon = (
                <img
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                  className={styles.iconImage}
                  loading="lazy"
                />
              );
            }
            // Use placeholder '#' if link is missing
            const linkHref = item.link ?? "#";

            return (
              <InfoCard
                key={item.id ?? item.name} // Use id or fallback to name for key
                icon={renderedIcon}
                title={item.name}
                description={item.description}
                href={linkHref}
              />
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <hr className={styles.divider} />

      {/* --- Extend Section --- */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Extend</h2>
        <div className={styles.gridContainer}>
          {extendData.map((item) => {
            let renderedIcon: React.ReactNode;
            // Icon Rendering Logic (Keep as is)
            if (isIconComponent(item.icon)) {
              const IconComponent = item.icon;
              renderedIcon = <IconComponent className={styles.iconComponent} />;
            } else {
              renderedIcon = (
                <img
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                  className={styles.iconImage}
                  loading="lazy"
                />
              );
            }
            const linkHref = item.link ?? "#";

            return (
              <InfoCard
                key={item.id ?? item.name}
                icon={renderedIcon}
                title={item.name}
                description={item.description}
                href={linkHref}
              />
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <hr className={styles.divider} />

      {/* --- Sample Apps Section --- */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Sample Apps</h2>
          {sampleApps.map((item) => (
            <PlatformButton
              key={`sample-${item.name}`} // Use name for key
              icon={
                <img
                  src={item.icon}
                  alt={`${item.name} icon`}
                  className={styles.buttonIconImage} // Style the image itself
                />
              }
              text={item.name}
              // Provide a placeholder href or generate one
              href={item.link ?? "#"}
              // href={item.link ?? generateHref('sample-apps', item.name)}
            />
          ))}
        </div>
        {/* Added Link component for "See All Apps" for consistency */}
        <Link to="/docs/sample-apps" className={styles.seeAllAppsLink}>
          {" "}
          {/* Adjust href as needed */}
          See All Apps
        </Link>
      </div>
  );
};

export default MobilePlatform;
