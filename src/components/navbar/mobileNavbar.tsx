import React, { useState } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useLocation } from "@docusaurus/router";
import { useColorMode } from "@docusaurus/theme-common";
import SearchBar from "@theme/SearchBar";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi"; // Corrected import path
import { IoCloseSharp } from "react-icons/io5";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import styles from "./mobileNavbar.module.css";
import MobileMenu from "./mobileMenu";
import MobileDocSidebarContent from './mobileDocSidebarContent'
// Import hooks for accessing docs data and active plugin info
import {
//   useDocsData,
  useActivePluginAndVersion,
} from '@docusaurus/plugin-content-docs/client';

interface SidebarItem {
  type: string; // e.g., 'category', 'link', 'html'
  label?: string;
  href?: string; // For links
  items?: SidebarItem[]; // For categories
  // ... potentially other properties
}

export default function MobileNavbar() {
  const { colorMode } = useColorMode();
  const location = useLocation();
  const { pathname } = location;
  const isDisplayFiMenu = pathname.split("/wip-docs/").filter(e=>e!='').length>0?true:false

  const lightLogoUrl = useBaseUrl("/imgs/lightlogo.svg");
  const darkLogoUrl = useBaseUrl("/imgs/logo.svg");
  const logoUrl = colorMode === "dark" ? darkLogoUrl : lightLogoUrl;

  const [isDisplayMobileMenu, setIsDisplayMobileMenu] = useState<boolean>(false);
  const [isDisplayDocSidebar,setIsDisplayDocSidebar] = useState<boolean>(false);

  // *** Determine the active documentation plugin instance ***
  const activePluginAndVersion = useActivePluginAndVersion();
  // const activeDocsPluginId = activePluginAndVersion?.activePlugin?.pluginId;

  // *** Access the documentation data for the active instance ***
  // Pass the active pluginId to useDocsData
  // const docsData = useDocsData(activeDocsPluginId); // Pass pluginId 
  // console.log("docsData :: ",docsData)

  // Now, access the sidebar data from the returned object.
  // The structure might vary, but it's likely within 'docsData.versions' or similar.
  // You might still need to console.log(docsData) to be sure.
  // Assuming the sidebar you want is the one associated with the active version
  // and has a key like 'default' or the sidebar ID from your sidebars.js/ts file.
  // const currentSidebar = (docsData?.versions?.find(version => version['isCurrent'])?.sidebars?.default) as SidebarItem[]; // ADJUST 'default' if your sidebar has a different ID
  const isDocsPage = !!activePluginAndVersion?.activePlugin;

  const openMenu = () => setIsDisplayMobileMenu(true);
  const closeMenu = () => {
    setIsDisplayDocSidebar(false)
    setIsDisplayMobileMenu(false)};

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      action();
    }
  };

  return (
    <>
      <header className={`mobile-navbar-context navbar ${styles.navbarHeader}`}>
        <div className={styles.navbarContent}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* Show the menu trigger ONLY if an active docs plugin and a sidebar are found */}
            {/* {activeDocsPluginId && currentSidebar && ( */}
              {isDisplayFiMenu && isDocsPage && !isDisplayDocSidebar && !isDisplayMobileMenu && (
              <button
                className={styles.docsMenuTriggerButton}
                onClick={()=>setIsDisplayDocSidebar(true)}
                aria-label="Open menu"
              >
                <FiMenu style={{fontSize:'24px'}} aria-hidden="true" />{" "}
              </button>
             )} 

            <div className={styles.logoContainer}>
              <Link to="/" onClick={closeMenu}>
                {" "}
                <img
                  src={logoUrl}
                  alt="CometChat Docs"
                  className={`${
                    colorMode == "dark" ? styles.darkLogo : styles.lightLogo
                  }`}
                />
              </Link>
            </div>
          </div>

          {!isDisplayMobileMenu && !isDisplayDocSidebar && (
            <div className={styles.rightActions}>
              <SearchBar />
              <div
                className={styles.optionsButtonWrapper}
                aria-label="Open options menu"
                onClick={openMenu}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, openMenu)}
              >
                <FaEllipsisVertical
                  className={styles.optionsIcon}
                  aria-hidden="true"
                />
              </div>
            </div>
          )}

          {(isDisplayMobileMenu || isDisplayDocSidebar) && (
            <IoCloseSharp
              size={24}
              aria-hidden="true"
              className={styles.closeIcon}
              onClick={closeMenu}
            />
          )}
        </div>
      </header>

      {isDisplayMobileMenu && (
          <Drawer
          open={isDisplayMobileMenu}
          onClose={()=>setIsDisplayMobileMenu(false)}
          lockBackgroundScroll={isDisplayMobileMenu}
          direction='left'
          size={'100vw'}
        >
            {/* Pass the found sidebar data to the MobileMenu component */}
          <MobileMenu />
          </Drawer>
      )}

{isDisplayDocSidebar&& (
          <Drawer
          open={isDisplayDocSidebar}
          onClose={()=>setIsDisplayDocSidebar(false)}
          lockBackgroundScroll={isDisplayDocSidebar}
          direction='right'
          size={'100vw'}
        >
          <MobileDocSidebarContent
            onClose={()=>setIsDisplayDocSidebar(false)}
          />
          
          </Drawer>
      )}
    </>
  );
}
