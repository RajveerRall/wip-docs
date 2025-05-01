import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useAnnouncementBar, useScrollPosition} from '@docusaurus/theme-common/internal';
import DocSidebarItems from '@docusaurus/theme-classic/lib/theme/DocSidebarItems'; // Corrected import path might vary slightly
import styles from './styles.module.css';

// --- Import Your Custom Component ---
import CustomSidebar from '@site/src/components/CustomSidebar'; // Adjust path if needed

function useShowAnnouncementBar() {
  // ... (Keep original hook code)
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
    <nav
      aria-label="Docs sidebar" // Keep accessibility attribute
      className={clsx(
        'menu thin-scrollbar', // Keep base classes
        styles.menu, // Keep component-specific styles
        showAnnouncementBar && styles.menuWithAnnouncementBar, // Keep conditional style
        className, // Allow passing custom classes
      )}>

      {/* --- Render Your Custom Selectors FIRST --- */}
      {/* --- End of Custom Component --- */}


      {/* --- Render the Standard Docusaurus Menu --- */}
      {/* Use ul directly or DocSidebarItems based on original swizzled code */}
      {/* This assumes the original used DocSidebarItems */}
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
        <DocSidebarItems items={sidebar} activePath={path} level={1} />
      </ul>
      {/* --- End of Standard Menu --- */}

    </nav>
  );
}

// If the original swizzled component had different structure, adapt accordingly.
// The key is to render <CustomSidebar /> before the <ul className="menu__list">
// or the component that renders it (like DocSidebarItems).