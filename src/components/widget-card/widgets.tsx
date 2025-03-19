import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './widgets.module.css';

export interface Widget {
  id: string;
  title: string;
  icon: string;
  link: string;
}

interface WidgetCardProps {
  widget: Widget;
}

export const WidgetCard: React.FC<WidgetCardProps> = ({ widget }) => {
  return (
    <Link to={widget.link} className={styles.widgetCard}>
      <img src={widget.icon} alt={widget.title} className={styles.widgetIcon} />
      <span className={styles.widgetTitle}>{widget.title}</span>
    </Link>
  );
};

interface WidgetsGridProps {
  title: string;
  description: string;
  widgets: Widget[];
}

const WidgetsGrid: React.FC<WidgetsGridProps> = ({ title, description, widgets }) => {
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <p className={styles.sectionDescription}>{description}</p>
      
      <div className={styles.widgetsContainer}>
        {widgets.map((widget) => (
          <WidgetCard key={widget.id} widget={widget} />
        ))}
      </div>
    </section>
  );
};

export default WidgetsGrid;