// src/components/FrameworkCard.tsx
import React from 'react';
import Link from '@docusaurus/Link';
import styles from '../components/FrameworkGrid.module.css';

interface FrameworkCardProps {
  icon: string;
  title: string;
  version: string;
  link: string;
}

export default function FrameworkCard({ 
  icon, 
  title, 
  version, 
  link 
}: FrameworkCardProps): React.ReactElement {
  return (
    <Link to={link} className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.iconContainer}>
          <img src={icon} alt={`${title} icon`} className={styles.icon} />
        </div>
        <div className={styles.cardContent}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.version}>v{version}</div>
        </div>
      </div>
    </Link>
  );
}
