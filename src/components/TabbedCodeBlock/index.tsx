// src/components/EasyTabbedCode/index.tsx
import React from 'react';
// Use react-tabs for the tabbing mechanism
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// Still use Docusaurus CodeBlock for rendering
import CodeBlock from '@theme/CodeBlock';
// Import the new CSS module for react-tabs styling
import styles from './TabbedCodeBlock.module.css';

// Define the structure for each code snippet/tab passed via props (same as before)
type CodeInfo = {
  label: string;           // Tab label (e.g., "TypeScript")
  value: string;           // Unique value (used for key, maybe future controlled mode)
  language: string;        // Language for syntax highlighting (e.g., "tsx")
  code: string;            // The actual code string
  title?: string;          // Optional title for the code block itself
  showLineNumbers?: boolean; // Optional line numbers flag
};

// Define the props for the main component
type Props = {
  /** Array of objects, each defining a tab and its code */
  codes: CodeInfo[];
  /** Optional 0-based index of the default tab */
  defaultTabIndex?: number;
  /** Optional callback when tab changes */
  onSelect?: (index: number, lastIndex: number, event: Event) => boolean | void;
};

/**
 * A reusable component using react-tabs to display code snippets
 * styled to match the target design, using Docusaurus CodeBlock for content.
 */
const TabbedsCodeBlock: React.FC<Props> = ({
  codes = [],
  defaultTabIndex = 0, // Default to the first tab (index 0)
  onSelect,
}) => {

  if (!codes || codes.length === 0) {
    return null; // Render nothing if no code info is provided
  }

  // Ensure defaultTabIndex is valid
  const validDefaultIndex = defaultTabIndex >= 0 && defaultTabIndex < codes.length
                            ? defaultTabIndex
                            : 0;

  return (
    // Apply the main wrapper class for overall styling (background, border-radius)
    <div className={styles.wrapper}>
      <Tabs
        className={styles.tabsContainer} // Hook for potential container styling
        defaultIndex={validDefaultIndex}
        onSelect={onSelect}
        // selectedTabClassName={styles.selectedTab} // Use attribute selector instead
        // selectedTabPanelClassName={styles.selectedTabPanel} // Use default behavior
      >
        <TabList className={styles.tabList}>
          {codes.map((codeInfo) => (
            <Tab key={codeInfo.value} className={styles.tab}>
              {codeInfo.label}
            </Tab>
          ))}
        </TabList>

        {codes.map((codeInfo) => (
          <TabPanel key={codeInfo.value} className={styles.tabPanel}>
            {/* Use the themed Docusaurus CodeBlock */}
            <CodeBlock
              language={codeInfo.language}
              showLineNumbers={codeInfo.showLineNumbers ?? true} // Default false unless specified
              metastring={codeInfo.showLineNumbers ? '{showLineNumbers}' : ''} // Control line numbers via metastring
              
            >
              {codeInfo.code} {/* Pass the code string */}
            </CodeBlock>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default TabbedsCodeBlock; // Export the new component name