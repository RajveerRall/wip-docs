// src/components/FrameworkGrid.tsx
import React from 'react';
import FrameworkCard from './framework-card';
import styles from './FrameworkGrid.module.css';

// Define the Framework interface
export interface Framework {
  id: string;
  title: string;
  version: string;
  icon: string;
  link: string;
}

// Define props interface for FrameworkGrid component
export interface FrameworkGridProps {
  title: string;
  description: string;
  frameworks: Framework[];
}

export default function FrameworkGrid({ 
  title, 
  description, 
  frameworks 
}: FrameworkGridProps): React.ReactElement {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <p className={styles.sectionDescription}>{description}</p>
      
      <div className={styles.grid}>
        {frameworks.map((framework) => (
          <FrameworkCard
            key={framework.id}
            icon={framework.icon}
            title={framework.title}
            version={framework.version}
            link={framework.link}
          />
        ))}
      </div>
    </div>
  );
}