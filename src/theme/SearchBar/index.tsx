// src/theme/SearchBar/index.tsx
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  forwardRef,
} from 'react';
import {createPortal} from 'react-dom';
import {useDocSearchKeyboardEvents} from '@docsearch/react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import {
  isRegexpStringMatch,
  useSearchLinkCreator,
} from '@docusaurus/theme-common';
import {
  useAlgoliaContextualFacetFilters,
  useSearchResultUrlProcessor,
} from '@docusaurus/theme-search-algolia/client';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import globalTranslations from '@theme/SearchTranslations';
import type {
  InternalDocSearchHit,
  DocSearchModal as DocSearchModalType,
  DocSearchModalProps,
  StoredDocSearchHit,
  DocSearchTransformClient,
  DocSearchHit,
  DocSearchButtonProps as OriginalDocSearchButtonProps,
} from '@docsearch/react';
import { ImSearch } from "react-icons/im";
import type {AutocompleteState} from '@algolia/autocomplete-core';
import type {FacetFilters} from 'algoliasearch/lite';

// Import your custom styles
import './styles.css';


// --- Start of Custom/Local Components ---

// Local Magnifying Glass Icon
function DocSearchMagnifyingGlassIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" className="DocSearch-Search-Icon">
      <path
        d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
        stroke="currentColor" // Will be styled by CSS color
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface CustomDocSearchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  translations: OriginalDocSearchButtonProps['translations'];
}

// Custom DocSearchButton with a custom "settings" icon at the end
const CustomDocSearchButton = forwardRef<HTMLButtonElement, CustomDocSearchButtonProps>(
  (props, ref) => {
    const { translations, ...restProps } = props;


    return (
      <button
        type="button"
        className="DocSearch-Button" // Main search bar container
        aria-label={translations?.buttonAriaLabel ?? 'Search'}
        ref={ref}
        {...restProps} // onClick (for opening modal), onFocus, onMouseOver etc.
      >
        {/* <DocSearchMagnifyingGlassIcon /> */}
        <ImSearch className='doc-search-icon'/>

        <span className="DocSearch-Button-Placeholder">
          {'Search docs...'}
        </span>

        {/* CUSTOM SETTINGS ICON BUTTON AT THE END */}
        <div className="MyCustomEndElementContainer">
          ⌘ K
        </div>
      </button>
    );
  },
);
CustomDocSearchButton.displayName = 'CustomDocSearchButton';

// --- End of Custom/Local Components ---


type DocSearchProps = Omit<
  DocSearchModalProps,
  'onClose' | 'initialScrollY'
> & {
  contextualSearch?: string;
  externalUrlRegex?: string;
  searchPagePath: boolean | string;
};

let DocSearchModal: typeof DocSearchModalType | null = null;

function importDocSearchModalIfNeeded() {
  if (DocSearchModal) {
    return Promise.resolve();
  }
  return Promise.all([
    import('@docsearch/react/modal') as Promise<
      typeof import('@docsearch/react')
    >,
    import('@docsearch/react/style'),
  ]).then(([{DocSearchModal: Modal}]) => {
    DocSearchModal = Modal;
  });
}

function useNavigator({
  externalUrlRegex,
}: Pick<DocSearchProps, 'externalUrlRegex'>) {
  const history = useHistory();
  const [navigator] = useState<DocSearchModalProps['navigator']>(() => {
    return {
      navigate(params) {
        if (isRegexpStringMatch(externalUrlRegex, params.itemUrl)) {
          window.location.href = params.itemUrl;
        } else {
          history.push(params.itemUrl);
        }
      },
    };
  });
  return navigator;
}

function useTransformSearchClient(): DocSearchModalProps['transformSearchClient'] {
  const {
    siteMetadata: {docusaurusVersion},
  } = useDocusaurusContext();
  return useCallback(
    (searchClient: DocSearchTransformClient) => {
      searchClient.addAlgoliaAgent('docusaurus', docusaurusVersion);
      return searchClient;
    },
    [docusaurusVersion],
  );
}

function useTransformItems(props: Pick<DocSearchProps, 'transformItems'>) {
  const processSearchResultUrl = useSearchResultUrlProcessor();
  const [transformItems] = useState<DocSearchModalProps['transformItems']>(
    () => {
      return (items: DocSearchHit[]) =>
        props.transformItems
          ? props.transformItems(items)
          : items.map((item) => ({
              ...item,
              url: processSearchResultUrl(item.url),
            }));
    },
  );
  return transformItems;
}

function useResultsFooterComponent({
  closeModal,
}: {
  closeModal: () => void;
}): DocSearchProps['resultsFooterComponent'] {
  return useMemo(
    () =>
      ({state}) =>
        <ResultsFooter state={state} onClose={closeModal} />,
    [closeModal],
  );
}

function Hit({
  hit,
  children,
}: {
  hit: InternalDocSearchHit | StoredDocSearchHit;
  children: React.ReactNode;
}) {
  return <Link to={hit.url}>{children}</Link>;
}

type ResultsFooterProps = {
  state: AutocompleteState<InternalDocSearchHit>;
  onClose: () => void;
};

function ResultsFooter({state, onClose}: ResultsFooterProps) {
  const createSearchLink = useSearchLinkCreator();

  return (
    <Link to={createSearchLink(state.query)} onClick={onClose}>
      <Translate
        id="theme.SearchBar.seeAll"
        values={{count: state.context.nbHits}}>
        {'See all {count} results'}
      </Translate>
    </Link>
  );
}

function useSearchParameters({
  contextualSearch,
  ...props
}: DocSearchProps): DocSearchProps['searchParameters'] {
  function mergeFacetFilters(f1: FacetFilters, f2: FacetFilters): FacetFilters {
    const normalize = (f: FacetFilters): FacetFilters =>
      typeof f === 'string' ? [f] : f;
    return [...normalize(f1), ...normalize(f2)];
  }

  const contextualSearchFacetFilters =
    useAlgoliaContextualFacetFilters() as FacetFilters;

  const configFacetFilters: FacetFilters =
    props.searchParameters?.facetFilters ?? [];

  const facetFilters: FacetFilters = contextualSearch
    ? mergeFacetFilters(contextualSearchFacetFilters, configFacetFilters)
    : configFacetFilters;

  return {
    ...props.searchParameters,
    facetFilters,
  };
}


function DocSearch({externalUrlRegex, ...props}: DocSearchProps) {
  const navigator = useNavigator({externalUrlRegex});
  const searchParameters = useSearchParameters({...props});
  const transformItems = useTransformItems(props);
  const transformSearchClient = useTransformSearchClient();

  const searchContainer = useRef<HTMLDivElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null as any);
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState<string | undefined>(
    undefined,
  );

  const prepareSearchContainer = useCallback(() => {
    if (!searchContainer.current) {
      const divElement = document.createElement('div');
      searchContainer.current = divElement;
      document.body.insertBefore(divElement, document.body.firstChild);
    }
  }, []);

  const openModal = useCallback(() => {
    prepareSearchContainer();
    importDocSearchModalIfNeeded().then(() => setIsOpen(true));
  }, [prepareSearchContainer]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    searchButtonRef.current?.focus();
    setInitialQuery(undefined);
  }, []);

  const handleInput = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'f' && (event.metaKey || event.ctrlKey)) {
        return;
      }
      event.preventDefault();
      setInitialQuery(event.key);
      openModal();
    },
    [openModal],
  );

  const resultsFooterComponent = useResultsFooterComponent({closeModal});

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen: openModal,
    onClose: closeModal,
    onInput: handleInput,
    searchButtonRef,
  });

  return (
    <>
      <Head>
        <link
          rel="preconnect"
          href={`https://${props.appId}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
      </Head>
      <CustomDocSearchButton
        onTouchStart={importDocSearchModalIfNeeded}
        onFocus={importDocSearchModalIfNeeded}
        onMouseOver={importDocSearchModalIfNeeded}
        onClick={openModal} // This onClick opens the DocSearch modal
        ref={searchButtonRef}
        translations={props.translations?.button ?? globalTranslations.button}
      />
      {isOpen &&
        DocSearchModal &&
        searchContainer.current &&
        createPortal(
          <DocSearchModal
            onClose={closeModal}
            initialScrollY={window.scrollY}
            initialQuery={initialQuery}
            navigator={navigator}
            transformItems={transformItems}
            hitComponent={Hit}
            transformSearchClient={transformSearchClient}
            {...(props.searchPagePath && {
              resultsFooterComponent,
            })}
            placeholder={globalTranslations.placeholder}
            {...props}
            translations={props.translations?.modal ?? globalTranslations.modal}
            searchParameters={searchParameters}
          />,
          searchContainer.current,
        )}
    </>
  );
}

export default function SearchBar(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const algoliaConfig = siteConfig.themeConfig.algolia as DocSearchProps & { translations?: { button?: any, modal?: any } };
  return <DocSearch {...algoliaConfig} />;
}