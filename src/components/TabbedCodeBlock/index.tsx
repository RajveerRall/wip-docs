// src/components/EasyTabbedCode/index.tsx
// NO CHANGES NEEDED from the previous full Headless UI version.
// For reference, it should look like this:
import React, { useState, Fragment } from 'react';
import { Tab as HeadlessTab } from '@headlessui/react';
import CodeBlock from '@theme/CodeBlock';
import styles from './TabbedCodeBlock.module.css';
import { MdContentCopy, MdCheck } from 'react-icons/md';

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

  const handleCopyCode = async () => {
    if (codes.length === 0 || currentSelectedIndex < 0 || currentSelectedIndex >= codes.length) return;
    const codeToCopy = codes[currentSelectedIndex].code;
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

  const handleTabChange = (index: number) => {
    setCurrentSelectedIndex(index);
    setCopyStatus('idle');
    if (onSelectProp) {
      onSelectProp(index);
    }
  };

  return (
    <div className={styles.wrapper}>
      <HeadlessTab.Group defaultIndex={validDefaultIndex} onChange={handleTabChange}>
        <div className={styles.tabListContainer}>
          <HeadlessTab.List className={styles.tabList}>
            {codes.map((codeInfo) => (
              <HeadlessTab key={codeInfo.value} as={Fragment}>
                {/* {({ selected }) => ( // `selected` prop not strictly needed if relying on aria-selected for CSS */}
                  <li
                    className={styles.tab}
                    // Headless UI adds aria-selected="true/false" which styles.tab[aria-selected="true"] uses
                  >
                    {codeInfo.label}
                  </li>
                {/* )} */}
              </HeadlessTab>
            ))}
          </HeadlessTab.List>
          <button
            type="button"
            className={styles.customCopyButton}
            onClick={handleCopyCode}
            aria-label={copyStatus === 'copied' ? 'Code copied' : 'Copy code'}
          >
            {copyStatus === 'copied' ? <MdCheck /> : <MdContentCopy />}
          </button>
        </div>

        <HeadlessTab.Panels>
          {codes.map((codeInfo) => (
            <HeadlessTab.Panel key={codeInfo.value} className={styles.tabPanel} unmount={false}>
              <CodeBlock
                language={codeInfo.language}
                showLineNumbers={codeInfo.showLineNumbers ?? true}
                metastring={codeInfo.showLineNumbers !== false ? '{showLineNumbers}' : ''}
              >
                {codeInfo.code}
              </CodeBlock>
            </HeadlessTab.Panel>
          ))}
        </HeadlessTab.Panels>
      </HeadlessTab.Group>
    </div>
  );
};

export default TabbedsCodeBlock;