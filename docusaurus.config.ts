import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "CometChat Docs",
  tagline: "Integrate real-time chat, voice, and video functionalities.",
  favicon: "img/favicon.ico",

  url: "https://www.cometchat.com", // Your production URL
  // Ensure BASE_URL env var is set correctly during build, or defaults here
  baseUrl: process.env.BASE_URL || "/wip-docs/",

  organizationName: "CometChat", // Your GitHub org/user
  projectName: "cometchat-docs", // Your repo name

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
          // *** Configuration for the DEFAULT instance (non-React Kit docs) ***
          sidebarPath: require.resolve("./sidebars.ts"), // Sidebar for default docs
          id: "default", // Explicitly set ID (good practice)
          path: "docs", // Assumes your main docs are in the 'docs' folder
          routeBasePath: "/", // Makes these docs the root content after baseUrl
          breadcrumbs: true, 

          // === REMOVE VERSIONING HERE if only React Kit should be versioned ===
          // lastVersion: 'current', // Remove this
          // versions: { ... }, // Remove this whole block if main docs are unversioned

          editUrl: "https://github.com/cometchat/cometchat-docs/edit/main/", // Adjust path if needed
        },
        blog: false, // Or configure if you have a blog
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // *** Configuration for the SEPARATE React Kit instance ***
    [
      "@docusaurus/plugin-content-docs",
      {
        // --- Core Instance Settings ---
        id: "react-kit", // Unique ID for this instance
        path: "react-ui-kits", // Folder containing React Kit docs
        breadcrumbs:true,

        // --- V V V --- CORRECTED routeBasePath --- V V V ---
        routeBasePath: "ui-kit/react", // <<< CHANGE THIS to match your desired URL structure

        // --- V V V --- UNCOMMENTED and REQUIRED sidebarPath --- V V V ---
        sidebarPath: require.resolve("./sidebarsReactKit.js"), // <<< ADD THIS BACK (ensure sidebarsReactKit.js exists)

        // --- Versioning Settings for THIS instance ONLY ---
        includeCurrentVersion: true, // Serve current content at the base routeBasePath
        lastVersion: "current", // Treat 'current' as the latest stable (change after creating named versions)
        // Define specific versions if you have created them:
        versions: {
          // current: { label: 'Next 🚧', path: 'next' }, // Example 'next' version
          // '2.0': { label: 'v2.0', path: '2.0' },      // Example '2.0' version
          '1.0': { label: 'v1.0', path: '1.0' },      // Example '1.0' version
        },
      },
    ],
    // Add other plugins here if needed (e.g., for Flutter Kit if it also needs separate versioning)
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    image: "img/cometchat-social-card.jpg",
    navbar: {
      logo: {
        href: "/", // Links to baseUrl
        src: "/wip-docs/imgs/logo.svg", // Needs to include baseUrl if absolute
        srcDark: "/wip-docs/imgs/logo.svg", // Needs to include baseUrl if absolute
        alt: "Logo",
        width: "150px",
      },
      items: [
        // Example link to default docs root
        { to: "/", label: "Guides", position: "left" }, // Assuming default docs are at '/'
        // Example link to React Kit current overview
        { to: "/ui-kits/react/overview", label: "React Kit", position: "left" },
        // Add other links as needed
      ],
    },
    algolia: {
      appId: "6RW3CISVKU",
      apiKey: "ca85d17c2b7e887b2f084d22e25807cf",
      indexName: "cometchat",
      contextualSearch: true,
      searchPagePath: "search",
    },
    prism: {
      theme: prismThemes.vsDark,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ["java", "kotlin", "swift", "typescript", "bash"],
    },
    // ... other themeConfig like footer ...
  } satisfies Preset.ThemeConfig,

  staticDirectories: ["static"],
};

export default config;
