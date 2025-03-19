// // import {themes as prismThemes} from 'prism-react-renderer';
// // import type {Config} from '@docusaurus/types';
// // import type * as Preset from '@docusaurus/preset-classic';

// // // This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// // const config: Config = {
// //   title: 'My Site',
// //   tagline: 'Dinosaurs are cool',
// //   favicon: 'img/favicon.ico',

// //   // Set the production url of your site here
// //   url: 'https://your-docusaurus-site.example.com',
// //   // Set the /<baseUrl>/ pathname under which your site is served
// //   // For GitHub pages deployment, it is often '/<projectName>/'
// //   baseUrl: '/',

// //   // GitHub pages deployment config.
// //   // If you aren't using GitHub pages, you don't need these.
// //   organizationName: 'facebook', // Usually your GitHub org/user name.
// //   projectName: 'docusaurus', // Usually your repo name.

// //   onBrokenLinks: 'throw',
// //   onBrokenMarkdownLinks: 'warn',

// //   // Even if you don't use internationalization, you can use this field to set
// //   // useful metadata like html lang. For example, if your site is Chinese, you
// //   // may want to replace "en" with "zh-Hans".
// //   i18n: {
// //     defaultLocale: 'en',
// //     locales: ['en'],
// //   },

// //   presets: [
// //     [
// //       'classic',
// //       {
// //         docs: {
// //           sidebarPath: './sidebars.ts',
// //           // Please change this to your repo.
// //           // Remove this to remove the "edit this page" links.
// //           editUrl:
// //             'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
// //         },
// //         blog: {
// //           showReadingTime: true,
// //           feedOptions: {
// //             type: ['rss', 'atom'],
// //             xslt: true,
// //           },
// //           // Please change this to your repo.
// //           // Remove this to remove the "edit this page" links.
// //           editUrl:
// //             'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
// //           // Useful options to enforce blogging best practices
// //           onInlineTags: 'warn',
// //           onInlineAuthors: 'warn',
// //           onUntruncatedBlogPosts: 'warn',
// //         },
// //         theme: {
// //           customCss: './src/css/custom.css',
// //         },
// //       } satisfies Preset.Options,
// //     ],
// //   ],

// //   themeConfig: {
// //     // Replace with your project's social card
// //     image: 'img/docusaurus-social-card.jpg',
// //     navbar: {
// //       title: 'My Site',
// //       logo: {
// //         alt: 'My Site Logo',
// //         src: 'img/logo.svg',
// //       },
// //       items: [
// //         {
// //           type: 'docSidebar',
// //           sidebarId: 'tutorialSidebar',
// //           position: 'left',
// //           label: 'Tutorial',
// //         },
// //         {to: '/blog', label: 'Blog', position: 'left'},
// //         {
// //           href: 'https://github.com/facebook/docusaurus',
// //           label: 'GitHub',
// //           position: 'right',
// //         },
// //       ],
// //     },
// //     footer: {
// //       style: 'dark',
// //       links: [
// //         {
// //           title: 'Docs',
// //           items: [
// //             {
// //               label: 'Tutorial',
// //               to: '/docs/intro',
// //             },
// //           ],
// //         },
// //         {
// //           title: 'Community',
// //           items: [
// //             {
// //               label: 'Stack Overflow',
// //               href: 'https://stackoverflow.com/questions/tagged/docusaurus',
// //             },
// //             {
// //               label: 'Discord',
// //               href: 'https://discordapp.com/invite/docusaurus',
// //             },
// //             {
// //               label: 'X',
// //               href: 'https://x.com/docusaurus',
// //             },
// //           ],
// //         },
// //         {
// //           title: 'More',
// //           items: [
// //             {
// //               label: 'Blog',
// //               to: '/blog',
// //             },
// //             {
// //               label: 'GitHub',
// //               href: 'https://github.com/facebook/docusaurus',
// //             },
// //           ],
// //         },
// //       ],
// //       copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
// //     },
// //     prism: {
// //       theme: prismThemes.github,
// //       darkTheme: prismThemes.dracula,
// //     },
// //   } satisfies Preset.ThemeConfig,
// // };



// import {themes as prismThemes} from 'prism-react-renderer';
// import type {Config} from '@docusaurus/types';
// import type * as Preset from '@docusaurus/preset-classic';

// const config: Config = {
//   title: 'CometChat Docs', // Updated title
//   tagline: 'Integrate real-time chat, voice, and video functionalities.', // Updated tagline
//   favicon: 'img/favicon.ico', // Replace with the actual favicon

//   url: 'https://www.cometchat.com', // CometChat website URL
//   baseUrl: '/docs/', // Documentation is served under /docs/

//   organizationName: 'CometChat', // CometChat organization name
//   projectName: 'cometchat-docs', // Project name (can be customized)

//   onBrokenLinks: 'throw',
//   onBrokenMarkdownLinks: 'warn',

//   i18n: {
//     defaultLocale: 'en',
//     locales: ['en'],
//   },

//   presets: [
//     [
//       'classic',
//       {
//         docs: {
//           sidebarPath: './sidebars.ts',
//           routeBasePath: '/', // Set routeBasePath to the root path since documentation is served under /docs/
//           editUrl: 'https://github.com/cometchat/cometchat-docs/edit/main/', // Replace with actual link to the repository, if public
//         },
//         blog: false, // Assuming no blog is integrated into the doc site
//         theme: {
//           customCss: './src/css/custom.css',
//         },
//       } satisfies Preset.Options,
//     ],
//   ],

//   themeConfig: {
//     // Add color mode settings
//     colorMode: {
//       defaultMode: 'light',
//       disableSwitch: false,
//       respectPrefersColorScheme: true,
//     },
//     image: 'img/cometchat-social-card.jpg', // Replace with CometChat's social card image
    
//     // Add Algolia DocSearch configuration with your provided API details
//     algolia: {
//       appId: '6RW3CISVKU',
//       apiKey: 'ca85d17c2b7e887b2f084d22e25807cf',
//       indexName: 'cometchat', // You'll need to set this to your actual index name
//       contextualSearch: true,
//       searchPagePath: 'search',
//     },
    
//     navbar: {
//       title: 'cometchat docs', // lowercase to match the design
//       logo: {
//         alt: 'CometChat Logo',
//         src: 'img/logo.svg', // Replace with the path to the CometChat logo
//       },
//       items: [
//         {
//           type: 'dropdown',
//           label: 'Integrate',
//           position: 'left',
//           items: [
//             { label: 'Overview', to: '/integrate/overview' },
//             { label: 'Authentication', to: '/integrate/authentication' },
//             { label: 'Chat', to: '/integrate/chat' },
//             // Add more integrate options
//           ],
//         },
//         {
//           type: 'dropdown',
//           label: 'Platform',
//           position: 'left',
//           items: [
//             { label: 'Overview', to: '/platform/overview' },
//             { label: 'Pricing', to: '/platform/pricing' },
//             { label: 'API Reference', to: '/platform/api-reference' },
//             // Add more platform links here
//           ],
//         },
//         {
//           type: 'docSidebar',
//           sidebarId: 'tutorialSidebar',
//           position: 'left',
//           label: 'Docs',
//         },
//         // Algolia search bar is automatically added when using DocSearch
//         {
//           href: 'https://dashboard.cometchat.com/',
//           label: 'Dashboard',
//           position: 'right',
//         },
//         {
//           href: 'https://cometchat.com/support',
//           label: 'Contact Support',
//           position: 'right',
//           className: 'navbar-support-link', // Add a class for styling
//         },
//       ],
//     },
//     footer: {
//       style: 'light', // Change to light to match the design
//       links: [
//         {
//           title: 'Docs',
//           items: [
//             {
//               label: 'Get Started',
//               to: '/get-started',
//             },
//             {
//               label: 'UI Kits',
//               to: '/ui-kits',
//             },
//             {
//               label: 'SDKs',
//               to: '/sdks',
//             },
//           ],
//         },
//         {
//           title: 'Community',
//           items: [
//             {
//               label: 'Stack Overflow',
//               href: 'https://stackoverflow.com/questions/tagged/cometchat',
//             },
//             {
//               label: 'Discord',
//               href: 'https://discord.gg/cometchat', // Update with actual Discord link if available
//             },
//             {
//               label: 'Twitter',
//               href: 'https://twitter.com/cometchat',
//             },
//           ],
//         },
//         {
//           title: 'More',
//           items: [
//             {
//               label: 'CometChat Website',
//               href: 'https://cometchat.com',
//             },
//             {
//               label: 'Blog',
//               href: 'https://cometchat.com/blog',
//             },
//             {
//               label: 'GitHub',
//               href: 'https://github.com/cometchat-pro',
//             },
//           ],
//         },
//       ],
//       copyright: `Copyright © ${new Date().getFullYear()} CometChat. Built with Docusaurus.`,
//     },
//     prism: {
//       theme: prismThemes.github,
//       darkTheme: prismThemes.dracula,
//       additionalLanguages: ['java', 'kotlin', 'swift', 'typescript', 'bash'],
//     },
//   } satisfies Preset.ThemeConfig,

//   plugins: [
//     // You can add any other plugins you need here
//   ],
// };

// export default config;



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

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/', // Set routeBasePath to '/' since docs are the main content
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
    
    // Algolia DocSearch configuration
    algolia: {
      appId: '6RW3CISVKU',
      apiKey: 'ca85d17c2b7e887b2f084d22e25807cf',
      indexName: 'cometchat',
      contextualSearch: true,
      searchPagePath: 'search',
    },




    navbar: {
      logo: {
        href: "/",
        src: "/imgs/logo.svg",
        srcDark: "/imgs/logo.svg",
        alt: "Logo",
        width: "150px",
      },
    
      items: [
        {
          label: "Platform",
          type: "dropdown",
          items: [
            {
              type: "html",
              value: "<div></div>",
              className: "my-website-dropdown",
            },
          ],
        },
        {
          label: "Integrate",
          type: "dropdown",
          items: [
            {
              type: "html",
              value: "<div></div>",
              className: "my-website-dropdown",
            },
          ],
        },
        // Add Version Dropdowns
        {
          type: 'docsVersionDropdown',
          label: 'Docs Versions',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: 'UI Kits Versions',
          position: 'left',
          items: [
            {
              label: 'React v3',
              to: '/ui-kits/react/v3/installation',
            },
            {
              label: 'React Native v4',
              to: '/ui-kits/react-native/v4/installation',
            },
            {
              label: 'iOS Swift v3',
              to: '/ui-kits/ios-swift/v3/installation',
            },
            // Add more UI Kit versions
          ],
        },
        {
          type: 'dropdown',
          label: 'SDKs Versions',
          position: 'left',
          items: [
            {
              label: 'React SDK v5',
              to: '/sdks/react/v5/installation',
            },
            {
              label: 'React Native SDK v4',
              to: '/sdks/react-native/v4/installation',
            },
            // Add more SDK versions
          ],
        },
        {
          type: "search",
          position: "right",
        },
        {
          label: "Dashboard",
          to: "https://app.cometchat.com/",
          position: "right",
          className: "navbar-book-demo",
        },
        {
          label: "Contact Support",
          to: "https://help.cometchat.com/hc/en-us/requests/new",
          position: "right",
          className: "schedule_a_demo_button",
        },
      ],
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
    // [
    //   '@docusaurus/plugin-content-docs',
    //   {
    //     id: 'ui-kits',
    //     path: 'docs/ui-kits-docs',
    //     routeBasePath: 'ui-kits',
    //     sidebarPath: './sidebars.ts', // Use the same sidebar file
    //     // Using autogenerated sidebars for now
    //     versions: {
    //       current: {
    //         label: 'Current UI Kits',
    //       },
    //     },
    //   },
    // ],
    // [
    //   '@docusaurus/plugin-content-docs',
    //   {
    //     id: 'sdks',
    //     path: 'docs/sdks-docs',
    //     routeBasePath: 'sdks',
    //     sidebarPath: './sidebars.ts', // Use the same sidebar file
    //     // Using autogenerated sidebars for now
    //     versions: {
    //       current: {
    //         label: 'Current SDKs',
    //       },
    //     },
    //   },
    // ],
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