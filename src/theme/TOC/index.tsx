// src/theme/TOC/index.js
import React, {type ReactNode, useEffect} from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/TOC'; // Props type from Docusaurus

import styles from './styles.module.css';
import { FiGithub, FiSettings, FiArrowUpCircle, FiExternalLink } from 'react-icons/fi';

const LINK_CLASS_NAME = 'table-of-contents__link'; // Used by Docusaurus for highlighting
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

// --- Configuration for text indentation ---
const BASE_TEXT_PADDING_LEFT = '4px';
const INDENT_PER_LEVEL = '1.3rem';
// ---

// Helper function to filter TOC items for valid IDs and log issues
function filterAndValidateTocItems(tocItems, componentName = "TOC") {
  if (!Array.isArray(tocItems)) {
    console.warn(`[${componentName}] filterAndValidateTocItems: Input TOC data is not an array. Received:`, tocItems);
    return [];
  }
  return tocItems.filter(item => {
    if (!item || typeof item.id !== 'string' || item.id.trim() === '') {
      console.warn(`[${componentName}] filterAndValidateTocItems: Filtering out TOC item due to missing or empty ID. Item value: "${item?.value}". Full item:`, JSON.stringify(item));
      return false;
    }
    if (typeof item.level !== 'number' || item.level < 1) {
      // Docusaurus heading levels are typically 2-6.
      // This is more of a data integrity check.
      console.warn(`[${componentName}] filterAndValidateTocItems: TOC item has an unusual level (${item.level}). Item ID: "${item.id}", Value: "${item.value}".`);
    }
    return true;
  });
}

// Helper function to convert flat TOC array to nested structure
function buildNestedToc(flatToc) {
  const nestedToc = [];
  const stack = [];

  if (!Array.isArray(flatToc) || flatToc.length === 0) {
    return [];
  }

  for (const item of flatToc) {
    // Assuming items are pre-filtered for valid ID and basic structure by filterAndValidateTocItems
    const node = { ...item, children: [] };
    while (stack.length > 0 && stack[stack.length - 1].level >= node.level) {
      stack.pop();
    }
    if (stack.length === 0) {
      nestedToc.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }
    stack.push(node);
  }
  return nestedToc;
}

// CustomTOCItems: Renders items and calculates text indentation
function CustomTOCItems({
  items,
  linkClassName,
  linkActiveClassName,
  minTocLevel, // This is props.minHeadingLevel from Docusaurus
  isChildList, // To differentiate styling for nested <ul>
}) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <ul className={isChildList ? undefined : "table-of-contents table-of-contents__left-border"}>
      {items.map((item) => {
        // item.id should be valid here due to prior filtering in the main TOC component.
        // If an item somehow passed filtering with an invalid ID, this check provides a fallback.
        if (!item.id) {
          console.warn('[CustomTOCItems] Encountered an item without an ID during rendering (should have been filtered). Item value:', item.value);
          // Render as plain text or skip, to avoid broken links
          return (
            <li key={item.value + Math.random().toString()}> {/* Fallback key */}
              <span
                style={{ paddingLeft: `calc(${BASE_TEXT_PADDING_LEFT} + (${Math.max(0, (item.level || 1) - (minTocLevel || 1))} * ${INDENT_PER_LEVEL}))` }}
                dangerouslySetInnerHTML={{ __html: item.value || "Unnamed Heading" }}
              />
            </li>
          );
        }

        // console.log(`[CustomTOCItems] Item: "${item.value}", item.level: ${item.level}, minTocLevel: ${minTocLevel}`);

        const currentItemLevel = typeof item.level === 'number' ? item.level : 1;
        const currentMinTocLevel = typeof minTocLevel === 'number' ? minTocLevel : 1;

        // Depth calculation for indentation
        const depth = Math.max(0, currentItemLevel - currentMinTocLevel);
        // console.log(`[CustomTOCItems] Calculated Depth for "${item.value}": ${depth}`);

        const textPaddingLeftStyleValue = `calc(${BASE_TEXT_PADDING_LEFT} + (${depth} * ${INDENT_PER_LEVEL}))`;
        const linkStyle = {
          '--toc-item-text-indent': textPaddingLeftStyleValue,
        };

        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={clsx(linkClassName)} // This class is used by useTOCHighlight
              style={linkStyle}
              dangerouslySetInnerHTML={{ __html: item.value }}
            />
            {item.children && item.children.length > 0 && (
              <CustomTOCItems
                items={item.children}
                linkClassName={linkClassName}
                linkActiveClassName={linkActiveClassName}
                minTocLevel={minTocLevel}
                isChildList={true} // Nested lists are children
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

// Main TOC component
export default function TOC({className, ...props}: Props): ReactNode {
  const { toc: flatTocFromProps, minHeadingLevel, editUrl } = props;

  // CRITICAL LOGS for debugging the `querySelectorAll` error:
  console.log(`[TOC Component] Received props.minHeadingLevel: ${minHeadingLevel} (type: ${typeof minHeadingLevel})`);
  // Log the raw TOC data from Docusaurus. Inspect this for items with empty or missing 'id' fields.
  console.log(`[TOC Component] Raw flatTocFromProps from Docusaurus:`, JSON.stringify(flatTocFromProps, null, 2));

  const validatedFlatToc = React.useMemo(
    () => filterAndValidateTocItems(flatTocFromProps, "TOC Component"),
    [flatTocFromProps]
  );

  const nestedToc = React.useMemo(() => buildNestedToc(validatedFlatToc), [validatedFlatToc]);

  // Custom scroll-based highlighting effect
  useEffect(() => {
    const handleScroll = () => {
      // console.log('[TOC Scroll] Handling scroll event...'); // Kept for brevity, can be re-enabled
      
      const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
      const tocLinks = document.querySelectorAll(`.${LINK_CLASS_NAME}`);
      
      // console.log('[TOC Scroll] Found headings:', Array.from(headings).map(h => ({ id: h.id, text: h.textContent?.substring(0, 30) })));
      // console.log('[TOC Scroll] Found TOC links:', Array.from(tocLinks).map(l => l.getAttribute('href')));
      
      // Remove all active classes and inline styles first
      tocLinks.forEach(link => {
        link.classList.remove(LINK_ACTIVE_CLASS_NAME);
        link.removeAttribute('data-active');
        link.style.color = ''; // Clear inline color
        link.style.fontWeight = ''; // Clear inline font-weight
        link.style.removeProperty('--active-indicator-color'); // Clear custom property for ::before
      });
      
      // Find the currently visible heading
      let activeHeading = null;
      const scrollPosition = window.scrollY + 150; // Offset for better UX
      
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading.offsetTop <= scrollPosition) {
          activeHeading = heading;
          break;
        }
      }
      
      // console.log('[TOC Scroll] Active heading:', activeHeading ? { id: activeHeading.id, text: activeHeading.textContent?.substring(0, 30) } : 'none');
      
      // Add active class and inline styles to the corresponding TOC link
      if (activeHeading && activeHeading.id) {
        const activeLink = document.querySelector(`a.${LINK_CLASS_NAME}[href="#${activeHeading.id}"]`);
        // console.log('[TOC Scroll] Found active link:', activeLink ? `href: ${activeLink.getAttribute('href')}` : 'not found');
        
        if (activeLink) {
          // Method 1: Add CSS class
          activeLink.classList.add(LINK_ACTIVE_CLASS_NAME);
          
          // Method 2: Add data attribute
          activeLink.setAttribute('data-active', 'true');
          
          // Method 3: Force active styling with inline styles (using CSS variables)
          // Use --text-primary for the active text color
          activeLink.style.setProperty('color', 'var(--text-primary)', 'important');
          activeLink.style.setProperty('font-weight', '600', 'important');
          
          // Method 4: Set custom property for ::before pseudo-element
          // Use --primary for the active indicator color
          activeLink.style.setProperty('--active-indicator-color', 'var(--primary)');
          
          // console.log('[TOC Scroll] Applied active styling to link');
          // console.log('[TOC Scroll] Link classes after styling:', activeLink.className);
          // console.log('[TOC Scroll] Link computed style color:', window.getComputedStyle(activeLink).color);
        }
      }
    };

    // Add scroll listener with throttling for better performance
    let timeoutId = null;
    const throttledHandleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(handleScroll, 10); // Reduced timeout for faster response
    };

    window.addEventListener('scroll', throttledHandleScroll);
    
    // Initial call to set active state on page load
    setTimeout(handleScroll, 100); // Small delay to ensure DOM is ready
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [validatedFlatToc]); // Re-run when TOC items change

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasTOCItems = nestedToc && nestedToc.length > 0;

  return (
    <div className={clsx(styles.tocWrapper, 'thin-scrollbar', className)}>
      <div className={styles.tocContent}>
        <p className={clsx(styles.tocTitle, 'text--truncate')}>On this page</p>
        {hasTOCItems ? (
          <CustomTOCItems
            items={nestedToc}
            linkClassName={LINK_CLASS_NAME}
            linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
            minTocLevel={minHeadingLevel}
            isChildList={false} // This is the top-level list
          />
        ) : (
          <p className={styles.tocEmpty}>
            {/* Informative message if filtering removed all items vs. no headings originally */}
            {flatTocFromProps && flatTocFromProps.length > 0 && validatedFlatToc.length === 0
              ? "No valid headings found to display in TOC (check console for details)."
              : "No headings on this page."}
          </p>
        )}
      </div>
       <div className={styles.tocBottomStickyLinks}>
        <div
          className={styles.bottomLink}>
          <FiGithub className={styles.bottomLinkIcon} />
          <span>Edit this page on GitHub</span>
          <FiExternalLink className={styles.bottomLinkExternalIcon} />
        </div>
        <div
        onClick={()=> window.location.href ="/docs/managed-react"  }
          className={styles.bottomLink}>
          <FiSettings className={styles.bottomLinkIcon} /> {/* Placeholder icon */}
          <span>Managed react</span>
          <FiExternalLink className={styles.bottomLinkExternalIcon} />
        </div>
        <button
          onClick={scrollToTop}
          className={styles.bottomLink}
          type="button">
          <FiArrowUpCircle className={styles.bottomLinkIcon} />
          <span>Scroll to Top</span>
        </button>
      </div>
    </div>
  );
}