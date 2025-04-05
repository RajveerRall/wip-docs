

import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'CometChat Docs',
  tagline: 'Integrate real-time chat, voice, and video functionalities.',
  favicon: 'img/favicon.ico',

  url: 'https://www.cometchat.com',
    // This will use the BASE_URL env variable when available, or fall back to '/'
  baseUrl: process.env.BASE_URL || '/wip-docs/',

  organizationName: 'CometChat',
  projectName: 'cometchat-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  

  // Remove the themes array since these are already included in the presets
  // themes: ['@docusaurus/theme-classic', '@docusaurus/theme-search-algolia'],

  // presets: [
  //   [
  //     'classic',
  //     {
  //       docs: {
  //         sidebarPath: require.resolve('./sidebars.ts'),
  //         // lastVersion: 'current',
  //         // includeCurrentVersion: true, // Include the ./docs folder
  //         lastVersion: '2.0.0', // Set this to your latest version
  //         versions: {
  //           current: {
  //             label: 'Next',
  //             path: 'next',
  //           },
  //           '2.0.0': {
  //             label: '2.0.0',
  //             // No path means it will be the default (/docs)
  //           },
  //           '1.0.0': {
  //             label: '1.0.0',
  //             path: '1.0.0',
  //           },
  //         },
  //         // sidebarPath: './sidebars.ts',
  //         routeBasePath: '/', // Set routeBasePath to '/' since docs are the main content
  //         editUrl: 'https://github.com/cometchat/cometchat-docs/edit/main/',
  //       },
  //       blog: false,
  //       theme: {
  //         customCss: './src/css/custom.css',
  //       },
  //     } satisfies Preset.Options,
  //   ],
  // ],


  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),
          id: 'default',
          lastVersion: 'current', // Set the current version as the last (stable) version
          versions: {
            current: {
              label: 'Latest', // You can adjust this label if needed
              path: '', // Empty path makes it the default route
              banner: 'none',
            },
            '2.0.0': {
              label: '2.0.0',
              path: '2.0.0', // Explicitly define path for the previous version
            },
            '1.0.0': {
              label: '1.0.0',
              path: '1.0.0',
            },
          },
          routeBasePath: '/', // Keeps docs as the main content
          editUrl: 'https://github.com/cometchat/cometchat-docs/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    // Add color mode settings
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    image: 'img/cometchat-social-card.jpg',

    navbar:{
      logo: {
      href: "/",
      src: "/imgs/logo.svg",
      srcDark: "/imgs/logo.svg",
      alt: "Logo",
      width: "150px",
    },

  },
    
    // Algolia DocSearch configuration
    algolia: {
      appId: '6RW3CISVKU',
      apiKey: 'ca85d17c2b7e887b2f084d22e25807cf',
      indexName: 'cometchat',
      contextualSearch: true,
      searchPagePath: 'search',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'kotlin', 'swift', 'typescript', 'bash'],
    },
  } satisfies Preset.ThemeConfig,

  // Configure static directories
  staticDirectories: ['static'],
  

  // Keep plugins array clean
  // Add plugins for additional versioned documentation
  plugins: [

  ],
};


export default config;

// export default {
//   title: 'CometChat Docs',
//   url: 'https://rajveerrall.github.io',
//   baseUrl: '/wip-docs/',
//   // Keep any existing configuration below
//   favicon: 'img/favicon.ico',
//   organizationName: 'RajveerRall',
//   projectName: 'wip-docs',
//   onBrokenLinks: 'throw',
//   onBrokenMarkdownLinks: 'warn',
//   i18n: { ... },
//   themes: [ ... ],
//   presets: [ ... ],
//   themeConfig: { ... },
//   plugins: [ ... ],
//   // ... any other existing config options
// };