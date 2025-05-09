import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import FrameworkGrid from "./frameworkGrid"; // Assuming these use their own styling or will be refactored
import useBaseUrl from "@docusaurus/useBaseUrl";
import WidgetsGrid from "./widgets"; // Assuming these use their own styling or will be refactored
import ApiCardsRow from "./apiCardRow"; // Assuming these use their own styling or will be refactored
import SampleAppsSection from "./sampleApps"; // Assuming these use their own styling or will be refactored
import AdditionalResources from "./additionalResource"; // Assuming these use their own styling or will be refactored
import "../css/custom.css";
import { useWindowSize } from "@docusaurus/theme-common/internal";
// Import the CSS Module
import styles from "./index.module.css"; // Make sure the path is correct

export default function Homepage() {
  const windowSize = useWindowSize();
  const isMobile = windowSize === "mobile";
  // Data remains the same
  const data = {
    title: "Get Started",
    content:
      " Seamlessly integrate real-time chat, voice, and video functionalities. Build your chat app with CometChat by picking the implementation method that aligns best with your goals.",
  };
  const getIconPath = (iconName) => useBaseUrl(`/imgs/logos/${iconName}`);

  // uiKits, sdks, widgets data remains the same
  const uiKits = [
    {
      id: "react",
      title: "React",
      version: "3",
      icon: getIconPath("react.svg"),
      link: useBaseUrl("ui-kit/react/overview"),
    },
    {
      id: "react-native",
      title: "React Native",
      version: "4",
      icon: getIconPath("react.svg"),
      link: useBaseUrl("/"),
    },
    {
      id: "angular",
      title: "Angular",
      version: "5",
      icon: getIconPath("angular.svg"),
      link: useBaseUrl("/"),
    },
    {
      id: "ios-swift",
      title: "iOS Swift",
      version: "3",
      icon: getIconPath("swift.svg"),
      link: useBaseUrl("/"),
    },
    {
      id: "android-kotlin",
      title: "Android Kotlin",
      version: "4",
      icon: getIconPath("kotlin.svg"),
      link: useBaseUrl("/"),
    },
    {
      id: "android-java",
      title: "Android Java",
      version: "3",
      icon: getIconPath("android.svg"),
      link: useBaseUrl("/"),
    },
    {
      id: "vue",
      title: "Vue",
      version: "2",
      icon: getIconPath("vue.svg"),
      link: useBaseUrl("/"),
    },
  ];

  const sdks = [
    {
      id: "react-sdk",
      title: "React",
      version: "5",
      icon: getIconPath("react.svg"),
      link: useBaseUrl("/"),
    },
    {
      id: "react-native-sdk",
      title: "React Native",
      version: "4",
      icon: getIconPath("react.svg"),
      link: useBaseUrl("/"),
    },
    {
      id: "android-sdk",
      title: "Android",
      version: "5",
      icon: getIconPath("android.svg"),
      link: useBaseUrl("/"),
    },
    {
      id: "ios-swift-sdk",
      title: "iOS Swift",
      version: "3",
      icon: getIconPath("swift.svg"),
      link: useBaseUrl("/"),
    },
  ];

  const widgets = [
    {
      id: "wordpress",
      title: "Wordpress / BuddyPress",
      icon: getIconPath("wp.svg"),
      link: "/",
    },
    {
      id: "html",
      title: "HTML / Bootstrap / jQuery",
      icon: getIconPath("html.svg"),
      link: "/",
    },
  ];

  return (
    <Layout
    // title={data.title} // Keep if you want dynamic title
    // description={data.content} // Keep if you want dynamic description
    >
      {/* Use CSS Module class for the main content area */}
      {/* Note: Docusaurus Layout might already provide container behavior */}
      <main className={styles.pageContainer}>
        {/* Breadcrumbs with CSS Module classes */}
        <div className={styles.breadcrumbs}>
          <div onClick={()=>window.location.href='/'} className={`${styles.breadcrumbLink} text-caption-1 font-medium`}>
            Home
          </div>
          <MdOutlineKeyboardArrowRight
            className={styles.breadcrumbSeparator}
            aria-hidden="true"
          />
          <span className={`${styles.breadcrumbCurrent} text-caption-1 font-medium`}>Docs</span>
        </div>

        {/* Hero Section with CSS Module classes */}
        <div>
          <p className={`${styles.heroTitle} ${isMobile?'text-h2':'text-title-32'} font-semibold`}>{data.title}</p>
          <p className={`${styles.heroDescription}  ${isMobile?'text-caption-1':'text-body-1'} font-regular`}>{data.content}</p>
        </div>

        {/* Render Child Components */}
        {/* Assuming FrameworkGrid, WidgetsGrid, etc., handle their own styling */}
        {/* If they also used Tailwind, they need similar refactoring */}
        <FrameworkGrid
          title="UI Kits"
          description="Quickly implement chat functionality with UI Kits that include built-in business logic and a customizable user interface."
          frameworks={uiKits}
        />
        <FrameworkGrid
          title="SDKs"
          description="Use Our SDKs to tap into the full potential while building your own user interface."
          frameworks={sdks}
        />
        <WidgetsGrid
          title="Widgets"
          description="Integrate chat into any simple HTML, Bootstrap, or jQuery site effortlessly with our copy-and-paste code."
          widgets={widgets}
        />

        {/* Use spacer class for consistent vertical margin */}
        <div className={styles.sectionSpacer}>
          <ApiCardsRow />
        </div>
        <div className={styles.sectionSpacer}>
          <SampleAppsSection />
        </div>
        <div className={styles.sectionSpacer}>
          <AdditionalResources />
        </div>
      </main>
    </Layout>
  );
}
