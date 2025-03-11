declare module '@docusaurus/Link' {
    import type { ComponentProps } from 'react';
    export type LinkProps = ComponentProps<'a'> & {
      to?: string;
      activeClassName?: string;
      isNavLink?: boolean;
      exact?: boolean;
    };
    export default function Link(props: LinkProps): JSX.Element;
  }
  
  declare module '@docusaurus/useBaseUrl' {
    export default function useBaseUrl(url: string, options?: { absolute: boolean }): string;
  }
  
  declare module '@docusaurus/useDocusaurusContext' {
    export interface DocusaurusContext {
      siteConfig: {
        title: string;
        tagline: string;
        url: string;
        baseUrl: string;
        favicon: string;
        organizationName: string;
        projectName: string;
        customFields?: Record<string, any>;
        themeConfig: Record<string, any>;
        // Add any other properties your site config has
      };
    }
    export default function useDocusaurusContext(): DocusaurusContext;
  }
  
  declare module '@theme/Layout' {
    import type { ReactNode } from 'react';
    export interface Props {
      children: ReactNode;
      title?: string;
      description?: string;
      noFooter?: boolean;
      wrapperClassName?: string;
    }
    export default function Layout(props: Props): JSX.Element;
  }