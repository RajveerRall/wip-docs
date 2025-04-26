// src/theme/Admonition/Layout/index.tsx
// (Or wherever your AdmonitionLayout component resides)

import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import type {Props} from '@theme/Admonition/Layout';

import styles from './styles.module.css'; // Make sure this path is correct

// Keep AdmonitionContainer as is
function AdmonitionContainer({
  type,
  className,
  children,
}: Pick<Props, 'type' | 'className'> & {children: ReactNode}) {
  return (
    <div
      className={clsx(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(type),
        styles.admonition, // Keep this class for the main container
        className,
      )}>
      {children}
    </div>
  );
}

// No longer need AdmonitionHeading as a separate component here
// Keep AdmonitionContent as is
function AdmonitionContent({children}: Pick<Props, 'children'>) {
  // Render null if children is null/undefined/false etc.
  return children ? (
    <div className={styles.admonitionContent}>{children}</div>
  ) : null;
}

// *** MODIFIED AdmonitionLayout ***
export default function AdmonitionLayout(props: Props): ReactNode {
  const {type, icon, title, children, className} = props;

  return (
    <AdmonitionContainer type={type} className={className}>
      {/* Render the icon directly - it will be the first flex item */}
      <span className={styles.admonitionIcon}>{icon}</span>

      {/* Create a wrapper for the title and the main content */}
      <div className={`${styles.admonitionTextContent} text-body-2 font-regular`}>
        {/* Conditionally render the title *inside* the text wrapper */}
        {/* Render the main content */}
        <AdmonitionContent>{children}</AdmonitionContent>
      </div>
    </AdmonitionContainer>
  );
}