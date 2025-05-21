// ExternalLink.tsx
import React from 'react';
import { FiExternalLink } from 'react-icons/fi'; // Import a suitable icon
import clsx from 'clsx'; // Optional: for easily combining class names

import styles from './ExternalLink.module.css'; // We'll create this CSS module next
import { GrFormNextLink } from "react-icons/gr";

// Define the props interface
interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  // 'href' is already part of AnchorHTMLAttributes but making it required for clarity
  href: string;
  children: React.ReactNode; // To pass the text or other elements
  iconSize?: number;        // Optional: to control icon size
  // className is also part of AnchorHTMLAttributes
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  children,
  href,
  className,
  iconSize = 16, // Default icon size
  target = "_blank",      // Default to opening in a new tab for external links
  rel = "noopener noreferrer", // Good practice for security and SEO with target="_blank"
  ...restAnchorProps      // Capture any other standard <a> props
}) => {
  return (
    <a
      href={href}
      className={clsx(styles.externalLink, className)} // Combine base style with user-provided classes
      target={target}
      rel={rel}
      {...restAnchorProps} // Spread any remaining anchor props
    >
      <span>{children}</span>
      <GrFormNextLink size={iconSize} className={styles.icon} aria-hidden="true" />
    </a>
  );
};

export default ExternalLink;