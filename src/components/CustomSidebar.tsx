import React, { useState, useRef, useEffect } from "react";
import { useHistory, useLocation } from "@docusaurus/router";
import {
  useActiveDocContext,
  useVersions,
} from "@docusaurus/plugin-content-docs/client";
import { IoChevronDownOutline } from "react-icons/io5";
import styles from "./CustomSidebar.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";

const frameworkConfigs = {
  React: {
    label: "React",
    displayText: "React UI Kits",
    value: "react",
    pluginId: "react-kit",
    logo: ({ className }) => (
      <img
        src={useBaseUrl("/imgs/logos/react.svg")}
        alt="React Logo"
        className={`${styles.reactLogo} ${className || ""}`}
      />
    ),
    routeBasePath: "ui-kit/react",
  },
};

function CustomSidebar() {
  const history = useHistory();
  const location = useLocation();

  const reactKitPluginId = frameworkConfigs.React.pluginId;
  const reactKitVersions = useVersions(reactKitPluginId);
  const { activeVersion: reactKitActiveVersion } =
    useActiveDocContext(reactKitPluginId);

  const [frameworkDropdownOpen, setFrameworkDropdownOpen] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState(
    frameworkConfigs.React.label
  );
  const [versionDropdownOpen, setVersionDropdownOpen] = useState(false);
  const [selectedVersionObject, setSelectedVersionObject] = useState(null);
  const [relevantVersions, setRelevantVersions] = useState([]);

  const frameworkDropdownRef = useRef(null);
  const versionDropdownRef = useRef(null);

  const mapVersionLabels = (versions) => {
    return versions.map((v) => {
      return {
        ...v,
        label: v.label,
      };
    });
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

    if (
      currentFrameworkConfig.pluginId === reactKitPluginId &&
      reactKitVersions.length > 0
    ) {
      const mappedVersions = mapVersionLabels(reactKitVersions);
      versionsToShow = mappedVersions;

      if (reactKitActiveVersion) {
        versionObjectToSelect = mappedVersions.find(
          (v) => v.name === reactKitActiveVersion.name
        );
      }
      if (!versionObjectToSelect) {
        versionObjectToSelect = mappedVersions.find((v) => v.isLast);
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
      if (
        frameworkDropdownRef.current &&
        !frameworkDropdownRef.current.contains(event.target)
      ) {
        setFrameworkDropdownOpen(false);
      }
      if (
        versionDropdownRef.current &&
        !versionDropdownRef.current.contains(event.target)
      ) {
        setVersionDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleVersionChange = (targetVersionObject) => {
    if (
      !targetVersionObject ||
      targetVersionObject.name === selectedVersionObject?.name
    ) {
      setVersionDropdownOpen(false);
      return;
    }
    setSelectedVersionObject(targetVersionObject);
    setVersionDropdownOpen(false);

    const currentFrameworkConfig = Object.values(frameworkConfigs).find(
      (fw) => fw.label === selectedFramework
    );
    if (
      !currentFrameworkConfig ||
      currentFrameworkConfig.pluginId !== reactKitPluginId
    ) {
      console.warn(
        "Version change logic currently only supports React Kit plugin ID"
      );
      history.push(targetVersionObject.path);
      return;
    }
    const activeVersionForPathContext = reactKitActiveVersion;
    const currentPath = location.pathname;
    let relativeDocPath = "";
    if (
      activeVersionForPathContext &&
      currentPath.startsWith(activeVersionForPathContext.path)
    ) {
      relativeDocPath = currentPath.substring(
        activeVersionForPathContext.path.length
      );
      if (relativeDocPath && !relativeDocPath.startsWith("/")) {
        relativeDocPath = "/" + relativeDocPath;
      } else if (relativeDocPath === "/") {
        relativeDocPath = "";
      }
    } else {
      relativeDocPath = "";
    }
    const newVersionBasePath = targetVersionObject.path.replace(/\/$/, "");
    const newPath = newVersionBasePath + (relativeDocPath || "/");
    if (newPath !== currentPath) {
      history.push(newPath);
    }
  };

  const LogoComponent =
    frameworkConfigs[selectedFramework]?.logo || (() => null);
  const versionButtonText = selectedVersionObject?.label ?? "Version";

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebarHeaderRow}>
        <div className={styles.staticFrameworkDisplay}>
          <LogoComponent />
          <span
            className={`${styles.frameworkDisplayText} text-title-3 font-semibold`}
          >
            {frameworkConfigs.React.displayText}
          </span>
        </div>

        {relevantVersions.length > 0 && (
          <div
            className={styles.versionSelectorCompactWrapper}
            ref={versionDropdownRef}
          >
            <div
              className={styles.compactVersionButton}
              onClick={() => setVersionDropdownOpen(!versionDropdownOpen)}
            >
              <span
                className={`${styles.compactVersionLabel} text-body-2 font-regular`}
              >
                {versionButtonText}
              </span>
              <IoChevronDownOutline className={styles.compactVersionArrow} />
            </div>

            {versionDropdownOpen && (
              <div className={styles.compactVersionDropdownMenu}>
                {relevantVersions.map((version) => (
                  <div
                    key={version.name}
                    className={`${styles.dropdownItem} ${
                      selectedVersionObject?.name === version.name
                        ? styles.active
                        : ""
                    }`}
                    onClick={() => handleVersionChange(version)}
                  >
                    {version.label}{" "}
                    {/* Use label directly instead of displayLabel */}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {relevantVersions.length === 0 &&
        selectedFramework &&
        frameworkConfigs[selectedFramework] && (
          <div className={styles.noVersions}>
            No versions available for{" "}
            {frameworkConfigs[selectedFramework].displayText ||
              selectedFramework}
          </div>
        )}
    </div>
  );
}

export default CustomSidebar;
