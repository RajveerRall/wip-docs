import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
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
        docs: {
          sidebarPath: require.resolve("./sidebars.ts"),
          id: "default",
          path: "docs",

          routeBasePath: "/", // Keeps docs as the main content
          editUrl: "https://github.com/cometchat/cometchat-docs/edit/main/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    // Add color mode settings
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    image: "img/cometchat-social-card.jpg",

    navbar: {
      //   logo: {
      //   href: "/",
      //   src: "/imgs/logo.svg",
      //   srcDark: "/imgs/logo.svg",
      //   alt: "Logo",
      //   width: "150px",
      // },
    },

    // Algolia DocSearch configuration
    algolia: {
      appId: "6RW3CISVKU",
      apiKey: "ca85d17c2b7e887b2f084d22e25807cf",
      indexName: "cometchat",
      contextualSearch: true,
      searchPagePath: "search",
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["java", "kotlin", "swift", "typescript", "bash"],
    },
  } satisfies Preset.ThemeConfig,

  // Configure static directories
  staticDirectories: ["static"],

  // Keep plugins array clean
  // Add plugins for additional versioned documentation
  plugins: [
    // *** Configuration for the SEPARATE React Kit instance ***
    [
      "@docusaurus/plugin-content-docs",
      {
        // --- Core Instance Settings ---
        id: "react-kit", // Unique ID for this instance
        path: "docs/ui-kits/react", // Folder containing React Kit docs

        // --- V V V --- CORRECTED routeBasePath --- V V V ---
        routeBasePath: "ui-kits/react", // <<< CHANGE THIS to match your desired URL structure

        // --- V V V --- UNCOMMENTED and REQUIRED sidebarPath --- V V V ---
        sidebarPath: require.resolve("./sidebarsReactKit.js"), // <<< ADD THIS BACK (ensure sidebarsReactKit.js exists)

        // --- Versioning Settings for THIS instance ONLY ---
        includeCurrentVersion: true, // Serve current content at the base routeBasePath
        lastVersion: "current", // Treat 'current' as the latest stable (change after creating named versions)
        // Define specific versions if you have created them:
        // versions: {
        //   current: { label: 'Next 🚧', path: 'next' }, // Example 'next' version
        //   '2.0': { label: 'v2.0', path: '2.0' },      // Example '2.0' version
        //   '1.0': { label: 'v1.0', path: '1.0' },      // Example '1.0' version
        // },
      },
    ],
    // Add other plugins here if needed (e.g., for Flutter Kit if it also needs separate versioning)
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
