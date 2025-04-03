import React from "react";
import Link from "@docusaurus/Link";
import styles from "./apiCard.module.css";

interface ApiCardProps {
  title: string;
  description: string;
  learnMoreLink: string;
}

const ApiCard: React.FC<ApiCardProps> = ({
  title,
  description,
  learnMoreLink,
}) => {
  return (
    <div className={styles.apiCard}>
      <h3 className={styles.apiCardTitle}>{title}</h3>
      <p className={styles.apiCardDescription}>{description}</p>
      <div className={styles.apiCardFooter}>
        <Link to={learnMoreLink} className={styles.learnMoreButton}>
          Learn More
        </Link>
      </div>
    </div>
  );
};

interface ApiCardsRowProps {
  className?: string;
}

const ApiCardsRow: React.FC<ApiCardsRowProps> = ({ className }) => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.apiCardsContainer}>
        <ApiCard
          title="Chat APIs"
          description="Connect CometChat with your app and programmatically manage users, groups and conversations with our Chat APIs."
          learnMoreLink="/docs/chat-apis"
        />
        <ApiCard
          title="Management APIs"
          description="Create and manage your CometChat apps, trigger webhooks and access dashboard features with our Management APIs."
          learnMoreLink="/docs/management-apis"
        />
      </div>
    </section>
  );
};

export default ApiCardsRow;
