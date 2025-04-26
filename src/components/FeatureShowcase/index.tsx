// src/components/FeatureShowcase/index.tsx
// (Contains the <div className={styles.featureGrid}>)
// (Renders {children} inside the grid div)

import React, { type ReactNode } from 'react';
import styles from './FeatureShowcase.module.css';

type Props = {
  children: ReactNode; // Accepts children
};

export default function FeatureShowcase({ children }: Props): JSX.Element {
  return (
    <section className={styles.showcaseSection}>
      {/* Grid container */}
      <div className={styles.featureGrid}>
        {children} {/* Render the FeatureCards passed in */}
      </div>
    </section>
  );
}