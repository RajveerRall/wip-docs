import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useSidebarBreadcrumbs} from '@docusaurus/plugin-content-docs/client';
import {useHomePageRoute} from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
// HomeBreadcrumbItem is imported but not directly used if "Home" is just text.
// import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home';

import styles from './styles.module.css';

// Updated BreadcrumbsItemLink for different styling needs
function BreadcrumbsItemLink({
  children,
  href,
  isLastInTrail, // True if this is the very last item in the entire breadcrumb sequence
}: {
  children: ReactNode;
  href: string | undefined;
  isLastInTrail: boolean;
}): JSX.Element {
  const baseDocusaurusLinkClass = 'breadcrumbs__link';

  if (isLastInTrail) {
    // This is the very last item, style it with a pill
    return (
      <span
        className={clsx(baseDocusaurusLinkClass, styles.breadcrumbLinkIsPill)}
        itemProp="name">
        {children}
      </span>
    );
  }

  // Not the last item in the trail
  if (href) {
    // It's an intermediate item with a link (clickable, purple)
    return (
      <Link
        className={clsx(baseDocusaurusLinkClass, styles.breadcrumbLinkIsActiveLink)}
        href={href}
        itemProp="item">
        <span itemProp="name">{children}</span>
      </Link>
    );
  }

  // It's an intermediate item WITHOUT a link (e.g., unlisted category)
  // Style it as plain text. If children (label) is empty, it will be an empty span.
  return (
    <span
      className={clsx(baseDocusaurusLinkClass, styles.breadcrumbLinkIsIntermediateNonLinkable)}
      itemProp="name">
      {children}
    </span>
  );
}

// Updated BreadcrumbsItem to include separator logic and isFirst prop
function BreadcrumbsItem({
  children,
  active, // Docusaurus's "active" concept for the last item in its list
  index,
  addMicrodata,
  isFirstItemInTrail, // True if this is the very first item (e.g., "Home")
}: {
  children: ReactNode;
  active?: boolean;
  index: number;
  addMicrodata: boolean;
  isFirstItemInTrail?: boolean;
}): JSX.Element {
  return (
    <li
      {...(addMicrodata && {
        itemScope: true,
        itemProp: 'itemListElement',
        itemType: 'https://schema.org/ListItem',
      })}
      className={clsx('breadcrumbs__item', {
        'breadcrumbs__item--active': active, // Docusaurus class for its "active" item
      })}>
      {!isFirstItemInTrail && ( // Render separator if not the first item in the whole trail
        <span className={styles.breadcrumbSeparator} aria-hidden="true">
          {' > '}
        </span>
      )}
      {children}
      {addMicrodata && (
        <meta itemProp="position" content={String(index + 1)} />
      )}
    </li>
  );
}

export default function DocBreadcrumbs(): JSX.Element | null {
  const breadcrumbsFromHook = useSidebarBreadcrumbs();
  const homePageRoute = useHomePageRoute();

  const hasSidebarBreadcrumbs = breadcrumbsFromHook && breadcrumbsFromHook.length > 0;

  // Construct the full list of breadcrumb items, starting with Home
  const allBreadcrumbItems = [];

  // 1. Home Item
  if (homePageRoute || hasSidebarBreadcrumbs) { // Show Home if it's a valid route or if other breadcrumbs exist
    allBreadcrumbItems.push({
      isHome: true,
      label: translate({
        id: 'theme.docs.breadcrumbs.home',
        message: 'Home',
        description: 'The label for the Home breadcrumb',
      }),
      href: homePageRoute?.path || '/',
    });
  }

  // 2. Items from Hook
  if (breadcrumbsFromHook) {
    breadcrumbsFromHook.forEach(item => {
      allBreadcrumbItems.push({
        isHome: false,
        label: item.label,
        href: item.type === 'category' && item.linkUnlisted ? undefined : item.href,
        originalType: item.type, // Store original type if needed later
      });
    });
  }

  if (allBreadcrumbItems.length === 0) {
    return null;
  }

  return (
    <nav
      className={clsx(
        ThemeClassNames.docs.docBreadcrumbs,
        styles.breadcrumbsContainer,
      )}
      aria-label={translate({
        id: 'theme.docs.breadcrumbs.navAriaLabel',
        message: 'Breadcrumbs',
        description: 'The ARIA label for the breadcrumbs',
      })}>
      <ul
        className="breadcrumbs"
        itemScope
        itemType="https://schema.org/BreadcrumbList">
        {allBreadcrumbItems.map((item, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === allBreadcrumbItems.length - 1;
          // For Docusaurus's 'active' class on <li>, it's usually the last item from the hook
          // or Home if it's the only item.
          // Here, we mark the last LI in our combined list as active for consistency.
          const docusaurusActive = isLast;

          // console.log("Rendering breadcrumb:", item.label, "isFirst:", isFirst, "isLast:", isLast);
          // Your original console.log for items from the hook:
          // if (!item.isHome && breadcrumbsFromHook) console.log("breadcrumbs :: ,", breadcrumbsFromHook[idx - (allBreadcrumbItems[0].isHome ? 1:0)]);


          return (
            <BreadcrumbsItem
              key={item.href || item.label || idx}
              active={docusaurusActive} // For Docusaurus's breadcrumbs__item--active class
              index={idx} // 0-based index for microdata position
              addMicrodata={!!item.href || item.isHome} // Add microdata if it's Home or has an href
              isFirstItemInTrail={isFirst}
              >
              <BreadcrumbsItemLink
                href={item.href}
                isLastInTrail={isLast} // Determines pill style
                >
                {item.label}
              </BreadcrumbsItemLink>
            </BreadcrumbsItem>
          );
        })}
      </ul>
    </nav>
  );
}