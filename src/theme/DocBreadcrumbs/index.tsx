import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useSidebarBreadcrumbs } from "@docusaurus/plugin-content-docs/client";
import { useHomePageRoute } from "@docusaurus/theme-common/internal";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import { MdArrowForwardIos } from "react-icons/md";

import styles from "./styles.module.css"; // Make sure this file exists with the CSS

// Helper to construct hrefs more safely
function joinPath(...segments: Array<string | undefined | null>): string {
  const joined = segments
    .filter(s => s && s.trim() !== '') // Remove undefined/empty/null segments
    .join('/')
    .replace(/\/+/g, '/'); // Replace multiple slashes with single
  return joined.startsWith('/') ? joined : `/${joined}`; // Ensure leading slash
}

// Helper to capitalize first letter
function capitalizeFirstLetter(string: string): string {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface BreadcrumbItemType {
  lable: string;
  href: string;
  isCurrent: boolean;
}

export default function DocBreadcrumbs(): JSX.Element | null {
  const breadcrumbsFromHook = useSidebarBreadcrumbs();
  const homePageRoute = useHomePageRoute();

  const generatedBreadcrumbs: Array<BreadcrumbItemType> = [];

  // 1. Add Home
  let homePath = '/';
  if (homePageRoute?.path) {
    const trimmedHomePath = homePageRoute.path.replace(/\/$/, "");
    homePath = trimmedHomePath === '' ? '/' : trimmedHomePath;
  }

  generatedBreadcrumbs.push({
    lable: translate({
      id: 'theme.docs.breadcrumbs.home',
      message: 'Home',
      description: 'The label for the Home breadcrumb',
    }),
    href: homePath,
    isCurrent: false,
  });

  if (breadcrumbsFromHook) {
    breadcrumbsFromHook.forEach((hookItem) => {
      if (!hookItem || !hookItem.href || !hookItem.label) return;

      // --- START: CUSTOM PATH DECOMPOSITION LOGIC (Show "React" if present) ---
      const fullPathSegments = hookItem.href
        .replace(/\/$/, "") // Remove trailing slash
        .split("/")
        .filter(Boolean); // e.g., ["wip-docs", "ui-kit", "react", "overview"]

      // Find the index of "react" in the path segments
      const reactSegmentIndex = fullPathSegments.findIndex(
        segment => segment.toLowerCase() === "react"
      );

      // If "react" is found and it's an intermediate segment (not the last one, which is the page title)
      if (reactSegmentIndex > -1 && reactSegmentIndex < fullPathSegments.length - 1) {
        // Construct the href up to and including the "react" segment
        const reactHrefSegments = fullPathSegments.slice(0, reactSegmentIndex + 1);
        const reactHref = joinPath(null, ...reactHrefSegments); // Pass null as first to ensure leading '/' from joinPath

        // Avoid adding if "React" breadcrumb with the exact same href already exists
        // This handles cases where "Home" might already point to the "react" section.
        const reactBreadcrumbExists = generatedBreadcrumbs.some(
          b => b.lable.toLowerCase() === "react" && b.href === reactHref
        );

        if (!reactBreadcrumbExists) {
          generatedBreadcrumbs.push({
            lable: "React", // Hardcode/Capitalize "React" as the label
            href: reactHref,
            isCurrent: false,
          });
        }
      }
      // --- END: CUSTOM PATH DECOMPOSITION LOGIC ---

      // Add the final page item (e.g., "Overview") from the hookItem
      const finalItemLabelLower = hookItem.label.toLowerCase();

      // Check if this final item (by label and href) is already the last one added
      const lastGenerated = generatedBreadcrumbs[generatedBreadcrumbs.length - 1];
      if (
        !lastGenerated ||
        lastGenerated.lable.toLowerCase() !== finalItemLabelLower ||
        lastGenerated.href !== hookItem.href
      ) {
        // If an item with the same label but different href exists earlier, remove it
        // This prioritizes the hookItem's href for the final page title
        const existingLabelIndex = generatedBreadcrumbs.findIndex(
          b => b.lable.toLowerCase() === finalItemLabelLower && b.href !== hookItem.href
        );
        if (existingLabelIndex > -1) {
          generatedBreadcrumbs.splice(existingLabelIndex, 1);
        }

        generatedBreadcrumbs.push({
          lable: hookItem.label,
          href: hookItem.href,
          isCurrent: false, // Will be set true for the very last item later
        });
      } else if (lastGenerated && lastGenerated.lable.toLowerCase() === finalItemLabelLower && lastGenerated.href !== hookItem.href) {
        // If last item has same label but different href (unlikely with above logic, but as a safeguard)
        lastGenerated.href = hookItem.href; // Update href
      }
    });
  }

  // Final de-duplication pass: Remove sequential duplicates based on label and href
  const uniqueBreadcrumbs: Array<BreadcrumbItemType> = [];
  if (generatedBreadcrumbs.length > 0) {
    uniqueBreadcrumbs.push(generatedBreadcrumbs[0]); // Add the first one (Home)

    for (let i = 1; i < generatedBreadcrumbs.length; i++) {
      const current = generatedBreadcrumbs[i];
      const previous = uniqueBreadcrumbs[uniqueBreadcrumbs.length - 1];
      if (current.lable.toLowerCase() !== previous.lable.toLowerCase() || current.href !== previous.href) {
        uniqueBreadcrumbs.push(current);
      }
    }
  }

  // Set the last item as current
  if (uniqueBreadcrumbs.length > 0) {
    uniqueBreadcrumbs.forEach((bc, index) => (bc.isCurrent = index === uniqueBreadcrumbs.length - 1));
  }

  // Conditional rendering: Don't render if only "Home" is present and it's the current page
  if (uniqueBreadcrumbs.length <= 1 && uniqueBreadcrumbs[0]?.isCurrent) {
    if (!homePageRoute || (breadcrumbsFromHook && breadcrumbsFromHook.length === 0)) {
      return null;
    }
  }
  if (uniqueBreadcrumbs.length === 0) return null;

  return (
    <nav
      className={clsx(
        ThemeClassNames.docs.docBreadcrumbs,
        styles.breadcrumbsContainer
      )}
      aria-label={translate({
        id: "theme.docs.breadcrumbs.navAriaLabel",
        message: "Breadcrumbs",
        description: "The ARIA label for the breadcrumbs",
      })}
    >
      <ul className={styles.breadcrumbList}>
        {uniqueBreadcrumbs.map((breadcrumb, index) => (
          <li
            key={`${breadcrumb.href}-${index}-${breadcrumb.lable}`}
            className={clsx(styles.breadcrumbItem)}
          >
            {breadcrumb.isCurrent || !breadcrumb.href ? (
              <span
                className={clsx(
                  styles.breadcrumbLink,
                  breadcrumb.isCurrent && styles.breadcrumbLinkCurrent
                )}
                aria-current={breadcrumb.isCurrent ? "page" : undefined}
              >
                {capitalizeFirstLetter(breadcrumb.lable)}
              </span>
            ) : (
              <div
                className={clsx(styles.breadcrumbLink, styles.breadcrumbLinkActive)}
                onClick={()=>{
                  window.location.href = breadcrumb.href
                }}
              >
                {capitalizeFirstLetter(breadcrumb.lable)}
              </div>
            )}
            {index < uniqueBreadcrumbs.length - 1 && (
              <MdArrowForwardIos className={styles.breadcrumbSeparatorIcon} />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}