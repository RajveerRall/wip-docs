// // // // // // src/components/VersionDropdown.js
// // // // // import React, { useEffect, useState } from "react";
// // // // // import versions from "../../versions.json";
// // // // // import { useLocation } from "@docusaurus/router";
// // // // // import Link from "@docusaurus/Link";
// // // // // import styles from "./VersionDropdown.module.css";

// // // // // export default function VersionDropdown() {
// // // // //   const [currentVersion, setCurrentVersion] = useState("");
// // // // //   const location = useLocation();

// // // // //   // Function to get the correct route for a given version
// // // // //   function getVersionRoute(version) {
// // // // //     const currentPath = location.pathname;
// // // // //     const pathParts = currentPath.split("/");
    
// // // // //     // Check if we're already viewing a versioned route
// // // // //     const isViewingVersioned = pathParts[1] === "docs" && 
// // // // //                                (pathParts[2] === "1.0.0" || pathParts[2] === "2.0.0");
    
// // // // //     // If switching to the latest version (2.0.0)
// // // // //     if (version === "2.0.0") {
// // // // //       if (isViewingVersioned) {
// // // // //         // Remove version from path if it's the latest
// // // // //         return "/docs/" + pathParts.slice(3).join("/");
// // // // //       }
// // // // //       return currentPath; // Already viewing the latest version
// // // // //     } else {
// // // // //       // If viewing the latest version, insert the version after /docs/
// // // // //       if (!isViewingVersioned) {
// // // // //         return `/docs/${version}/${pathParts.slice(2).join("/")}`;
// // // // //       } else {
// // // // //         // Replace current version with the new version
// // // // //         pathParts[2] = version;
// // // // //         return pathParts.join("/");
// // // // //       }
// // // // //     }
// // // // //   }

// // // // //   useEffect(() => {
// // // // //     // Determine which version we're currently viewing
// // // // //     const path = location.pathname;
// // // // //     const pathParts = path.split('/');
    
// // // // //     if (pathParts[1] === "docs") {
// // // // //       if (pathParts[2] === "1.0.0") {
// // // // //         setCurrentVersion("1.0.0");
// // // // //       } else {
// // // // //         // If not explicitly in a version path, we're in the latest version
// // // // //         setCurrentVersion("2.0.0");
// // // // //       }
// // // // //     }
// // // // //   }, [location.pathname]);

// // // // //   // Only render the dropdown if we're in a docs page
// // // // //   if (!location.pathname.startsWith("/docs")) {
// // // // //     return null;
// // // // //   }

// // // // //   return (
// // // // //     <div className={styles.versionDropdown}>
// // // // //       <div className={styles.versionLabel}>Version</div>
// // // // //       <div className="dropdown dropdown--hoverable">
// // // // //         <button className={styles.versionButton}>
// // // // //           {currentVersion}
// // // // //           <span className={styles.versionArrow}></span>
// // // // //         </button>
// // // // //         <ul className="dropdown__menu">
// // // // //           {versions.map((version) => (
// // // // //             <li key={version}>
// // // // //               <Link
// // // // //                 className={`dropdown__link ${version === currentVersion ? 'dropdown__link--active' : ''}`}
// // // // //                 to={getVersionRoute(version)}
// // // // //               >
// // // // //                 {version}
// // // // //               </Link>
// // // // //             </li>
// // // // //           ))}
// // // // //         </ul>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // import React, { useEffect, useState } from "react";
// // // // import versions from "../../versions.json";
// // // // import { useLocation } from "@docusaurus/router";
// // // // import Link from "@docusaurus/Link";
// // // // import styles from "./VersionDropdown.module.css";

// // // // export default function VersionDropdown(): React.ReactNode | null {
// // // //   const [currentVersion, setCurrentVersion] = useState<string>("");
// // // //   const location = useLocation();

// // // //   // Function to get the correct route for a given version
// // // //   function getVersionRoute(version: string): string {
// // // //     const currentPath = location.pathname;
// // // //     const pathParts = currentPath.split("/");
    
// // // //     // Check if we're already viewing a versioned route
// // // //     const isViewingVersioned = pathParts[1] === "docs" && 
// // // //                                (pathParts[2] === "1.0.0" || pathParts[2] === "2.0.0");
    
// // // //     // If switching to the latest version (2.0.0)
// // // //     if (version === "2.0.0") {
// // // //       if (isViewingVersioned) {
// // // //         // Remove version from path if it's the latest
// // // //         return "/docs/" + pathParts.slice(3).join("/");
// // // //       }
// // // //       return currentPath; // Already viewing the latest version
// // // //     } else {
// // // //       // If viewing the latest version, insert the version after /docs/
// // // //       if (!isViewingVersioned) {
// // // //         return `/docs/${version}/${pathParts.slice(2).join("/")}`;
// // // //       } else {
// // // //         // Replace current version with the new version
// // // //         pathParts[2] = version;
// // // //         return pathParts.join("/");
// // // //       }
// // // //     }
// // // //   }

// // // //   useEffect(() => {
// // // //     // Determine which version we're currently viewing
// // // //     const path = location.pathname;
// // // //     const pathParts = path.split('/');
    
// // // //     if (pathParts[1] === "docs") {
// // // //       if (pathParts[2] === "1.0.0") {
// // // //         setCurrentVersion("1.0.0");
// // // //       } else {
// // // //         // If not explicitly in a version path, we're in the latest version
// // // //         setCurrentVersion("2.0.0");
// // // //       }
// // // //     }
// // // //   }, [location.pathname]);

// // // //   // Only render the dropdown if we're in a docs page
// // // //   if (!location.pathname.startsWith("/docs")) {
// // // //     return null;
// // // //   }

// // // //   return (
// // // //     <div className={styles.versionDropdown}>
// // // //       <div className={styles.versionLabel}>Version:</div>
// // // //       <div className="dropdown dropdown--hoverable">
// // // //         <button className={styles.versionButton}>
// // // //           {currentVersion}
// // // //           <span className={styles.versionArrow}></span>
// // // //         </button>
// // // //         <ul className="dropdown__menu">
// // // //           {versions.map((version) => (
// // // //             <li key={version}>
// // // //               <Link
// // // //                 className={`dropdown__link ${version === currentVersion ? 'dropdown__link--active' : ''}`}
// // // //                 to={getVersionRoute(version)}
// // // //               >
// // // //                 {version}
// // // //               </Link>
// // // //             </li>
// // // //           ))}
// // // //         </ul>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // CustomSidebar.js
// // // import React from 'react';
// // // import { useHistory, useLocation } from '@docusaurus/router';
// // // import { useActiveDocContext, useVersions } from '@docusaurus/plugin-content-docs/client';
// // // import styles from './CustomSidebar.module.css';

// // // function CustomSidebar() {
// // //   const history = useHistory();
// // //   const location = useLocation();
  
// // //   // Get versions from Docusaurus 3.7 API
// // //   // The default plugin ID for docs is 'default'
// // //   const versions = useVersions('default');
// // //   const { activeVersion } = useActiveDocContext('default');
  
// // //   // Handle version change
// // //   const handleVersionChange = (event) => {
// // //     const newVersionName = event.target.value;
    
// // //     // Find the selected version object
// // //     const newVersion = versions.find(v => v.name === newVersionName);
    
// // //     if (!newVersion || !activeVersion) return;
    
// // //     // Get the current pathname
// // //     const currentPath = location.pathname;
    
// // //     // If we're in a versioned doc, we need to map to the equivalent doc in the new version
// // //     if (currentPath.includes(activeVersion.path)) {
// // //       // Get the path after the version segment
// // //       const pathAfterVersion = currentPath.split(activeVersion.path)[1] || '';
      
// // //       // Create the new path with the selected version
// // //       const newPath = newVersion.isLast 
// // //         ? `/docs${pathAfterVersion}` // Latest version might not have version in URL
// // //         : `/docs/${newVersion.name}${pathAfterVersion}`;
        
// // //       history.push(newPath);
// // //     } else {
// // //       // If we're not in a versioned doc, just go to the version's landing page
// // //       const newPath = newVersion.isLast 
// // //         ? '/docs' 
// // //         : `/docs/${newVersion.name}`;
        
// // //       history.push(newPath);
// // //     }
// // //   };

// // //   return (
// // //     <div className={styles.sidebarContainer}>
// // //       <div className={styles.versionSelector}>
// // //         <label htmlFor="version-select">Documentation Version:</label>
// // //         <select
// // //           id="version-select"
// // //           value={activeVersion?.name || ''}
// // //           onChange={handleVersionChange}
// // //           className={styles.versionDropdown}
// // //         >
// // //           {versions.map((version) => (
// // //             <option key={version.name} value={version.name}>
// // //               {version.label} {version.isLast ? '(Latest)' : ''}
// // //             </option>
// // //           ))}
// // //         </select>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default CustomSidebar;


// // import React, { useState } from 'react';
// // import { useHistory, useLocation } from '@docusaurus/router';
// // import { useActiveDocContext, useVersions } from '@docusaurus/plugin-content-docs/client';
// // import styles from './CustomSidebar.module.css';

// // function CustomSidebar() {
// //   const history = useHistory();
// //   const location = useLocation();
  
// //   // Get versions from Docusaurus API
// //   const versions = useVersions('default');
// //   const { activeVersion } = useActiveDocContext('default');
  
// //   // State for release type selector (LATEST, STABLE, etc.)
// //   const [releaseType, setReleaseType] = useState('LATEST');
  
// //   // Define release type options
// //   const releaseOptions = [
// //     { label: 'LATEST', value: 'LATEST' },
// //     { label: 'STABLE', value: 'STABLE' }
// //     // Add other release types as needed
// //   ];

// //   // Define framework options
// //   const frameworks = [
// //     { label: 'React', value: 'react' }
// //     // Add other frameworks if needed
// //   ];
  
// //   // State for selected framework
// //   const [selectedFramework, setSelectedFramework] = useState(frameworks[0].value);
  
// //   // Handle version change
// //   const handleVersionChange = (event) => {
// //     const newVersionName = event.target.value;
    
// //     // Find the selected version object
// //     const newVersion = versions.find(v => v.name === newVersionName);
    
// //     if (!newVersion || !activeVersion) return;
    
// //     // Get the current pathname
// //     const currentPath = location.pathname;
    
// //     // If we're in a versioned doc, we need to map to the equivalent doc in the new version
// //     if (currentPath.includes(activeVersion.path)) {
// //       // Get the path after the version segment
// //       const pathAfterVersion = currentPath.split(activeVersion.path)[1] || '';
      
// //       // Create the new path with the selected version
// //       const newPath = newVersion.isLast 
// //         ? `/docs${pathAfterVersion}` // Latest version might not have version in URL
// //         : `/docs/${newVersion.name}${pathAfterVersion}`;
        
// //       history.push(newPath);
// //     } else {
// //       // If we're not in a versioned doc, just go to the version's landing page
// //       const newPath = newVersion.isLast 
// //         ? '/docs' 
// //         : `/docs/${newVersion.name}`;
        
// //       history.push(newPath);
// //     }
// //   };

// //   // Handle release type change
// //   const handleReleaseTypeChange = (event) => {
// //     setReleaseType(event.target.value);
    
// //     // Here you could add logic to switch between latest and stable versions
// //     // For now, this is just a UI element
// //   };

// //   // Handle framework change
// //   const handleFrameworkChange = (event) => {
// //     setSelectedFramework(event.target.value);
    
// //     // Add logic for framework switching if needed
// //   };

// //   // React logo SVG for the framework dropdown
// //   const ReactLogo = () => (
// //     <svg 
// //       viewBox="0 0 24 24" 
// //       xmlns="http://www.w3.org/2000/svg" 
// //       className={styles.reactLogo}
// //     >
// //       <path d="M12 9.861a2.139 2.139 0 100 4.278 2.139 2.139 0 100-4.278zm-5.992 6.394l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 001.363 3.578l.101.213-.101.213a23.307 23.307 0 00-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 011.182-3.046A24.752 24.752 0 015.317 8.95zm12.675 7.305l-.133-.469a23.357 23.357 0 00-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 001.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.14s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.259c.48 1.039.877 2.06 1.182 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046a24.788 24.788 0 01-1.182 3.046z" fill="currentColor"/>
// //     </svg>
// //   );

// //   return (
// //     <div className={styles.sidebarContainer}>
// //       {/* Framework selector */}
// //       <div className={styles.frameworkSelector}>
// //         <select
// //           value={selectedFramework}
// //           onChange={handleFrameworkChange}
// //           className={styles.frameworkDropdown}
// //         >
// //           {frameworks.map((framework) => (
// //             <option key={framework.value} value={framework.value}>
// //               {framework.label}
// //             </option>
// //           ))}
// //         </select>
// //       </div>
      
// //       {/* Version selector group */}
// //       <div className={styles.versionSelector}>
// //         <div className={styles.versionGroup}>
// //           <div className={styles.versionIcon}>
// //             <svg 
// //               xmlns="http://www.w3.org/2000/svg" 
// //               width="16" 
// //               height="16" 
// //               viewBox="0 0 24 24" 
// //               fill="none" 
// //               stroke="currentColor" 
// //               strokeWidth="2" 
// //               strokeLinecap="round" 
// //               strokeLinejoin="round"
// //             >
// //               <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
// //               <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
// //             </svg>
// //           </div>
          
// //           <select
// //             value={activeVersion?.name || ''}
// //             onChange={handleVersionChange}
// //             className={styles.versionDropdown}
// //           >
// //             {versions.map((version) => (
// //               <option key={version.name} value={version.name}>
// //                 {version.label}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
        
// //         <select
// //           value={releaseType}
// //           onChange={handleReleaseTypeChange}
// //           className={styles.releaseDropdown}
// //         >
// //           {releaseOptions.map((option) => (
// //             <option key={option.value} value={option.value}>
// //               {option.label}
// //             </option>
// //           ))}
// //         </select>
// //       </div>
// //     </div>
// //   );
// // }

// // export default CustomSidebar;


// import React, { useState } from 'react';
// import { useHistory, useLocation } from '@docusaurus/router';
// import { useActiveDocContext, useVersions } from '@docusaurus/plugin-content-docs/client';
// import styles from './CustomSidebar.module.css';

// function CustomSidebar() {
//   const history = useHistory();
//   const location = useLocation();
  
//   // Get versions from Docusaurus API
//   const versions = useVersions('default');
//   const { activeVersion } = useActiveDocContext('default');
  
//   // State for release type selector (LATEST, STABLE, etc.)
//   const [releaseType, setReleaseType] = useState('LATEST');
  
//   // Define release type options
//   const releaseOptions = [
//     { label: 'LATEST', value: 'LATEST' }
//     // Add other release types as needed
//   ];

//   // Define framework options
//   const frameworks = [
//     { label: 'React', value: 'react' }
//     // Add other frameworks if needed
//   ];
  
//   // State for selected framework
//   const [selectedFramework, setSelectedFramework] = useState(frameworks[0].value);
  
//   // Handle version change
//   const handleVersionChange = (event) => {
//     const newVersionName = event.target.value;
    
//     // Find the selected version object
//     const newVersion = versions.find(v => v.name === newVersionName);
    
//     if (!newVersion || !activeVersion) return;
    
//     // Get the current pathname
//     const currentPath = location.pathname;
    
//     // If we're in a versioned doc, we need to map to the equivalent doc in the new version
//     if (currentPath.includes(activeVersion.path)) {
//       // Get the path after the version segment
//       const pathAfterVersion = currentPath.split(activeVersion.path)[1] || '';
      
//       // Create the new path with the selected version
//       const newPath = newVersion.isLast 
//         ? `/docs${pathAfterVersion}` // Latest version might not have version in URL
//         : `/docs/${newVersion.name}${pathAfterVersion}`;
        
//       history.push(newPath);
//     } else {
//       // If we're not in a versioned doc, just go to the version's landing page
//       const newPath = newVersion.isLast 
//         ? '/docs' 
//         : `/docs/${newVersion.name}`;
        
//       history.push(newPath);
//     }
//   };

//   // Handle release type change
//   const handleReleaseTypeChange = (event) => {
//     setReleaseType(event.target.value);
    
//     // Here you could add logic to switch between latest and stable versions
//     // For now, this is just a UI element
//   };

//   // Handle framework change
//   const handleFrameworkChange = (event) => {
//     setSelectedFramework(event.target.value);
    
//     // Add logic for framework switching if needed
//   };

//   // React logo SVG for the framework dropdown
//   const ReactLogo = () => (
//     <svg 
//       viewBox="0 0 24 24" 
//       xmlns="http://www.w3.org/2000/svg" 
//       className={styles.reactLogo}
//     >
//       <path d="M12 9.861a2.139 2.139 0 100 4.278 2.139 2.139 0 100-4.278zm-5.992 6.394l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 001.363 3.578l.101.213-.101.213a23.307 23.307 0 00-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 011.182-3.046A24.752 24.752 0 015.317 8.95zm12.675 7.305l-.133-.469a23.357 23.357 0 00-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 001.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.14s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.259c.48 1.039.877 2.06 1.182 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046a24.788 24.788 0 01-1.182 3.046z" fill="currentColor"/>
//     </svg>
//   );

//   return (
//     <div className={styles.sidebarContainer}>
//       {/* Framework selector */}
//       <div className={styles.frameworkSelector}>
//         <div className={styles.frameworkDropdownWrapper}>
//           <ReactLogo />
//           <span className={styles.frameworkLabel}>React</span>
//           <svg 
//             xmlns="http://www.w3.org/2000/svg" 
//             width="16" 
//             height="16" 
//             viewBox="0 0 24 24" 
//             fill="none" 
//             stroke="currentColor" 
//             strokeWidth="2" 
//             strokeLinecap="round" 
//             strokeLinejoin="round"
//             className={styles.dropdownArrow}
//           >
//             <polyline points="6 9 12 15 18 9"></polyline>
//           </svg>
//         </div>
//       </div>
      
//       {/* Version selector group */}
//       <div className={styles.versionSelector}>
//         <div className={styles.versionBox}>
//           <input 
//             type="checkbox" 
//             className={styles.versionCheckbox} 
//             id="versionCheckbox" 
//             readOnly 
//             checked
//           />
//           <span className={styles.versionText}>v5</span>
//           <svg 
//             xmlns="http://www.w3.org/2000/svg" 
//             width="16" 
//             height="16" 
//             viewBox="0 0 24 24" 
//             fill="none" 
//             stroke="currentColor" 
//             strokeWidth="2" 
//             strokeLinecap="round" 
//             strokeLinejoin="round"
//             className={styles.dropdownArrow}
//           >
//             <polyline points="6 9 12 15 18 9"></polyline>
//           </svg>
//         </div>
        
//         <div className={styles.latestTag}>
//           LATEST
//           <svg 
//             xmlns="http://www.w3.org/2000/svg" 
//             width="16" 
//             height="16" 
//             viewBox="0 0 24 24" 
//             fill="none" 
//             stroke="currentColor" 
//             strokeWidth="2" 
//             strokeLinecap="round" 
//             strokeLinejoin="round"
//             className={styles.dropdownArrow}
//           >
//             <polyline points="6 9 12 15 18 9"></polyline>
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CustomSidebar;


import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
import { useActiveDocContext, useVersions } from '@docusaurus/plugin-content-docs/client';
import styles from './CustomSidebar.module.css';

function CustomSidebar() {
  const history = useHistory();
  const location = useLocation();
  
  // Get versions from Docusaurus API
  const versions = useVersions('default');
  const { activeVersion } = useActiveDocContext('default');
  
  // Framework dropdown state
  const [frameworkDropdownOpen, setFrameworkDropdownOpen] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState('React');
  
  // Version dropdown state  
  const [versionDropdownOpen, setVersionDropdownOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(activeVersion?.name || 'v5');
  
  // Latest tag dropdown state
  const [latestDropdownOpen, setLatestDropdownOpen] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState('LATEST');
  
  // Refs for dropdown elements
  const frameworkDropdownRef = useRef(null);
  const versionDropdownRef = useRef(null);
  const latestDropdownRef = useRef(null);
  
  // Define framework options
  const frameworks = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' }
  ];
  
  // Define release options
  const releaseOptions = [
    { label: 'LATEST', value: 'latest' },
    { label: 'STABLE', value: 'stable' },
    { label: 'EXPERIMENTAL', value: 'experimental' }
  ];
  
  // Handle version change
  const handleVersionChange = (version) => {
    setSelectedVersion(version);
    setVersionDropdownOpen(false);
    
    // Find the selected version object
    const newVersion = versions.find(v => v.name === version || v.label === version);
    
    if (!newVersion || !activeVersion) return;
    
    // Get the current pathname
    const currentPath = location.pathname;
    
    // If we're in a versioned doc, we need to map to the equivalent doc in the new version
    if (currentPath.includes(activeVersion.path)) {
      // Get the path after the version segment
      const pathAfterVersion = currentPath.split(activeVersion.path)[1] || '';
      
      // Create the new path with the selected version
      const newPath = newVersion.isLast 
        ? `/docs${pathAfterVersion}` // Latest version might not have version in URL
        : `/docs/${newVersion.name}${pathAfterVersion}`;
        
      history.push(newPath);
    } else {
      // If we're not in a versioned doc, just go to the version's landing page
      const newPath = newVersion.isLast 
        ? '/docs' 
        : `/docs/${newVersion.name}`;
        
      history.push(newPath);
    }
  };
  
  
  // Handle framework change
  const handleFrameworkChange = (framework) => {
    setSelectedFramework(framework);
    setFrameworkDropdownOpen(false);
    
    // Add logic here to change the framework
  };
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (frameworkDropdownRef.current && !frameworkDropdownRef.current.contains(event.target)) {
        setFrameworkDropdownOpen(false);
      }
      if (versionDropdownRef.current && !versionDropdownRef.current.contains(event.target)) {
        setVersionDropdownOpen(false);
      }
      if (latestDropdownRef.current && !latestDropdownRef.current.contains(event.target)) {
        setLatestDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // React logo SVG
  const ReactLogo = () => (
    <svg 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg" 
      className={styles.reactLogo}
    >
      <path d="M12 9.861a2.139 2.139 0 100 4.278 2.139 2.139 0 100-4.278zm-5.992 6.394l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 001.363 3.578l.101.213-.101.213a23.307 23.307 0 00-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 011.182-3.046A24.752 24.752 0 015.317 8.95zm12.675 7.305l-.133-.469a23.357 23.357 0 00-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 001.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.14s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.259c.48 1.039.877 2.06 1.182 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046a24.788 24.788 0 01-1.182 3.046z" fill="currentColor"/>
    </svg>
  );

  return (
    <div className={styles.sidebarContainer}>
      {/* Framework selector */}
      <div className={styles.selectorWrapper} ref={frameworkDropdownRef}>
        <div 
          className={styles.dropdownButton}
          onClick={() => setFrameworkDropdownOpen(!frameworkDropdownOpen)}
        >
          <ReactLogo />
          <span className={styles.dropdownLabel}>{selectedFramework}</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={styles.dropdownArrow}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        
        {frameworkDropdownOpen && (
          <div className={styles.dropdownMenu}>
            {frameworks.map((framework) => (
              <div 
                key={framework.value} 
                className={styles.dropdownItem}
                onClick={() => handleFrameworkChange(framework.label)}
              >
                {framework.label}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Version selector group */}
      <div className={styles.versionSelector}>
        <div className={styles.selectorWrapper} ref={versionDropdownRef}>
          <div 
            className={styles.dropdownButton}
            onClick={() => setVersionDropdownOpen(!versionDropdownOpen)}
          >
            <input 
              type="checkbox" 
              className={styles.versionCheckbox} 
              readOnly 
              checked
              onClick={(e) => e.stopPropagation()}
            />
            <span className={styles.dropdownLabel}>{selectedVersion}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={styles.dropdownArrow}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          
          {versionDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {versions.map((version) => (
                <div 
                  key={version.name} 
                  className={styles.dropdownItem}
                  onClick={() => handleVersionChange(version.label)}
                >
                  {version.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomSidebar;