import React, { useState, useRef, useEffect } from "react";
import { useHistory, useLocation } from "@docusaurus/router";
import {
  useActiveDocContext,
  useVersions,
} from "@docusaurus/plugin-content-docs/client";
import styles from "./CustomSidebar.module.css";

// Define framework configurations including their plugin IDs and base paths
const frameworkConfigs = {
  React: {
    label: "React",
    value: "react",
    pluginId: "react-kit", // <<< Match the ID in docusaurus.config.ts
    logo: () => ( /* ReactLogo SVG Component */
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={styles.reactLogo}>
        <path d="M12 9.861a2.139 2.139 0 100 4.278 2.139 2.139 0 100-4.278zm-5.992 6.394l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 001.363 3.578l.101.213-.101.213a23.307 23.307 0 00-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 011.182-3.046A24.752 24.752 0 015.317 8.95zm12.675 7.305l-.133-.469a23.357 23.357 0 00-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 001.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.14s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.259c.48 1.039.877 2.06 1.182 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046a24.788 24.788 0 01-1.182 3.046z" fill="currentColor"/>
      </svg>
    ),
    // Store the Docusaurus routeBasePath, NOT the full URL prefix
    routeBasePath: "ui-kit/react", // <<< Match routeBasePath from config
  },
  // Add other frameworks here if they get their own docs instances
};

function CustomSidebar() {
  const history = useHistory();
  const location = useLocation();
  // No need for explicit baseUrl here, paths from hooks/location include it

  // --- Fetch data for React Kit instance ---
  const reactKitPluginId = frameworkConfigs.React.pluginId;
  const reactKitVersions = useVersions(reactKitPluginId);
  const { activeVersion: reactKitActiveVersion } = useActiveDocContext(reactKitPluginId);
  // Note: activeVersion might be null if the current page isn't part of this instance

  // --- State ---
  const [frameworkDropdownOpen, setFrameworkDropdownOpen] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState(frameworkConfigs.React.label);

  const [versionDropdownOpen, setVersionDropdownOpen] = useState(false);
  const [selectedVersionLabel, setSelectedVersionLabel] = useState(""); // Display label e.g., "Latest", "v1.0"

  // State to hold the versions/context relevant to the *selected* framework
  const [relevantVersions, setRelevantVersions] = useState([]);
  const [relevantActiveVersion, setRelevantActiveVersion] = useState(null);
  // ---

  // Refs for dropdown elements
  const frameworkDropdownRef = useRef(null);
  const versionDropdownRef = useRef(null);

  // --- Effects ---

  // Map Docusaurus version objects to include our desired display label ("Latest")
  const mapVersionLabels = (versions) => {
    return versions.map(v => ({
      ...v,
      displayLabel: v.isLast ? "Latest" : v.label // Use "Latest" for the 'current' version
    }));
  };

  // Update relevant versions and active context when framework or location changes
  useEffect(() => {
    console.log("Effect Triggered: Framework or Location Changed");
    let versionsToShow = [];
    let currentActive = null;
    let versionLabelToSelect = '';
    const currentFrameworkConfig = Object.values(frameworkConfigs).find(
      (fw) => fw.label === selectedFramework
    );

    if (!currentFrameworkConfig) {
        console.warn("No config found for selected framework:", selectedFramework);
        setRelevantVersions([]);
        setRelevantActiveVersion(null);
        setSelectedVersionLabel('');
        return;
    }

    // Select the correct data based on the chosen framework's pluginId
    if (currentFrameworkConfig.pluginId === reactKitPluginId) {
      const mappedVersions = mapVersionLabels(reactKitVersions);
      versionsToShow = mappedVersions;

      // Check if the Docusaurus hook identified an active version for the react-kit plugin
      if (reactKitActiveVersion) {
         currentActive = mappedVersions.find(v => v.name === reactKitActiveVersion.name);
         versionLabelToSelect = currentActive?.displayLabel || '';
         console.log("React Kit Active Version Found:", currentActive);
      } else {
         // No active version identified by the hook for this plugin instance.
         currentActive = null;
         versionLabelToSelect = mappedVersions.find(v => v.isLast)?.displayLabel || mappedVersions[0]?.displayLabel || '';
         console.log("No React Kit Active Version found for current path. Defaulting label.");
      }
    }
    // --- Add else if blocks here for other frameworks ---
    else {
      console.log("Framework selected:", selectedFramework, "- No version handling implemented.");
      versionsToShow = [];
      currentActive = null;
      versionLabelToSelect = '';
    }

    console.log(`[${selectedFramework}] Versions to show:`, versionsToShow);
    console.log(`[${selectedFramework}] Relevant Active Version (for path context):`, currentActive); // Might be null!
    console.log(`[${selectedFramework}] Version Label to Select:`, versionLabelToSelect);

    setRelevantVersions(versionsToShow);
    setRelevantActiveVersion(currentActive);
    setSelectedVersionLabel(versionLabelToSelect);

  }, [
    selectedFramework,
    location.pathname,
    reactKitVersions,
    reactKitActiveVersion,
    // Add other framework data dependencies if needed
  ]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (frameworkDropdownRef.current && !frameworkDropdownRef.current.contains(event.target)) {
        setFrameworkDropdownOpen(false);
      }
      if (versionDropdownRef.current && !versionDropdownRef.current.contains(event.target)) {
        setVersionDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // --- Handlers ---

  // Handle version change
  const handleVersionChange = (targetVersionObject) => {
    setSelectedVersionLabel(targetVersionObject.displayLabel);
    setVersionDropdownOpen(false);

    const activeVersionForContext = relevantActiveVersion; // From state

    if (!targetVersionObject) {
      console.error("Target version object is missing");
      return;
    }

    const currentPath = location.pathname; // Already includes baseUrl
    console.log("--- handleVersionChange ---");
    console.log("Current path:", currentPath);
    console.log("Target version object:", targetVersionObject); // targetVersionObject.path includes baseUrl
    console.log("Active version for context:", activeVersionForContext); // activeVersionForContext?.path includes baseUrl

    let docPath = ""; // The path part *after* the version's base path

    // Calculate docPath based on the active version *relevant to the current page/framework context*
    if (activeVersionForContext && currentPath.startsWith(activeVersionForContext.path)) {
        // We are on a page within the currently active version's path.
        docPath = currentPath.slice(activeVersionForContext.path.length);
        // Ensure it starts with '/' if it's not empty
        if (docPath && !docPath.startsWith('/')) {
            docPath = '/' + docPath;
        }
        console.log(`Doc path derived from activeVersion path ('${activeVersionForContext.path}'):`, docPath);
    } else {
        // Cannot determine relative path reliably. Navigate to the root of the target version.
        docPath = '';
        console.warn("Cannot determine relative doc path from current location/active context; navigating to target version's root.");
    }

    // Construct the new URL: target version's base path + docPath
    let newVersionBasePath = targetVersionObject.path; // e.g., /wip-docs/ui-kit/react or /wip-docs/ui-kit/react/1.0

    // --- Sanitize Path Construction ---
    if (newVersionBasePath.endsWith('/') && docPath.startsWith('/')) {
        newVersionBasePath = newVersionBasePath.slice(0, -1);
    } else if (newVersionBasePath === '/' && docPath.startsWith('/')) {
         newVersionBasePath = ''; // Avoid '//'
    } else if (!newVersionBasePath.endsWith('/') && docPath && !docPath.startsWith('/')) {
         // docPath should already start with '/' if derived above, but double-check isn't harmful
         // It might not start with '/' if docPath was initially determined as empty.
         // However, appending '' is fine. Let's refine: Add '/' only if base doesn't end with it AND docPath is non-empty and doesn't start with it.
         // This case is less likely with the current logic.
    } else if (newVersionBasePath === '/' && docPath && !docPath.startsWith('/')) {
        // If base path is '/' and docPath is like 'overview', ensure it becomes '/overview'
         docPath = '/' + docPath;
    }
    // --- End Sanitize ---

    const newPath = newVersionBasePath + docPath;

    console.log("Calculated relative document path:", docPath);
    console.log("Calculated new full path:", newPath);
    console.log("-----------------------------");

    if (newPath !== currentPath) {
        history.push(newPath);
    } else {
        console.log("Already on the target path.");
    }
  };


  // Handle framework change
  const handleFrameworkChange = (frameworkLabel) => {
    setSelectedFramework(frameworkLabel);
    setFrameworkDropdownOpen(false);
    // The useEffect hook will automatically update the version list & selected version label
  };

  // Get the current framework's logo
  const CurrentLogo = frameworkConfigs[selectedFramework]?.logo || (() => null);

  return (
    <div className={styles.sidebarContainer}>
      {/* Framework selector */}
      <div className={styles.selectorWrapper} ref={frameworkDropdownRef}>
        <div
          className={styles.dropdownButton}
          onClick={() => setFrameworkDropdownOpen(!frameworkDropdownOpen)}
        >
          <CurrentLogo />
          <span className={styles.dropdownLabel}>{selectedFramework}</span>
          <svg /* Dropdown Arrow SVG */
            xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.dropdownArrow}>
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        {frameworkDropdownOpen && (
          <div className={styles.dropdownMenu}>
            {Object.values(frameworkConfigs).map((framework) => (
              <div
                key={framework.value}
                className={`${styles.dropdownItem} ${selectedFramework === framework.label ? styles.active : ''}`}
                onClick={() => handleFrameworkChange(framework.label)}
              >
                 {framework.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Version selector group - Only show if the selected framework HAS versions */}
      {relevantVersions.length > 0 && (
        <div className={styles.versionSelector}>
          <div className={styles.selectorWrapper} ref={versionDropdownRef}>
            <div
              className={styles.dropdownButton}
              onClick={() => setVersionDropdownOpen(!versionDropdownOpen)}
            >
              <input type="checkbox" className={styles.versionCheckbox} readOnly checked onClick={(e) => e.stopPropagation()} />
              {/* Display the computed selectedVersionLabel */}
              <span className={styles.dropdownLabel}>{selectedVersionLabel || 'Select Version'}</span>
               <svg /* Dropdown Arrow SVG */
                 xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.dropdownArrow}>
                 <polyline points="6 9 12 15 18 9"></polyline>
               </svg>
            </div>

            {versionDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {/* Use relevantVersions which includes displayLabel */}
                {relevantVersions.map((version) => (
                  <div
                    key={version.name} // Use unique name
                    className={`${styles.dropdownItem} ${selectedVersionLabel === version.displayLabel ? styles.active : ''}`}
                    // Pass the full version object (with displayLabel) to the handler
                    onClick={() => handleVersionChange(version)}
                  >
                    {version.displayLabel} {/* Display "Latest", "v1.0", etc. */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
       {/* Add placeholder or message if no versions */}
       {relevantVersions.length === 0 && selectedFramework && (
           <div className={styles.noVersions}>No versions available for {selectedFramework}</div>
       )}
    </div>
  );
}

export default CustomSidebar;