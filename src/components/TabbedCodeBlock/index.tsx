import React, { useState, useCallback } from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './TabbedCodeBlock.module.css';
import { MdContentCopy, MdCheck } from 'react-icons/md';

// Type definitions remain the same
type CodeInfo = {
  label: string;
  value: string; // Used as key
  language: string;
  code: string;
  title?: string;
  showLineNumbers?: boolean;
};

type Props = {
  codes: CodeInfo[];
  defaultTabIndex?: number;
  onSelect?: (index: number) => void;
};

const TabbedsCodeBlock: React.FC<Props> = ({
  codes = [],
  defaultTabIndex = 0,
  onSelect: onSelectProp,
}) => {
  if (!codes || codes.length === 0) {
    return null;
  }

  const validDefaultIndex =
    defaultTabIndex >= 0 && defaultTabIndex < codes.length
      ? defaultTabIndex
      : 0;

  const [currentSelectedIndex, setCurrentSelectedIndex] = useState(validDefaultIndex);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  const activeCodeInfo = codes[currentSelectedIndex];

  const handleCopyCode = useCallback(async () => {
    if (!activeCodeInfo) return;
    const codeToCopy = activeCodeInfo.code;
    try {
      await navigator.clipboard.writeText(codeToCopy);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
      setCopyStatus('failed');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  }, [activeCodeInfo]);

  const handleTabChange = useCallback((index: number) => {
    setCurrentSelectedIndex(index);
    setCopyStatus('idle');
    if (onSelectProp) {
      onSelectProp(index);
    }
  }, [onSelectProp]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabListContainer}>
        {/* Change <ul> to <div>, keep role="tablist" */}
        <div className={styles.tabList} role="tablist">
          {codes.map((codeInfo, index) => (
            // Change <li> to <div>, keep role="tab" and other attributes
            <div
              key={codeInfo.value}
              className={`${styles.tab} ${
                currentSelectedIndex === index ? styles.activeTab : ''
              }`}
              onClick={() => handleTabChange(index)}
              role="tab"
              aria-selected={currentSelectedIndex === index}
              aria-controls={`panel-${codeInfo.value}`}
              id={`tab-${codeInfo.value}`}
              tabIndex={0} // Make it focusable
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                   e.preventDefault(); // Prevent space bar scrolling
                   handleTabChange(index);
                }
              }}
            >
              {codeInfo.label}
            </div>
          ))}
        </div>
        <button
          type="button"
          className={styles.customCopyButton}
          onClick={handleCopyCode}
          aria-label={copyStatus === 'copied' ? 'Code copied' : 'Copy code to clipboard'}
          title={copyStatus === 'copied' ? 'Code copied' : 'Copy code to clipboard'}
        >
          {copyStatus === 'copied' ? <MdCheck /> : <MdContentCopy />}
        </button>
      </div>

      {activeCodeInfo && (
        <div
          className={styles.tabPanel}
          role="tabpanel"
          aria-labelledby={`tab-${activeCodeInfo.value}`}
          id={`panel-${activeCodeInfo.value}`}
        >
          <CodeBlock
            language={activeCodeInfo.language}
            showLineNumbers={activeCodeInfo.showLineNumbers ?? true}
            metastring={activeCodeInfo.showLineNumbers !== false ? '{showLineNumbers}' : ''}
          >
            {activeCodeInfo.code}
          </CodeBlock>
        </div>
      )}
    </div>
  );
};

export default TabbedsCodeBlock;