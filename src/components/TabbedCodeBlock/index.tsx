// src/components/EasyTabbedCode/index.tsx
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CodeBlock from '@theme/CodeBlock';
import styles from './TabbedCodeBlock.module.css'; // Using this filename as per your component
import { MdContentCopy, MdCheck } from 'react-icons/md'; // Import react-icons

type CodeInfo = {
  label: string;
  value: string;
  language: string;
  code: string;
  title?: string;
  showLineNumbers?: boolean;
};

type Props = {
  codes: CodeInfo[];
  defaultTabIndex?: number;
  onSelect?: (index: number, lastIndex: number, event: Event) => boolean | void;
};

const TabbedsCodeBlock: React.FC<Props> = ({
  codes = [],
  defaultTabIndex = 0,
  onSelect: onSelectProp, // Renamed to avoid conflict with internal state/handler
}) => {
  if (!codes || codes.length === 0) {
    return null;
  }

  const validDefaultIndex = defaultTabIndex >= 0 && defaultTabIndex < codes.length
                            ? defaultTabIndex
                            : 0;

  const [selectedIndex, setSelectedIndex] = React.useState(validDefaultIndex);
  const [copyStatus, setCopyStatus] = React.useState<'idle' | 'copied' | 'failed'>('idle');

  const handleCopyCode = async () => {
    if (codes.length === 0 || selectedIndex < 0 || selectedIndex >= codes.length) return;
    const codeToCopy = codes[selectedIndex].code;
    try {
      await navigator.clipboard.writeText(codeToCopy);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
      setCopyStatus('failed');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  const handleTabSelect = (index: number, lastIndex: number, event: Event) => {
    setSelectedIndex(index);
    setCopyStatus('idle');
    if (onSelectProp) {
      return onSelectProp(index, lastIndex, event);
    }
    return true;
  };

  return (
    <div className={styles.wrapper}>
      <Tabs
        className={styles.tabsContainer} // Hook for potential container styling
        defaultIndex={validDefaultIndex}
        onSelect={handleTabSelect} // Use our internal handler
      >
        {/* New container for TabList and Copy Button */}
        <div className={styles.tabListContainer}>
          <TabList className={styles.tabList}>
            {codes.map((codeInfo) => (
              <Tab key={codeInfo.value} className={styles.tab}>
                {codeInfo.label}
              </Tab>
            ))}
          </TabList>
          {/* Custom Copy Button using react-icons */}
          <button
            type="button"
            className={styles.customCopyButton}
            onClick={handleCopyCode}
            aria-label={copyStatus === 'copied' ? 'Code copied' : 'Copy code'}
          >
            {copyStatus === 'copied' ? <MdCheck /> : <MdContentCopy />}
          </button>
        </div>

        {codes.map((codeInfo) => (
          <TabPanel key={codeInfo.value} className={styles.tabPanel}>
            <CodeBlock
              language={codeInfo.language}
              // Use the showLineNumbers logic from your original component
              showLineNumbers={codeInfo.showLineNumbers ?? true}
              metastring={codeInfo.showLineNumbers !== false ? '{showLineNumbers}' : ''}
            >
              {codeInfo.code}
            </CodeBlock>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default TabbedsCodeBlock;