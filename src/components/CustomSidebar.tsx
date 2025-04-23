import React, { useState, useRef, useEffect } from "react";
import { useHistory, useLocation } from "@docusaurus/router";
import {
    useActiveDocContext,
    useVersions,
} from "@docusaurus/plugin-content-docs/client";
import { IoFolderOutline, IoChevronDownOutline } from "react-icons/io5"; // Using Io5 icons
import styles from "./CustomSidebar.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";

// Define framework configurations
const frameworkConfigs = {
    React: {
        label: "React",
        value: "react",
        pluginId: "react-kit",
        logo: ({ className }) => (
            <img
                src={useBaseUrl('/imgs/logos/react.svg')} // Ensure this path is correct
                alt="React Logo"
                // Use class from CSS module for consistent sizing and margin
                className={`${styles.reactLogo} ${className || ''}`}
            />
        ),
        routeBasePath: "ui-kit/react",
    },
    // Add other frameworks here
};

// --- Style for the "LATEST" badge ---
// Keep this inline or move to CSS if preferred, but inline is fine for a specific element
const latestBadgeStyle = {
    backgroundColor: 'var(--ifm-color-emphasis-200, #e5e7eb)', // Use theme variable with fallback
    color: 'var(--ifm-color-emphasis-700, #4b5563)',     // Use theme variable with fallback
    padding: '0.15rem 0.5rem',
    fontSize: '0.7rem',
    fontWeight: '600',
    borderRadius: '0.75rem',
    marginLeft: '0.5rem',
    textTransform: 'uppercase',
    lineHeight: '1',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap', // Prevent wrapping
    flexShrink: 0, // Prevent shrinking
};
// ---

function CustomSidebar() {
    const history = useHistory();
    const location = useLocation();

    const reactKitPluginId = frameworkConfigs.React.pluginId;
    const reactKitVersions = useVersions(reactKitPluginId);
    const { activeVersion: reactKitActiveVersion } = useActiveDocContext(reactKitPluginId);

    const [frameworkDropdownOpen, setFrameworkDropdownOpen] = useState(false);
    const [selectedFramework, setSelectedFramework] = useState(frameworkConfigs.React.label);

    const [versionDropdownOpen, setVersionDropdownOpen] = useState(false);
    const [selectedVersionObject, setSelectedVersionObject] = useState(null);

    const [relevantVersions, setRelevantVersions] = useState([]);

    const frameworkDropdownRef = useRef(null);
    const versionDropdownRef = useRef(null);

    const mapVersionLabels = (versions) => {
        return versions.map(v => ({
            ...v,
            // Use the actual version label (like V5) for display primarily
            // 'displayLabel' might be more for internal logic or dropdown list clarity
            displayLabel: v.isLast ? "Latest" : v.label
        }));
    };

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

        if (currentFrameworkConfig.pluginId === reactKitPluginId && reactKitVersions.length > 0) {
            const mappedVersions = mapVersionLabels(reactKitVersions);
            versionsToShow = mappedVersions;

            if (reactKitActiveVersion) {
                versionObjectToSelect = mappedVersions.find(v => v.name === reactKitActiveVersion.name);
            }
            if (!versionObjectToSelect) {
                versionObjectToSelect = mappedVersions.find(v => v.isLast);
            }
            if (!versionObjectToSelect && mappedVersions.length > 0) {
                versionObjectToSelect = mappedVersions[0];
            }
        } else {
            versionsToShow = [];
            versionObjectToSelect = null;
        }

        setRelevantVersions(versionsToShow);
        setSelectedVersionObject(versionObjectToSelect);

    }, [
        selectedFramework,
        location.pathname,
        reactKitVersions,
        reactKitActiveVersion,
    ]);

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

    const handleVersionChange = (targetVersionObject) => {
        setSelectedVersionObject(targetVersionObject);
        setVersionDropdownOpen(false);

        const activeVersionForPathContext = reactKitActiveVersion; // Use Docusaurus context for current page

        if (!targetVersionObject) return;

        const currentPath = location.pathname;
        let docPath = "";

        if (activeVersionForPathContext && currentPath.startsWith(activeVersionForPathContext.path)) {
            docPath = currentPath.slice(activeVersionForPathContext.path.length);
            if (docPath && !docPath.startsWith('/')) {
                docPath = '/' + docPath;
            }
        } else {
            docPath = ''; // Navigate to root of target version
        }

        const newVersionBasePath = targetVersionObject.path;
        const newPath = newVersionBasePath.replace(/\/$/, '') + (docPath === '/' ? '' : docPath);

        if (newPath !== currentPath) {
            history.push(newPath);
        }
    };

    const handleFrameworkChange = (frameworkLabel) => {
        setSelectedFramework(frameworkLabel);
        setFrameworkDropdownOpen(false);
    };

    const LogoComponent = frameworkConfigs[selectedFramework]?.logo || (() => null);
    // Use the actual version label from the selected object for the button
    const versionButtonLabel = selectedVersionObject?.label ?? 'Select Version';

    return (
        <div className={styles.sidebarContainer}>
            {/* Framework selector */}
            <div className={styles.selectorWrapper} ref={frameworkDropdownRef}>
                <div
                    className={styles.dropdownButton}
                    onClick={() => setFrameworkDropdownOpen(!frameworkDropdownOpen)}
                >
                    <LogoComponent /> {/* Logo uses styles.reactLogo from CSS */}
                    {/* Label uses styles.dropdownLabel which has flex: 1 */}
                    <span className={styles.dropdownLabel}>{selectedFramework}</span>
                    {/* Arrow uses styles.dropdownArrow */}
                    <IoChevronDownOutline className={styles.dropdownArrow} />
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

            {/* Version selector group */}
            {relevantVersions.length > 0 && (
                <div className={styles.versionSelector}>
                    <div className={styles.selectorWrapper} ref={versionDropdownRef}>
                        <div
                            className={styles.dropdownButton}
                            onClick={() => setVersionDropdownOpen(!versionDropdownOpen)}
                            // Override justify-content for version selector to keep items grouped left
                            style={{ justifyContent: 'flex-start' }}
                        >
                            {/* Folder Icon: Reuse iconImage class for size if defined, add margin */}
                            <IoFolderOutline
                                className={styles.iconImage} // Make sure .iconImage has height/width
                                style={{ marginRight: '0.5rem', flexShrink: 0 }}
                            />
                            {/* Version Label: Don't let it grow, adjust margin */}
                            <span
                                className={styles.dropdownLabel}
                                style={{ flex: '0 1 auto', marginRight: '0', marginLeft: '0' }} // Prevent growth, remove default margins
                            >
                                {versionButtonLabel} {/* e.g., "V5" */}
                            </span>
                            {/* "LATEST" Badge (conditional) */}
                            {selectedVersionObject?.isLast && (
                                <span style={latestBadgeStyle}>LATEST</span>
                            )}
                            {/* Spacer takes remaining space */}
                            <span style={{ flex: '1 1 auto' }}></span>
                            {/* Arrow uses styles.dropdownArrow */}
                            <IoChevronDownOutline className={styles.dropdownArrow} />
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
                </div>
            )}
            {/* Message if no versions */}
            {relevantVersions.length === 0 && selectedFramework && (
                <div className={styles.noVersions}>No versions available for {selectedFramework}</div>
            )}
        </div>
    );
}

export default CustomSidebar;