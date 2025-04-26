// src/components/EasyTabbedCode/index.tsx
import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import styles from './TabbedCodeBlock.module.css'; // CSS for styling

// Define the structure for each code snippet/tab passed via props
type CodeInfo = {
  label: string;           // Tab label (e.g., "TypeScript")
  value: string;           // Unique tab identifier (e.g., "ts")
  language: string;        // Language for syntax highlighting (e.g., "tsx")
  code: string;            // The actual code string (passed directly)
  title?: string;          // Optional title for the code block itself
  showLineNumbers?: boolean; // Optional line numbers flag (defaults to true below)
};

// Define the props for the main component
type Props = {
  /** Array of objects, each defining a tab and its code */
  codes: CodeInfo[];
  /** Optional value of the default tab */
  defaultTabValue?: string;
  /** Optional groupId for tab synchronization */
  groupId?: string;
};

/**
 * A reusable component to display code snippets (passed directly as props)
 * in a styled, tabbed interface.
 */
const TabbedCodeBlock: React.FC<Props> = ({ codes = [], defaultTabValue, groupId }) => {
  // Determine the default tab value
  const validDefaultValue = defaultTabValue && codes.some(c => c.value === defaultTabValue)
                            ? defaultTabValue
                            : codes[0]?.value; // Fallback safely

  if (!codes || codes.length === 0) {
    return null; // Render nothing if no code info is provided
  }

  return (
    // Apply the custom wrapper class for overall styling
    <div className={styles.easyTabbedCodeWrapper}>
      <Tabs defaultValue={validDefaultValue} groupId={groupId}>
        {codes.map((codeInfo) => (
          <TabItem key={codeInfo.value} value={codeInfo.value} label={codeInfo.label}>
            {/* Use the themed CodeBlock component */}
            <CodeBlock
              language={codeInfo.language}
              showLineNumbers={codeInfo.showLineNumbers ?? true} // Default to true
              metastring={codeInfo.showLineNumbers ?? true ? '{showLineNumbers}' : ''}
            >
              {codeInfo.code} {/* Pass the code string */}
            </CodeBlock>
          </TabItem>
        ))}
      </Tabs>
    </div>
  );
};

export default TabbedCodeBlock;