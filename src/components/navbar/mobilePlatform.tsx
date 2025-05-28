// src/components/MobilePlatform.tsx
import React from "react";
import Link from "@docusaurus/Link";
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
  id?: string;
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

// --- Data Arrays --- (Keep as is)
const chatsAndCalling: NewCardItem[] = [
  {
    id: "overview",
    name: "Overview",
    icon: MdDashboard,
    description: "Learn the basic of CometChat messaging system.",
    link: "/docs/chat-and-calling/overview", // Example link
  },
  {
    id: "features",
    name: "Features",
    icon: FaShapes,
    description: "Enhance in-app messaging with CometChat's extensions.",
    link: "/docs/chat-and-calling/features", // Example link
  },
  {
    id: "multi-tenancy",
    name: "Multi-tenancy",
    icon: MdAccountTree,
    description: "Manage multiple accounts efficiently with multi-tenancy.",
    link: "/docs/chat-and-calling/multi-tenancy", // Example link
  },
  {
    id: "data-migration",
    name: "Data Migration",
    icon: BiTransfer,
    description: "Seamlessly migrate chats from other provider to CometChat.",
    link: "/docs/chat-and-calling/data-migration", // Example link
  },
  {
    id: "webhooks",
    name: "Webhooks",
    icon: RiFileCodeFill,
    description: "Receive real-time CometChat events via HTTP requests.",
    link: "/docs/chat-and-calling/webhooks", // Example link
  },
];

const extendData: NewCardItem[] = [
  {
    id: "notification",
    name: "Notification",
    icon: MdNotificationsActive,
    description: "Boost engagment by sending instant user notification.",
    link: "/docs/extend/notification", // Example link
  },
  {
    id: "moderation",
    name: "Moderation",
    icon: FaShield,
    description: "Ensure safety with advance content filtering tools.",
    link: "/docs/extend/moderation", // Example link
  },
  {
    id: "ai-chatbots",
    name: "AI Chatbots",
    icon: FaRobot,
    description: "Automate conversations using AI-powered chatbot technology.",
    link: "/docs/extend/ai-chatbots", // Example link
  },
  {
    id: "insights",
    name: "Insights",
    icon: MdInsights,
    description: "Generate AI-powered insights for meaningful conversation.",
    link: "/docs/extend/insights", // Example link
  },
];

const sampleApps: NewCardItem[] = [
  {
    name: "React Chat App",
    icon: "https://img.icons8.com/color/144/react-native.png",
    link: "/docs/sample-apps/react", // Example link
  },
  {
    name: "React Native Chat App",
    icon: "https://img.icons8.com/color/144/react-native.png",
    link: "/docs/sample-apps/react-native", // Example link
  },
  { 
    name: "iOS chat App", 
    icon: "https://img.icons8.com/color/144/swift.png",
    link: "/docs/sample-apps/ios", // Example link 
  },
  {
    name: "Android chat App (Java)",
    icon: "https://img.icons8.com/color/144/android-os.png",
    link: "/docs/sample-apps/android-java", // Example link
  },
  {
    name: "Android chat App (Kotlin)",
    icon: "https://img.icons8.com/color/144/kotlin.png",
    link: "/docs/sample-apps/android-kotlin", // Example link
  },
];

// --- Reusable InfoCard Component ---
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
      <div className={styles.cardHeader}>
        <div className={styles.cardIconContainer}>{icon}</div>
        <p className={`${styles.cardTitle} text-body-2 font-semibold`}>{title}</p>
      </div>
      {description && description.trim() && (
        <p className={`${styles.cardDescription} text-caption-1 font-regular`}>{description}</p>
      )}
    </>
  );

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

// --- Reusable PlatformButton Component ---
const PlatformButton: React.FC<{
  icon: React.ReactNode;
  text: string;
  href: string;
}> = ({ icon, text, href }) => {
  return (
    <Link to={href} className={styles.platformButton}>
      <span className={styles.iconContainer}>
        {icon}
      </span>
      <span className="text-body-2 font-semibold">{text}</span>
    </Link>
  );
};

// --- Main Exported Component ---
const MobilePlatform: React.FC = () => {
  return (
    <div className={styles.platformContainer}> {/* NO OVERALL PADDING HERE */}
      {/* --- Chats & Calling Section --- */}
      <div className={styles.paddedSectionContent}> {/* NEW WRAPPER for padding */}
        <h2 className={styles.sectionTitle}>Chats & Calling</h2>
        <div className={styles.gridContainer}>
          {chatsAndCalling.map((item) => {
            let renderedIcon: React.ReactNode;
            if (isIconComponent(item.icon)) {
              const IconComponent = item.icon;
              renderedIcon = <IconComponent className={styles.iconComponent} />;
            } else {
              renderedIcon = (
                <img
                  src={item.icon}
                  alt="" // Consider adding meaningful alt text if icons are not purely decorative
                  aria-hidden="true"
                  className={styles.iconImage}
                  loading="lazy"
                />
              );
            }
            const linkHref = item.link ?? "#"; // Fallback to # if no link

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

      {/* <hr className={styles.divider} />  */}

      {/* --- Extend Section --- */}
      <div className={styles.paddedSectionContent}> {/* NEW WRAPPER for padding */}
        <h2 className={styles.sectionTitle}>Extend</h2>
        <div className={styles.gridContainer}>
          {extendData.map((item) => {
            let renderedIcon: React.ReactNode;
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

      {/* <hr className={styles.divider} />  */}

      {/* --- Sample Apps Section --- */}
      <div className={styles.paddedSectionContentLast}> {/* NEW WRAPPER for padding */}
        <h2 className={styles.sectionTitle}>Sample Apps</h2>
        {/* Note: Sample Apps buttons are direct children in your structure, not in a grid */}
        {sampleApps.map((item) => (
          <div style={{ marginBottom: "0.5rem" }} key={`sample-${item.name}`}> {/* Added key to wrapper div */}
            <PlatformButton
              icon={
                <img
                  src={item.icon}
                  alt={`${item.name} icon`}
                  className={styles.iconImage} // Using .iconImage, ensure it's styled for buttons if different from card icons
                />
              }
              text={item.name}
              href={item.link ?? "#"}
            />
          </div>
        ))}
        <Link to="/docs/sample-apps" className={styles.seeAllAppsLink}>
          See All Apps
        </Link>
      </div>
    </div>
  );
};

export default MobilePlatform;