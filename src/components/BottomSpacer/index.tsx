// src/components/BottomSpacer.tsx
import React from 'react';
import PropTypes from 'prop-types'; // You can use this for prop types in TSX if you prefer

interface BottomSpacerProps {
  /**
   * The amount of vertical space to create.
   * Can be a number (interpreted as pixels) or a string (e.g., '2rem', '48px').
   * Defaults to '48px'.
   */
  spacing?: string | number;
  /**
   * If true, shows a visual aid (background/border) for easy debugging.
   * Defaults to false.
   */
  debug?: boolean;
}

const BottomSpacer: React.FC<BottomSpacerProps> = ({
  spacing = '48px', // Default spacing
  debug = false,    // Default debug state
}) => {
  // This console log is helpful for debugging to see when it renders and with what props
  // You can remove it once you're confident it's working.
  // console.log(`[BottomSpacer.tsx] Rendering with spacing: ${spacing}, debug: ${debug}`);

  const spacerStyle: React.CSSProperties = {
    height: typeof spacing === 'number' ? `${spacing}px` : spacing,
    width: '100%', // Ensures it takes up horizontal space
    display: 'block', // Behaves like a standard block
    backgroundColor: debug ? 'rgba(255, 0, 0, 0.2)' : 'transparent', // Light red for debug
    border: debug ? '1px dashed blue' : 'none', // Blue dashed border for debug
  };

  // aria-hidden="true" because it's purely for visual spacing and provides no content
  return <div style={spacerStyle} aria-hidden="true" />;
};

// If you want to use PropTypes alongside TypeScript interfaces (optional, but some prefer it for runtime checks or JS interop)
// BottomSpacer.propTypes = {
//   spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   debug: PropTypes.bool,
// };

export default BottomSpacer;