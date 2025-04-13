// import { themes as prismThemes } from "prism-react-renderer";
// import type { Config } from "@docusaurus/types";
// import type * as Preset from "@docusaurus/preset-classic";

// const config: Config = {
//   title: "CometChat Docs",
//   tagline: "Integrate real-time chat, voice, and video functionalities.",
//   favicon: "img/favicon.ico",

//   url: "https://www.cometchat.com",
//   // This will use the BASE_URL env variable when available, or fall back to '/'
//   baseUrl: process.env.BASE_URL || "/wip-docs/",

//   organizationName: "CometChat",
//   projectName: "cometchat-docs",

//   onBrokenLinks: "warn",
//   onBrokenMarkdownLinks: "warn",

//   i18n: {
//     defaultLocale: "en",
//     locales: ["en"],
//   },

//   presets: [
//     [
//       "classic",
//       {
//         docs: {
//           sidebarPath: require.resolve("./sidebars.ts"),
//           id: "default",
//           path: "docs",

//           routeBasePath: "/", // Keeps docs as the main content
//           editUrl: "https://github.com/cometchat/cometchat-docs/edit/main/",
//         },
//         blog: false,
//         theme: {
//           customCss: "./src/css/custom.css",
//         },
//       } satisfies Preset.Options,
//     ],
//   ],
//   themeConfig: {
//     // Add color mode settings
//     colorMode: {
//       defaultMode: "light",
//       disableSwitch: false,
//       respectPrefersColorScheme: true,
//     },
//     image: "img/cometchat-social-card.jpg",

//     navbar: {
//       //   logo: {
//       //   href: "/",
//       //   src: "/imgs/logo.svg",
//       //   srcDark: "/imgs/logo.svg",
//       //   alt: "Logo",
//       //   width: "150px",
//       // },
//     },

//     // Algolia DocSearch configuration
//     algolia: {
//       appId: "6RW3CISVKU",
//       apiKey: "ca85d17c2b7e887b2f084d22e25807cf",
//       indexName: "cometchat",
//       contextualSearch: true,
//       searchPagePath: "search",
//     },
//     prism: {
//       theme: prismThemes.github,
//       darkTheme: prismThemes.dracula,
//       additionalLanguages: ["java", "kotlin", "swift", "typescript", "bash"],
//     },
//   } satisfies Preset.ThemeConfig,

//   // Configure static directories
//   staticDirectories: ["static"],

//   // Keep plugins array clean
//   // Add plugins for additional versioned documentation
//   plugins: [
//     // *** Configuration for the SEPARATE React Kit instance ***
//     [
//       "@docusaurus/plugin-content-docs",
//       {
//         // --- Core Instance Settings ---
//         id: "react-kit", // Unique ID for this instance
//         path: "docs/ui-kits/react", // Folder containing React Kit docs

//         // --- V V V --- CORRECTED routeBasePath --- V V V ---
//         routeBasePath: "ui-kits/react", // <<< CHANGE THIS to match your desired URL structure

//         // --- V V V --- UNCOMMENTED and REQUIRED sidebarPath --- V V V ---
//         sidebarPath: require.resolve("./sidebarsReactKit.js"), // <<< ADD THIS BACK (ensure sidebarsReactKit.js exists)

//         // --- Versioning Settings for THIS instance ONLY ---
//         includeCurrentVersion: true, // Serve current content at the base routeBasePath
//         lastVersion: "current", // Treat 'current' as the latest stable (change after creating named versions)
//         // Define specific versions if you have created them:
//         // versions: {
//         //   current: { label: 'Next 🚧', path: 'next' }, // Example 'next' version
//         //   '2.0': { label: 'v2.0', path: '2.0' },      // Example '2.0' version
//         //   '1.0': { label: 'v1.0', path: '1.0' },      // Example '1.0' version
//         // },
//       },
//     ],
//     // Add other plugins here if needed (e.g., for Flutter Kit if it also needs separate versioning)
//   ],
// };

// export default config;

// // export default {
// //   title: 'CometChat Docs',
// //   url: 'https://rajveerrall.github.io',
// //   baseUrl: '/wip-docs/',
// //   // Keep any existing configuration below
// //   favicon: 'img/favicon.ico',
// //   organizationName: 'RajveerRall',
// //   projectName: 'wip-docs',
// //   onBrokenLinks: 'throw',
// //   onBrokenMarkdownLinks: 'warn',
// //   i18n: { ... },
// //   themes: [ ... ],
// //   presets: [ ... ],
// //   themeConfig: { ... },
// //   plugins: [ ... ],
// //   // ... any other existing config options
// // };

// docusaurus.config.ts
import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
// const config: Config = {
  title: "CometChat Docs",
  tagline: "Integrate real-time chat, voice, and video functionalities.",
  favicon: "img/favicon.ico",

  url: "https://www.cometchat.com",
  // This will use the BASE_URL env variable when available, or fall back to '/'
  baseUrl: process.env.BASE_URL || "/wip-docs/",

  organizationName: "CometChat",
  projectName: "cometchat-docs",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: { // <<< DEFAULT DOCUMENTATION INSTANCE >>>
          // --- Core Settings ---
          sidebarPath: require.resolve("./sidebars.ts"),
          id: "default",
          path: "docs-main", // <<< Points to ./docs-main/ folder
          routeBasePath: "/", // Docs accessible at the root URL
          // editUrl: "https://github.com/your-github-org/your-repo-name/edit/main/", // Add your edit URL
        },
        blog: false, // Disable blog if not used
        theme: {
          customCss: require.resolve("./src/css/custom.css"), // Standard Docusaurus CSS
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg", // Make sure this exists in static/img
    navbar: {
      title: "My Site", // Navbar Title
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg", // Make sure this exists in static/img
      },
      items: [
        // Link to the default docs instance
        {
          type: 'docSidebar',
          sidebarId: 'defaultSidebar', // Matches the key in sidebars.ts
          position: 'left',
          label: 'Main Docs',
        },
        // Link to the React Kit instance
        {
          to: '/ui-kits/react/overview', // Link to the starting page of React Kit
          label: 'React Kit',
          position: 'left',
        },
        // Link to the Flutter Kit instance
        {
          to: '/ui-kits/flutter/intro', // Link to the starting page of Flutter Kit
          label: 'Flutter Kit',
          position: 'left',
        },
        // {href: 'https://github.com/your-github-org/your-repo-name', label: 'GitHub', position: 'right'}, // Add GitHub link
      ],
    },
    footer: { // Optional Footer config
      style: 'dark',
      links: [ /* Add footer links if desired */ ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["java", "kotlin", "swift", "typescript", "bash"],
    },
     // --- Comment out Algolia if you don't have credentials yet ---
    // Algolia DocSearch configuration
    algolia: {
      appId: "6RW3CISVKU",
      apiKey: "ca85d17c2b7e887b2f084d22e25807cf",
      indexName: "cometchat",
      contextualSearch: true,
      searchPagePath: "search",
    }
  } satisfies Preset.ThemeConfig,

  // --- Plugins for ADDITIONAL documentation instances ---
  plugins: [
    // <<< REACT KIT DOCUMENTATION INSTANCE >>>
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "react-kit",                  // Unique ID
        path: "docs-react-kit",           // <<< Points to ./docs-react-kit/ folder
        routeBasePath: "ui-kits/react",   // URL prefix for this instance
        sidebarPath: require.resolve("./sidebarsReactKit.js"), // Sidebar for React Kit
        includeCurrentVersion: true,     // Show content at the routeBasePath
        lastVersion: "v1.0",
        // versions: {
        //     current: { label: 'Next 🚧', path: 'next' },
        //     'v1.0': { label: 'v1.0', path: 'v1.0' },
        // },
      },
    ],
    // <<< FLUTTER KIT DOCUMENTATION INSTANCE >>>
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "flutter-kit",                // Unique ID
        path: "docs-flutter-kit",         // <<< Points to ./docs-flutter-kit/ folder
        routeBasePath: "ui-kits/flutter", // URL prefix for this instance
        sidebarPath: require.resolve("./sidebarsFlutterKit.js"), // Sidebar for Flutter Kit
        includeCurrentVersion: true,    // Show content at the routeBasePath
        lastVersion: "v1.0",
        // versions: {
        //     current: { label: 'Next 🚧', path: 'next' },
        //     'v1.0': { label: 'v1.0', path: 'v1.0' },
        // },
      },
    ],
  ],

  // --- Static Directories (Optional) ---
  staticDirectories: ['static'], // Usually 'static' by default
};

export default config;