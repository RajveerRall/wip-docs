// src/theme/DocSidebar/Desktop/Content.js
import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useAnnouncementBar, useScrollPosition} from '@docusaurus/theme-common/internal';
import DocSidebarItems from '@docusaurus/theme-classic/lib/theme/DocSidebarItems'; // Path might vary slightly based on Docusaurus version

// --- Import Your Custom Component for Top Selectors ---
import CustomSidebar from '@site/src/components/CustomSidebar'; // This renders your React/Version dropdowns

// --- Import styles for THIS component's layout (fullHeightSidebarWrapper, etc.) ---
import styles from './styles.module.css';

// --- Optional: Import an icon for external links ---
import { FiExternalLink } from 'react-icons/fi'; // Install if you use it: npm install react-icons

function useShowAnnouncementBar() {
  const {isActive} = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = React.useState(isActive);
  useScrollPosition(
    ({scrollY}) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive],
  );
  return isActive && showAnnouncementBar;
}

export default function DocSidebarDesktopContent({path, sidebar, className}) {
  const showAnnouncementBar = useShowAnnouncementBar();

  return (
    // This <nav> element becomes the main flex container for the three sections
    <nav
      aria-label="Docs sidebar"
      className={clsx(
        styles.fullHeightSidebarWrapper, // <<< Our key style for the 3-part layout
        // 'menu', // Docusaurus 'menu' class - usually handled by inner elements now
        showAnnouncementBar && styles.menuWithAnnouncementBar, // Keep original conditional style
        className,
      )}>

      

      {/* === 1. TOP STICKY PART (Your Dropdowns) === */}
      {/* This component is styled by src/components/CustomSidebar/CustomSidebar.module.css */}
      {/* <CustomSidebar /> */}

      {/* === 2. MIDDLE SCROLLABLE PART (Docusaurus Menu) === */}
      <div className={clsx(styles.scrollableMenuArea, 'thin-scrollbar')}> {/* Apply thin-scrollbar here for Docusaurus's styling */}
        <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
          {/* DocSidebarItems renders the actual navigation links */}
          {sidebar && <DocSidebarItems items={sidebar} activePath={path} level={1} />}
        </ul>
      </div>

      {/* === 3. BOTTOM STICKY PART (Utility Links) === */}
      <div className={styles.bottomStickyLinks}>
        {/* Replace with your actual links and icons */}
        <div onClick={()=>{
          window.location.href = "/docs/react-kit/migration-guide"
        }} className={styles.bottomLink}>
          <span>Migration Guide</span>
          <FiExternalLink />
        </div>
        <div onClick={()=>{
          window.location.href = "/docs/react-kit/migration-guide"
        }} className={styles.bottomLink}>
          <span>Change Log</span>
          <FiExternalLink />
        </div>
        <div onClick={()=>{
          window.location.href = "/docs/react-kit/migration-guide"
        }} className={styles.bottomLink} rel="noopener noreferrer">
          <span>Figma Design</span>
          <FiExternalLink />
        </div>
      </div>
    </nav>
  );
}