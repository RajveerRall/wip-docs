import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import clsx from 'clsx';
import { FiSun, FiMoon } from 'react-icons/fi';

import styles from './themeToggle.module.css';

export default function ThemeToggle(): JSX.Element {
  const { colorMode, setColorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';

  const toggleTheme = () => {
    setColorMode(isDarkTheme ? 'light' : 'dark');
  };

  // Colors for the icons permanently in the background track
  const backgroundSunColor = 'var(--icon-secondary)';
  const backgroundMoonColor = 'var(--icon-secondary)';

  // Color for the icon ON the sliding thumb (always primary)
  const activeIconColor = 'var(--icon-primary)';

  return (
    <button
      type="button"
      className={clsx(styles.toggleContainer, {
        [styles.darkMode]: isDarkTheme,
      })}
      onClick={toggleTheme}
      title={`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`}
      aria-live="polite"
    >
      {/* 1. Background Icons Wrapper (Static, Behind) */}
      <div className={styles.backgroundIconsWrapper}>
        <span className={clsx(styles.iconWrapper, styles.sunIcon)}>
          <FiSun size="18" style={{ color: backgroundSunColor }} />
        </span>
        <span className={clsx(styles.iconWrapper, styles.moonIcon)}>
          <FiMoon size="15" style={{ color: backgroundMoonColor }} />
        </span>
      </div>

      {/* 2. Sliding Thumb containing the ACTIVE icon */}
      <div className={styles.slidingIconThumb}>
        {isDarkTheme ? (
          <FiMoon size="15" style={{ color: activeIconColor }} />
        ) : (
          <FiSun size="18" style={{ color: activeIconColor }} />
        )}
      </div>
    </button>
  );
}