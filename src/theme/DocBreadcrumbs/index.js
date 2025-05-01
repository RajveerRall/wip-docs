import React from 'react';
import {useActiveDocContext} from '@docusaurus/plugin-content-docs/client';
import {useLocation} from '@docusaurus/router';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl'; // Import for base URL handling

// Helper function to format URL slugs into readable labels
function formatLabel(slug) {
  if (!slug) return '';
  // Handle potential index pages or specific slugs you want formatted differently
  // if (slug.toLowerCase() === 'index' || slug.toLowerCase() === 'overview') return 'Overview';

  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function DocBreadcrumbs() {
  const {pathname} = useLocation();
  const {activeDoc} = useActiveDocContext();
  const { withBaseUrl } = useBaseUrlUtils(); // Hook to prepend base URL if needed

  // --- Configuration ---
  // Adjust this if your docs are not directly under /wip-docs/
  // If docs are at the root, set this to ''
  const docsBaseRoute = '/wip-docs';
  const rootBreadcrumbLabel = 'Home'; // Label for the very first breadcrumb
  // --- End Configuration ---

  if (!activeDoc) {
    console.log("activeDoc ::",activeDoc)
    // Only show breadcrumbs for actual doc pages with context
    return null;
  }

  // Ensure pathname starts with the base route for calculation, handle root case
  if (!pathname.startsWith(docsBaseRoute + '/')) {
     // If it's exactly the base route (e.g. /wip-docs/) maybe show Home -> Title
     if (pathname === docsBaseRoute || pathname === docsBaseRoute + '/') {
         // You could render a minimal breadcrumb here if desired
         // e.g., Home > Docs Root Title
         return (
            <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
              <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                     <Link className="breadcrumbs__link" href={withBaseUrl(docsBaseRoute + '/')}>{rootBreadcrumbLabel}</Link>
                  </li>
                  <li className="breadcrumbs__item breadcrumbs__item--separator">›</li>
                  <li className="breadcrumbs__item">
                      <span className="breadcrumbs__link" aria-current="page">{activeDoc.title}</span>
                  </li>
              </ul>
           </nav>
         );
     }
     // Otherwise, it's likely outside the docs path we are targeting
     return null;
  }

  // Get path segments relative to the docs base route
  const relativePath = pathname.substring(docsBaseRoute.length);
  const pathParts = relativePath.split('/').filter(Boolean); // Remove empty segments

  // Build breadcrumbs array
  const breadcrumbs = [];

  // 1. Add the root breadcrumb item
  breadcrumbs.push({
    label: rootBreadcrumbLabel,
    href: withBaseUrl(docsBaseRoute + '/'), // Link to the base of your docs
  });

  // 2. Add items for intermediate path segments
  let currentCumulativePath = docsBaseRoute;
  for (let i = 0; i < pathParts.length; i++) {
    const segment = pathParts[i];
    currentCumulativePath += `/${segment}`;

    // Determine label: Use activeDoc.title for the very last item, format slug otherwise
    const isLast = i === pathParts.length - 1;
    const label = isLast && activeDoc.title ? activeDoc.title : formatLabel(segment);

    // Determine href: Use full pathname for the last item, cumulative path otherwise
    const href = withBaseUrl(isLast ? pathname : currentCumulativePath);

    // Add the item
    // Avoid adding if label is empty or maybe duplicate of previous (simple check)
    if (label && (breadcrumbs.length === 0 || label !== breadcrumbs[breadcrumbs.length - 1].label)) {
       breadcrumbs.push({ label, href });
    }
  }


  // Don't render if only the "Home" crumb exists
  if (breadcrumbs.length <= 1) {
    return null;
  }

  // 3. Render the list
  return (
      <ul className="breadcrumbs__list">
        {console.log("breadcrumbs ::",breadcrumbs)}
        {breadcrumbs.map((item, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          return (
            // Use React.Fragment to avoid unnecessary divs and manage keys
            <React.Fragment key={item.href || idx}>
              <li className="breadcrumbs__item">
                {isLast ? (
                  // Last item is not a link, add aria-current
                  <span className="breadcrumbs__link" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  // Intermediate items are links
                  <Link className="breadcrumbs__link" href={item.href}>
                    {item.label}
                  </Link>
                )}
              </li>
              {/* Add separator if this is NOT the last item */}
              {!isLast && (
                <li className="breadcrumbs__item breadcrumbs__item--separator">›</li>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    
  );
}

export default DocBreadcrumbs;