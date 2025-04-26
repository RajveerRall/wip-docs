// src/components/CodeBadge/index.tsx
import React, { type ReactNode } from 'react';
import styles from './CodeBadge.module.css'; // We'll create this next

type Props = {
  children: ReactNode; // The code string will be passed as children
};

/**
 * A component to render inline code snippets with a badge-like appearance.
 */
const CodeBadge: React.FC<Props> = ({ children }) => {
  return (
    <code className={styles.codeBadge}>
      {children}
    </code>
  );
};

export default CodeBadge;