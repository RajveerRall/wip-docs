// src/components/ResponsiveComponentSwitcher.tsx
import React from 'react';
import { useWindowSize } from '@docusaurus/theme-common/internal'; // Standard Docusaurus hook

// Define the props for the switcher component
interface ResponsiveComponentSwitcherProps {
  /** Component to render on mobile screens */
  MobileComponent: React.ElementType;
  /** Component to render on desktop screens */
  DesktopComponent: React.ElementType;
  /** Optional: Component props to pass down */
  componentProps?: Record<string, any>;
  /** Optional: Define what to render during SSR. 'desktop' or 'mobile' or null */
  ssrDefault?: 'desktop' | 'mobile' | null;
}

export default function ResponsiveComponentSwitcher({
  MobileComponent,
  DesktopComponent,
  componentProps = {},
  ssrDefault = null, // Default to rendering nothing during SSR to prevent layout shifts
}: ResponsiveComponentSwitcherProps): React.ReactElement | null {

  const windowSize = useWindowSize(); // Returns 'desktop', 'mobile', or 'ssr'

  // Determine if we are effectively on a mobile screen size
  // Docusaurus's definition of 'mobile' is usually <= 996px
  const isMobile = windowSize === 'mobile';

  // Handle Server-Side Rendering (SSR) case
  if (windowSize === 'ssr') {
    switch (ssrDefault) {
      case 'desktop':
        return <DesktopComponent {...componentProps} />;
      case 'mobile':
        return <MobileComponent {...componentProps} />;
      default:
        // Render nothing on the server by default.
        // The correct component will render immediately on client-side hydration.
        // This is often the safest option to avoid hydration mismatches/layout shifts.
        return null;
    }
  }

  // Render the appropriate component based on the client-side window size
  return isMobile ? (
    <MobileComponent {...componentProps} />
  ) : (
    <DesktopComponent {...componentProps} />
  );
}