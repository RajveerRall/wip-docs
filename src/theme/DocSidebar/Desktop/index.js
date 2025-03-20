// src/theme/DocSidebar/Desktop/index.js
import React from 'react';
import OriginalDocSidebarDesktop from '@theme-original/DocSidebar/Desktop';
import CustomSidebar from '@site/src/components/CustomSidebar';
import styles from './styles.module.css';

function DocSidebarDesktopWrapper(props) {
  return (
    <div className={styles.sidebarWrapper}>
      <CustomSidebar />
      <OriginalDocSidebarDesktop {...props} />
    </div>
  );
}

export default DocSidebarDesktopWrapper;