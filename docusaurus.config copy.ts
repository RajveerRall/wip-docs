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
        docs: false, // Disable default docs
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      },
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'react-kit', // Must match what you use in components
        path: 'react-ui-kits', // Your main docs folder
        routeBasePath: 'ui-kit/react', // URL path
        sidebarPath: require.resolve('./sidebarsReactKit.js'),
        // Versioning configuration
        lastVersion: 'current',
        versions: {
          current: {
            label: 'v2',
            path: '',
            banner: 'none'
          },
          '1.0': {
            label: 'v1',
            path: '1.0',
          }
        }
      },
    ],

    
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
