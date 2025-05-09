import React, { useState, type ReactNode } from 'react'; // <-- Import useState
import clsx from 'clsx';
import { useWindowSize } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '@theme/DocItem/Paginator';
// import DocVersionBanner from '@theme/DocVersionBanner';
// import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import ContentVisibility from '@theme/ContentVisibility';
import type { Props } from '@theme/DocItem/Layout';
import { MdOutlineContentCopy } from "react-icons/md";

import styles from './styles.module.css';

// --- (Keep useDocTOC function as is) ---
function useDocTOC() {
  const {frontMatter, toc} = useDoc();
  const windowSize = useWindowSize();
  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;
  const mobile = canRender ? <DocItemTOCMobile /> : undefined;
  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;
  return { hidden, mobile, desktop };
}
// --------------------------------------

export default function DocItemLayout({ children }: Props): ReactNode {
  const docTOC = useDocTOC();
  const { metadata } = useDoc(); // Get metadata including title

  // --- State for Copy Button text ---
  const [copyButtonText, setCopyButtonText] = useState('Copy Page');
  // -----------------------------------

  // --- Function to copy page URL ---
  const handleCopyPageUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(
      () => {
        setCopyButtonText('Copied!');
        setTimeout(() => {
          setCopyButtonText('Copy Page');
        }, 2000); // Reset after 2 seconds
      },
      (err) => {
        console.error('Failed to copy URL: ', err);
        setCopyButtonText('Copy Failed'); // Optional: indicate failure
         setTimeout(() => {
          setCopyButtonText('Copy Page');
        }, 2000);
      },
    );
  };
  // ---------------------------------

  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        <ContentVisibility metadata={metadata} />
        {/* <DocVersionBanner /> */}

        <div className={clsx(styles.docItemContainer, styles.docItemContainerWithTopMargin)}>
          <article>   
          <DocBreadcrumbs/>       

            {/* === CUSTOM TITLE AND COPY BUTTON AREA === */}
            <div className={styles.titleHeader}>
              <h1 className={styles.pageTitle}>{metadata.title}</h1>
              <button
                type="button"
                className={styles.copyPageButton}
                onClick={handleCopyPageUrl}
                aria-label="Copy page URL"
              >
                <MdOutlineContentCopy className={styles.copyIcon} />
                <span>{copyButtonText}</span>
              </button>
            </div>
            {/* ========================================= */}

            {docTOC.mobile}

            {/* IMPORTANT: Add a class to the wrapper around DocItemContent
                           so we can hide the H1 generated by markdown */}
            <div className={styles.mainContentWrapper}>
                <DocItemContent>{children}</DocItemContent>
            </div>

            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
    </div>
  );
}