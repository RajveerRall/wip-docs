// src/theme/TOC/index.js
import React, {type ReactNode, useEffect} from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/TOC'; // Props type from Docusaurus

import styles from './styles.module.css';
import { FiGithub, FiSettings, FiArrowUpCircle, FiExternalLink } from 'react-icons/fi';

const LINK_CLASS_NAME = 'table-of-contents__link'; // Used by Docusaurus for highlighting
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

// --- MODIFIED: Simplified Configuration for Indentation ---
// This is now the single unit of indentation for each level.
const INDENT_PER_LEVEL = '12px'; 
// We no longer need a separate BASE_TEXT_PADDING_LEFT.
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
        if (!item.id) {
          console.warn('[CustomTOCItems] Encountered an item without an ID during rendering (should have been filtered). Item value:', item.value);
          // Fallback for items with no ID
          const depth = Math.max(0, (item.level || 1) - (minTocLevel || 1));
          const fallbackPadding = `calc((${depth} + 1) * ${INDENT_PER_LEVEL})`;
          return (
            <li key={item.value + Math.random().toString()}>
              <span
                style={{ paddingLeft: fallbackPadding }}
                dangerouslySetInnerHTML={{ __html: item.value || "Unnamed Heading" }}
              />
            </li>
          );
        }

        const currentItemLevel = typeof item.level === 'number' ? item.level : 1;
        const currentMinTocLevel = typeof minTocLevel === 'number' ? minTocLevel : 1;

        // Depth calculation (e.g., 0 for the first level, 1 for the second, etc.)
        const depth = Math.max(0, currentItemLevel - currentMinTocLevel);

        // --- MODIFIED: Updated Indentation Calculation ---
        // New formula: (depth + 1) * 12px
        // - depth = 0 (first level): (0 + 1) * 12px = 12px
        // - depth = 1 (second level): (1 + 1) * 12px = 24px
        const textPaddingLeftStyleValue = `calc((${depth}) * ${INDENT_PER_LEVEL})`;
        // ---

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

// Main TOC component (No changes below this line)
export default function TOC({className, ...props}: Props): ReactNode {
  const { toc: flatTocFromProps, minHeadingLevel, editUrl } = props;

  // CRITICAL LOGS for debugging
  console.log(`[TOC Component] Received props.minHeadingLevel: ${minHeadingLevel} (type: ${typeof minHeadingLevel})`);
  console.log(`[TOC Component] Raw flatTocFromProps from Docusaurus:`, JSON.stringify(flatTocFromProps, null, 2));

  const validatedFlatToc = React.useMemo(
    () => filterAndValidateTocItems(flatTocFromProps, "TOC Component"),
    [flatTocFromProps]
  );

  const nestedToc = React.useMemo(() => buildNestedToc(validatedFlatToc), [validatedFlatToc]);

  // Custom scroll-based highlighting effect
  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
      const tocLinks = document.querySelectorAll(`.${LINK_CLASS_NAME}`);
      
      tocLinks.forEach(link => {
        link.classList.remove(LINK_ACTIVE_CLASS_NAME);
        link.removeAttribute('data-active');
        link.style.color = ''; 
        link.style.fontWeight = ''; 
        link.style.removeProperty('--active-indicator-color');
      });
      
      let activeHeading = null;
      const scrollPosition = window.scrollY + 150; 
      
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading.offsetTop <= scrollPosition) {
          activeHeading = heading;
          break;
        }
      }
      
      if (activeHeading && activeHeading.id) {
        const activeLink = document.querySelector(`a.${LINK_CLASS_NAME}[href="#${activeHeading.id}"]`);
        if (activeLink) {
          activeLink.classList.add(LINK_ACTIVE_CLASS_NAME);
          activeLink.setAttribute('data-active', 'true');
          activeLink.style.setProperty('color', 'var(--text-primary)', 'important');
          activeLink.style.setProperty('font-weight', '600', 'important');
          activeLink.style.setProperty('--active-indicator-color', 'var(--primary)');
        }
      }
    };

    let timeoutId = null;
    const throttledHandleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(handleScroll, 10);
    };

    window.addEventListener('scroll', throttledHandleScroll);
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [validatedFlatToc]);

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
            isChildList={false}
          />
        ) : (
          <p className={styles.tocEmpty}>
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
          <FiSettings className={styles.bottomLinkIcon} />
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