// src/theme/TOC/index.js
import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import TOCItems from '@theme/TOCItems';
import type {Props} from '@theme/TOC'; // Using the Props type from your original swizzled file

import styles from './styles.module.css'; // We will replace this CSS file's content

// Import icons for bottom links (make sure you have react-icons installed: npm install react-icons)
import { FiGithub, FiSettings, FiArrowUpCircle, FiExternalLink } from 'react-icons/fi'; // FiSettings is a placeholder

// Default Docusaurus class names for the links passed to TOCItems
const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

export default function TOC({className, ...props}: Props): ReactNode {
  // props will contain 'toc', 'minHeadingLevel', 'maxHeadingLevel'
  const { toc } = props;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if there are any TOC items to display
  const hasTOCItems = toc && toc.length > 0;

  // Determine the base URL or logic for the "Edit this page" link.
  // This is a simplified example. In a real scenario, you might get this from useDocs() or a global config.
  // const editUrl = props.editUrl; // If editUrl is passed down through Props

  return (
    // The main wrapper, Docusaurus applies sticky positioning to its parent (.theme-doc-toc- योग)
    // Our styles.tocWrapper will manage the internal flex layout
    <div className={clsx(styles.tocWrapper, 'thin-scrollbar', className)}> {/* Added 'thin-scrollbar' from original */}
      <div className={styles.tocContent}>
        {/* "On this page" title */}
        <p className={clsx(styles.tocTitle)}>On this page</p>

        {/* TOC Items */}
        {hasTOCItems ? (
          <TOCItems
            {...props} // Passes 'toc', 'minHeadingLevel', 'maxHeadingLevel'
            linkClassName={LINK_CLASS_NAME}
            linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
            // className={styles.tocItemList} // Optional: If you need to style the UL directly from here
          />
        ) : (
          <p className={styles.tocEmpty}>No headings on this page.</p>
        )}
      </div>

      {/* Bottom Sticky Links */}
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