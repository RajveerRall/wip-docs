import React, { type ReactNode, useRef, useEffect } from 'react';
import OriginalSearch from '@theme-original/Navbar/Search'; // Rename to avoid conflict
import type SearchType from '@theme/Navbar/Search';
import type { WrapperProps } from '@docusaurus/types';
import { FiSearch } from 'react-icons/fi'; // Import the icon
import styles from './styles.module.css'; // Import CSS module

type Props = WrapperProps<typeof SearchType>;

export default function SearchWrapper(props: Props): ReactNode {
  // Ref for the container holding the original search component
  const originalSearchRef = useRef<HTMLDivElement>(null);

  // Function to trigger the click on the *actual* search button
  // rendered by the original component.
  const triggerOriginalSearchClick = () => {
    // Find the button element within the original component's rendered output.
    // The selector might need adjustment depending on the exact structure
    // rendered by @theme-original/Navbar/Search. Inspect in browser dev tools!
    const originalButton = originalSearchRef.current?.querySelector('button');
    if (originalButton) {
      originalButton.click();
    } else {
      console.warn('Could not find the original search button to click.');
      // Fallback: Maybe the container itself is clickable? (Less likely)
      // originalSearchRef.current?.click();
    }
  };

  return (
    <>
      {/* Your custom button */}
      <button
        type="button"
        aria-label="Search" // Accessibility
        className={styles.searchButton}
        onClick={triggerOriginalSearchClick} // Click handler
      >
        <FiSearch className={styles.searchIcon} />
        <span className={styles.searchPlaceholder}>Search docs...</span>
        <kbd className={styles.searchShortcut}>
          <span aria-label="Command" className={styles.searchShortcutCmd}>⌘</span>
          <span>K</span>
        </kbd>
      </button>

      {/* Render the original component in a way that its button is hidden */}
      {/* but its modal logic remains functional */}
      <div className={styles.hiddenOriginalSearch} ref={originalSearchRef}>
        <OriginalSearch {...props} />
      </div>
    </>
  );
}