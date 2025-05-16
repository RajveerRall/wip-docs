import React, { useState, useRef, useEffect } from "react";
import { useHistory, useLocation } from "@docusaurus/router";
import {
    useActiveDocContext,
    useVersions,
} from "@docusaurus/plugin-content-docs/client";
import { IoChevronDownOutline } from "react-icons/io5";
// FaRegFolder will be removed from the version button's visual display
// import { FaRegFolder } from "react-icons/fa";
import styles from "./CustomSidebar.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";

// Define framework configurations (keep as is from your original)
const frameworkConfigs = {
    React: {
        label: "React", // Original label
        displayText: "React UI Kits", // New: For the static display
        value: "react",
        pluginId: "react-kit",
        logo: ({ className }) => (
            <img
                src={useBaseUrl('/imgs/logos/react.svg')}
                alt="React Logo"
                className={`${styles.reactLogo} ${className || ''}`}
            />
        ),
        routeBasePath: "ui-kit/react",
    },
    // Add other frameworks here (they will still exist in logic but not be selectable in UI)
};

function CustomSidebar() {
    const history = useHistory();
    const location = useLocation();

    const reactKitPluginId = frameworkConfigs.React.pluginId;
    const reactKitVersions = useVersions(reactKitPluginId);
    const { activeVersion: reactKitActiveVersion } = useActiveDocContext(reactKitPluginId);

    const [frameworkDropdownOpen, setFrameworkDropdownOpen] = useState(false);
    // SelectedFramework will default to React and won't be changed by UI in this new design
    const [selectedFramework, setSelectedFramework] = useState(frameworkConfigs.React.label);

    const [versionDropdownOpen, setVersionDropdownOpen] = useState(false);
    const [selectedVersionObject, setSelectedVersionObject] = useState(null);

    const [relevantVersions, setRelevantVersions] = useState([]);

    const frameworkDropdownRef = useRef(null); // Stays, though not used for UI interaction
    const versionDropdownRef = useRef(null);

    // Inside CustomSidebar function

const mapVersionLabels = (versions) => {
    return versions
        .map(v => {
            // Try to extract "V" + major number from v.label or v.name
            // We can check v.label first, then v.name as a fallback if label is "Next"
            let labelToParse = v.label;

            // If the label is literally "Next" (case-insensitive),
            // and the version object has a 'name' property that might contain the actual version string
            // (like 'docusaurus-plugin-content-docs-v1'), try to parse 'name'.
            // Docusaurus version objects often have a 'name' like 'current' or '1.0.0'.
            // If 'name' is 'current', it's often the 'next' version.
            if (labelToParse.toLowerCase() === 'next' && v.name && v.name.toLowerCase() !== 'current') {
                // If v.name is something like "1.0.0" or "v2", use that.
                // This is a heuristic; Docusaurus 'name' for docs plugin versions might be the version number.
                labelToParse = v.name;
            }

            const majorVersionMatch = labelToParse.match(/^[vV]?(\d+)/);
            let simplifiedLabel = null; // Initialize as null

            if (majorVersionMatch && majorVersionMatch[1]) {
                simplifiedLabel = `V${majorVersionMatch[1]}`;
            } else if (v.isLast && labelToParse.toLowerCase() === 'next') {
                // If it's the "Next" version and we couldn't parse a V<number> from its label or name,
                // we need to decide what to do. For now, let's try to find the *previous* numbered version
                // and infer the "next" number. This is more complex and might not be reliable.
                // A simpler approach for now: if it's "Next" and no V<num> found, maybe we skip it,
                // or assign a placeholder if absolutely needed.
                // For your stated goal of ONLY V1, V2, V4, we should probably filter it out later
                // if it doesn't conform. For now, let's mark it so we can filter.
                //
                // Let's reconsider: if it's `isLast` and called "Next", and you only want V1, V2, etc.,
                // it means this "Next" version doesn't fit your desired display.
                // So, we effectively don't want to display it *as a selectable option* if it can't be V<num>.
                // The `filter` step below will handle this. For now, if it can't be parsed, `simplifiedLabel` remains null.
            }


            if (simplifiedLabel) {
                return {
                    ...v,
                    label: simplifiedLabel, // For the button
                    displayLabel: v.isLast ? `${simplifiedLabel} (Latest)` : simplifiedLabel, // For dropdown
                    // Add a flag to indicate it's a valid V<number> format for filtering
                    isValidFormat: true,
                };
            } else {
                // If no V<number> could be extracted, mark it as invalid for your desired format
                return {
                    ...v,
                    label: v.label, // Keep original label for debugging or if filtering is removed
                    displayLabel: v.label,
                    isValidFormat: false,
                };
            }
        })
        .filter(v => v.isValidFormat); // Keep only versions that conform to V<number>
};

// ... rest of your CustomSidebar component ...
     useEffect(() => {
        let versionsToShow = [];
        let versionObjectToSelect = null;
        const currentFrameworkConfig = Object.values(frameworkConfigs).find(
            (fw) => fw.label === selectedFramework // This logic remains
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
        if (!targetVersionObject || targetVersionObject.name === selectedVersionObject?.name) {
             setVersionDropdownOpen(false);
             return;
        }
        setSelectedVersionObject(targetVersionObject);
        setVersionDropdownOpen(false);

        const currentFrameworkConfig = Object.values(frameworkConfigs).find(fw => fw.label === selectedFramework);
        if (!currentFrameworkConfig || currentFrameworkConfig.pluginId !== reactKitPluginId) {
            console.warn("Version change logic currently only supports React Kit plugin ID");
             history.push(targetVersionObject.path);
            return;
        }
        const activeVersionForPathContext = reactKitActiveVersion;
        const currentPath = location.pathname;
        let relativeDocPath = "";
        if (activeVersionForPathContext && currentPath.startsWith(activeVersionForPathContext.path)) {
            relativeDocPath = currentPath.substring(activeVersionForPathContext.path.length);
             if (relativeDocPath && !relativeDocPath.startsWith('/')) {
                 relativeDocPath = '/' + relativeDocPath;
             } else if (relativeDocPath === '/') {
                 relativeDocPath = '';
             }
        } else {
            relativeDocPath = '';
        }
        const newVersionBasePath = targetVersionObject.path.replace(/\/$/, '');
        const newPath = newVersionBasePath + (relativeDocPath || '/');
        if (newPath !== currentPath) {
            history.push(newPath);
        }
    };


    // Use the logo from the 'React' config, as selectedFramework will be 'React'
    const LogoComponent = frameworkConfigs[selectedFramework]?.logo || (() => null);
    // For the button display, use the actual version label (e.g., "V5")
    const versionButtonText = selectedVersionObject?.label ?? 'Version';


    return (
        <div className={styles.sidebarContainer}>
            {/* New header row for static text and version selector */}
            <div className={styles.sidebarHeaderRow}>
                <div className={styles.staticFrameworkDisplay}>
                    <LogoComponent />
                    <span className={`${styles.frameworkDisplayText} text-title-3 font-semibold`}>
                        {frameworkConfigs.React.displayText} {/* "React UI Kits" */}
                    </span>
                </div>

                {/* Version selector - modified for new layout */}
                {relevantVersions.length > 0 && (
                    <div className={styles.versionSelectorCompactWrapper} ref={versionDropdownRef}>
                        <div
                            className={styles.compactVersionButton} // New class for compact button
                            onClick={() => setVersionDropdownOpen(!versionDropdownOpen)}
                        >
                            <span className={`${styles.compactVersionLabel} text-body-2 font-regular`}>
                                {versionButtonText} {/* e.g., "V5" */}
                            </span>
                            <IoChevronDownOutline className={styles.compactVersionArrow} />
                        </div>

                        {versionDropdownOpen && (
                            <div className={styles.compactVersionDropdownMenu}> {/* Use specific class for styling if needed */}
                                {relevantVersions.map((version) => (
                                    <div
                                        key={version.name}
                                        className={`${styles.dropdownItem} ${selectedVersionObject?.name === version.name ? styles.active : ''}`}
                                        onClick={() => handleVersionChange(version)}
                                    >
                                        {version.displayLabel} {/* Shows "Latest" or label */}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>


            {/* Message if no versions for the selected framework (will be React) */}
            {relevantVersions.length === 0 && selectedFramework && frameworkConfigs[selectedFramework] && (
                <div className={styles.noVersions}>No versions available for {frameworkConfigs[selectedFramework].displayText || selectedFramework}</div>
            )}

            {/* The old framework dropdown UI is removed, but the logic (handleFrameworkChange etc.) remains. */}
            {/* The old full-width version selector UI is replaced by the compact one above. */}
        </div>
    );
}

export default CustomSidebar;