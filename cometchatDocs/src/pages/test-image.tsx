import React from 'react';

export default function TestImage(): React.ReactElement {
  return (
    <div>
      <h1>Test Image</h1>
      <img src="/img/frameworks/react-icon.svg" alt="React Icon" style={{ width: '100px', height: '100px' }} />
      
      {/* Try different path formats */}
      <img src="/img/frameworks/react-icon-svg.svg" alt="React Icon Alt Path" style={{ width: '100px', height: '100px' }} />
      
      {/* Try relative path */}
      <img src="../../static/img/frameworks/react-icon.svg" alt="React Icon Relative" style={{ width: '100px', height: '100px' }} />
    </div>
  );
}