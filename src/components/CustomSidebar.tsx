import React, { useState, useRef, useEffect } from "react";
import { useHistory, useLocation } from "@docusaurus/router";
import {
    useActiveDocContext,
    useVersions,
} from "@docusaurus/plugin-content-docs/client";
import { IoChevronDownOutline } from "react-icons/io5";
import { FaRegFolder } from "react-icons/fa";
import styles from "./CustomSidebar.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";

// Define framework configurations (keep as is)
const frameworkConfigs = {
    React: {
        label: "React",
        value: "react",
        pluginId: "react-kit",
        logo: ({ className }) => (
            <img
                src={useBaseUrl('/imgs/logos/react.svg')}
                alt="React Logo"
                className={`${styles.reactLogo} ${className || ''}`}
            />
        ),
        routeBasePath: "ui-kit/react", // Ensure this matches your config
    },
    // Add other frameworks here
};

function CustomSidebar() {
    const history = useHistory();
    const location = useLocation();

    // Hooks remain the same...
    const reactKitPluginId = frameworkConfigs.React.pluginId;
    const reactKitVersions = useVersions(reactKitPluginId);
    const { activeVersion: reactKitActiveVersion } = useActiveDocContext(reactKitPluginId);

    const [frameworkDropdownOpen, setFrameworkDropdownOpen] = useState(false);
    const [selectedFramework, setSelectedFramework] = useState(frameworkConfigs.React.label); // Default to React

    const [versionDropdownOpen, setVersionDropdownOpen] = useState(false);
    const [selectedVersionObject, setSelectedVersionObject] = useState(null);

    const [relevantVersions, setRelevantVersions] = useState([]);

    const frameworkDropdownRef = useRef(null);
    const versionDropdownRef = useRef(null);

    // mapVersionLabels remains the same...
     const mapVersionLabels = (versions) => {
        return versions.map(v => ({
            ...v,
            displayLabel: v.isLast ? "Latest" : v.label // Use 'Latest' for display in dropdown
        }));
    };

    // useEffect for versions remains the same...
     useEffect(() => {
        let versionsToShow = [];
        let versionObjectToSelect = null;
        const currentFrameworkConfig = Object.values(frameworkConfigs).find(
            (fw) => fw.label === selectedFramework
        );

        if (!currentFrameworkConfig) {
            setRelevantVersions([]);
            setSelectedVersionObject(null);
            return;
        }

        // Logic to determine relevant versions based on selectedFramework
        // This example assumes only React has versions for now
        if (currentFrameworkConfig.pluginId === reactKitPluginId && reactKitVersions.length > 0) {
            const mappedVersions = mapVersionLabels(reactKitVersions);
            versionsToShow = mappedVersions;

            // Try to find the active version first
            if (reactKitActiveVersion) {
                versionObjectToSelect = mappedVersions.find(v => v.name === reactKitActiveVersion.name);
            }
            // If no active version match (e.g., on framework root), select the latest
            if (!versionObjectToSelect) {
                versionObjectToSelect = mappedVersions.find(v => v.isLast);
            }
             // Fallback to the first version if none else found
            if (!versionObjectToSelect && mappedVersions.length > 0) {
                 versionObjectToSelect = mappedVersions[0];
            }

        } else {
            versionsToShow = []; // No versions for this framework
            versionObjectToSelect = null;
        }

        setRelevantVersions(versionsToShow);
        setSelectedVersionObject(versionObjectToSelect);

    }, [
        selectedFramework,
        location.pathname, // Re-evaluate if path changes
        reactKitVersions,
        reactKitActiveVersion, // Re-evaluate if active version changes
    ]);


    // useEffect for click outside remains the same...
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
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    // handleVersionChange remains mostly the same...
    const handleVersionChange = (targetVersionObject) => {
        if (!targetVersionObject || targetVersionObject.name === selectedVersionObject?.name) {
             setVersionDropdownOpen(false);
             return; // No change needed
        }

        setSelectedVersionObject(targetVersionObject);
        setVersionDropdownOpen(false);

        // Determine the base path of the *currently viewed* page's version context
        // This relies on the pluginId matching the selected framework
        const currentFrameworkConfig = Object.values(frameworkConfigs).find(fw => fw.label === selectedFramework);
        if (!currentFrameworkConfig || currentFrameworkConfig.pluginId !== reactKitPluginId) {
            console.warn("Version change logic currently only supports React Kit plugin ID");
             // Potentially navigate to the root of the target version for the selected framework if defined
             history.push(targetVersionObject.path);
            return;
        }

        const activeVersionForPathContext = reactKitActiveVersion; // Use Docusaurus context

        const currentPath = location.pathname;
        let relativeDocPath = ""; // Path relative to the version base

        // Check if the current path starts with the active version's path
        if (activeVersionForPathContext && currentPath.startsWith(activeVersionForPathContext.path)) {
            relativeDocPath = currentPath.substring(activeVersionForPathContext.path.length);
            // Ensure it starts with / or is empty
             if (relativeDocPath && !relativeDocPath.startsWith('/')) {
                 relativeDocPath = '/' + relativeDocPath;
             } else if (relativeDocPath === '/') {
                 relativeDocPath = ''; // Don't keep trailing slash if it's the root
             }
        } else {
            // If not in a versioned path (e.g., root, or different plugin),
            // default to navigating to the root of the target version.
            relativeDocPath = '';
        }

        const newVersionBasePath = targetVersionObject.path.replace(/\/$/, ''); // Remove trailing slash
        const newPath = newVersionBasePath + (relativeDocPath || '/'); // Add '/' if navigating to root

        // Avoid redundant navigation
        if (newPath !== currentPath) {
            history.push(newPath);
        }
    };

    // handleFrameworkChange remains the same...
    const handleFrameworkChange = (frameworkLabel) => {
        if(frameworkLabel === selectedFramework) {
             setFrameworkDropdownOpen(false);
             return; // No change
        }
        setSelectedFramework(frameworkLabel);
        setFrameworkDropdownOpen(false);

        // --- Navigation Logic on Framework Change ---
        // Decide where to navigate: root of framework, or try to preserve doc path?
        // Option 1: Navigate to the framework's root path (simplest)
        const targetFrameworkConfig = frameworkConfigs[frameworkLabel];
        if (targetFrameworkConfig?.routeBasePath) {
             history.push(useBaseUrl(`/${targetFrameworkConfig.routeBasePath}`));
        } else {
             console.warn(`No routeBasePath defined for framework: ${frameworkLabel}`);
             // history.push('/'); // Fallback to site root maybe?
        }
        // Option 2 (More Complex): Try to find equivalent doc in new framework/version
        // This is significantly harder and depends on identical doc IDs/paths across frameworks.
        // For now, Option 1 is recommended.
    };

    const LogoComponent = frameworkConfigs[selectedFramework]?.logo || (() => null);
    const versionButtonLabel = selectedVersionObject?.label ?? 'Select Version'; // Use the actual label (e.g., 'V5')

    return (
        <div className={styles.sidebarContainer}>
            {/* Framework selector */}
            <div className={styles.selectorWrapper} ref={frameworkDropdownRef}>
                <div
                    className={styles.dropdownButton}
                    onClick={() => setFrameworkDropdownOpen(!frameworkDropdownOpen)}
                    style={{ justifyContent: 'space-between', }} // Ensure space between logo/label and arrow
                >
                    <LogoComponent /> {/* Logo */}
                    <span className={`${styles.dropdownLabel} ${styles.dropdownLabelReact} text-caption-1 font-regular`}> {/* Label */}
                        {selectedFramework}
                    </span>
                    <IoChevronDownOutline className={styles.dropdownArrow} /> {/* Arrow */}
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

            {/* Version selector group - Only show if relevant versions exist */}
            {relevantVersions.length > 0 && (
                <div className={styles.selectorWrapper} ref={versionDropdownRef}>
                    <div
                        className={styles.dropdownButton}
                        onClick={() => setVersionDropdownOpen(!versionDropdownOpen)}
                        style={{ justifyContent: 'flex-start' }} // Align items left
                    >
                        <FaRegFolder className={styles.folderIcon} /> {/* Folder Icon */}
                        <span className={`${styles.dropdownLabel} ${styles.dropdownLabelVersion} text-caption-1 font-regular`}> {/* Version Label */}
                            {versionButtonLabel} {/* e.g., "V5" */}
                        </span>
                        {/* "LATEST" Badge (conditional) */}
                        {selectedVersionObject?.isLast && (
                            <span className={`${styles.latestBadge} text-footnote font-regular`}>LATEST</span>
                        )}
                        {/* Arrow pushed to the right */}
                        <IoChevronDownOutline
                            className={`${styles.dropdownArrow} ${styles.dropdownArrowVersion}`}
                            style={{ marginLeft: 'auto' }} // Push arrow right
                        />
                    </div>

                    {versionDropdownOpen && (
                        <div className={styles.dropdownMenu}>
                            {relevantVersions.map((version) => (
                                <div
                                    key={version.name}
                                    className={`${styles.dropdownItem} ${selectedVersionObject?.name === version.name ? styles.active : ''}`}
                                    onClick={() => handleVersionChange(version)}
                                >
                                    {/* Show "Latest" or the actual label in dropdown */}
                                    {version.displayLabel}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Message if no versions for the selected framework */}
            {relevantVersions.length === 0 && selectedFramework && frameworkConfigs[selectedFramework] /* Ensure config exists */ && (
                <div className={styles.noVersions}>No versions available for {selectedFramework}</div>
            )}
        </div>
    );
}

export default CustomSidebar;