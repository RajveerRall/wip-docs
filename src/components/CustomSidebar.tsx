// // // src/components/VersionDropdown.js
// // import React, { useEffect, useState } from "react";
// // import versions from "../../versions.json";
// // import { useLocation } from "@docusaurus/router";
// // import Link from "@docusaurus/Link";
// // import styles from "./VersionDropdown.module.css";

// // export default function VersionDropdown() {
// //   const [currentVersion, setCurrentVersion] = useState("");
// //   const location = useLocation();

// //   // Function to get the correct route for a given version
// //   function getVersionRoute(version) {
// //     const currentPath = location.pathname;
// //     const pathParts = currentPath.split("/");
    
// //     // Check if we're already viewing a versioned route
// //     const isViewingVersioned = pathParts[1] === "docs" && 
// //                                (pathParts[2] === "1.0.0" || pathParts[2] === "2.0.0");
    
// //     // If switching to the latest version (2.0.0)
// //     if (version === "2.0.0") {
// //       if (isViewingVersioned) {
// //         // Remove version from path if it's the latest
// //         return "/docs/" + pathParts.slice(3).join("/");
// //       }
// //       return currentPath; // Already viewing the latest version
// //     } else {
// //       // If viewing the latest version, insert the version after /docs/
// //       if (!isViewingVersioned) {
// //         return `/docs/${version}/${pathParts.slice(2).join("/")}`;
// //       } else {
// //         // Replace current version with the new version
// //         pathParts[2] = version;
// //         return pathParts.join("/");
// //       }
// //     }
// //   }

// //   useEffect(() => {
// //     // Determine which version we're currently viewing
// //     const path = location.pathname;
// //     const pathParts = path.split('/');
    
// //     if (pathParts[1] === "docs") {
// //       if (pathParts[2] === "1.0.0") {
// //         setCurrentVersion("1.0.0");
// //       } else {
// //         // If not explicitly in a version path, we're in the latest version
// //         setCurrentVersion("2.0.0");
// //       }
// //     }
// //   }, [location.pathname]);

// //   // Only render the dropdown if we're in a docs page
// //   if (!location.pathname.startsWith("/docs")) {
// //     return null;
// //   }

// //   return (
// //     <div className={styles.versionDropdown}>
// //       <div className={styles.versionLabel}>Version</div>
// //       <div className="dropdown dropdown--hoverable">
// //         <button className={styles.versionButton}>
// //           {currentVersion}
// //           <span className={styles.versionArrow}></span>
// //         </button>
// //         <ul className="dropdown__menu">
// //           {versions.map((version) => (
// //             <li key={version}>
// //               <Link
// //                 className={`dropdown__link ${version === currentVersion ? 'dropdown__link--active' : ''}`}
// //                 to={getVersionRoute(version)}
// //               >
// //                 {version}
// //               </Link>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import versions from "../../versions.json";
// import { useLocation } from "@docusaurus/router";
// import Link from "@docusaurus/Link";
// import styles from "./VersionDropdown.module.css";

// export default function VersionDropdown(): React.ReactNode | null {
//   const [currentVersion, setCurrentVersion] = useState<string>("");
//   const location = useLocation();

//   // Function to get the correct route for a given version
//   function getVersionRoute(version: string): string {
//     const currentPath = location.pathname;
//     const pathParts = currentPath.split("/");
    
//     // Check if we're already viewing a versioned route
//     const isViewingVersioned = pathParts[1] === "docs" && 
//                                (pathParts[2] === "1.0.0" || pathParts[2] === "2.0.0");
    
//     // If switching to the latest version (2.0.0)
//     if (version === "2.0.0") {
//       if (isViewingVersioned) {
//         // Remove version from path if it's the latest
//         return "/docs/" + pathParts.slice(3).join("/");
//       }
//       return currentPath; // Already viewing the latest version
//     } else {
//       // If viewing the latest version, insert the version after /docs/
//       if (!isViewingVersioned) {
//         return `/docs/${version}/${pathParts.slice(2).join("/")}`;
//       } else {
//         // Replace current version with the new version
//         pathParts[2] = version;
//         return pathParts.join("/");
//       }
//     }
//   }

//   useEffect(() => {
//     // Determine which version we're currently viewing
//     const path = location.pathname;
//     const pathParts = path.split('/');
    
//     if (pathParts[1] === "docs") {
//       if (pathParts[2] === "1.0.0") {
//         setCurrentVersion("1.0.0");
//       } else {
//         // If not explicitly in a version path, we're in the latest version
//         setCurrentVersion("2.0.0");
//       }
//     }
//   }, [location.pathname]);

//   // Only render the dropdown if we're in a docs page
//   if (!location.pathname.startsWith("/docs")) {
//     return null;
//   }

//   return (
//     <div className={styles.versionDropdown}>
//       <div className={styles.versionLabel}>Version:</div>
//       <div className="dropdown dropdown--hoverable">
//         <button className={styles.versionButton}>
//           {currentVersion}
//           <span className={styles.versionArrow}></span>
//         </button>
//         <ul className="dropdown__menu">
//           {versions.map((version) => (
//             <li key={version}>
//               <Link
//                 className={`dropdown__link ${version === currentVersion ? 'dropdown__link--active' : ''}`}
//                 to={getVersionRoute(version)}
//               >
//                 {version}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// CustomSidebar.js
import React from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
import { useActiveDocContext, useVersions } from '@docusaurus/plugin-content-docs/client';
import styles from './CustomSidebar.module.css';

function CustomSidebar() {
  const history = useHistory();
  const location = useLocation();
  
  // Get versions from Docusaurus 3.7 API
  // The default plugin ID for docs is 'default'
  const versions = useVersions('default');
  const { activeVersion } = useActiveDocContext('default');
  
  // Handle version change
  const handleVersionChange = (event) => {
    const newVersionName = event.target.value;
    
    // Find the selected version object
    const newVersion = versions.find(v => v.name === newVersionName);
    
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

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.versionSelector}>
        <label htmlFor="version-select">Documentation Version:</label>
        <select
          id="version-select"
          value={activeVersion?.name || ''}
          onChange={handleVersionChange}
          className={styles.versionDropdown}
        >
          {versions.map((version) => (
            <option key={version.name} value={version.name}>
              {version.label} {version.isLast ? '(Latest)' : ''}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CustomSidebar;