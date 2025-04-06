import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import path from 'path';
import fs from 'fs';

// --- Environment Variables Setup ---
// require('dotenv').config(); // Load .env file if you use one

// --- Custom Plugins (Webpack only, Tailwind removed) ---
// Ensure this file exists and has the correct exports
// const { webpackPlugin } = require("./plugins/webpack-plugin.cjs");
// const tailwindPlugin = require("./plugins/tailwind-plugin.cjs"); // REMOVED

// --- SDK List Logic ---
const sdkListLatestVersion: string[] = [];
const folderPath = path.resolve(__dirname, "./docs/sidebars");

try {
  const files = fs.readdirSync(folderPath);
  files.forEach((file) => {
    if (file.endsWith('.js') || file.endsWith('.ts')) {
        try {
            sdkListLatestVersion.push(path.basename(file, path.extname(file)));
        } catch (e) {
            console.error(`Error processing file ${file}:`, e);
        }
    }
  });
} catch (readdirErr) {
  console.error("Error reading sidebars folder:", readdirErr);
}
console.log("Detected SDKs with custom sidebars:", sdkListLatestVersion);


// --- Load Docs Configuration Data ---
/** @type {import('@docusaurus/plugin-content-docs').Options[]} */
const docsInputData = require("./docs_with_sidebar_list.json");

// --- Default Docs Settings ---
/** @type {Partial<import('@docusaurus/plugin-content-docs').Options>} */
const defaultDocsSettings = {
  breadcrumbs: true,
  // editUrl: "https://github.com/cometchat/cometchat-docs/edit/main/",
  showLastUpdateTime: true,
  remarkPlugins: [
    [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
  ],
  sidebarPath: require.resolve("./sidebar_auto.js"),
};

// --- Docs Plugin Creation Function ---
function create_doc_plugin(options: import('@docusaurus/plugin-content-docs').Options): [string, import('@docusaurus/plugin-content-docs').Options] {
  let resolvedSidebarPath = defaultDocsSettings.sidebarPath;

  if (options.id && sdkListLatestVersion.includes(options.id)) {
    const customSidebarFile = path.resolve(__dirname, `./docs/sidebars/${options.id}.js`); // Or .ts
    if (fs.existsSync(customSidebarFile)) {
        resolvedSidebarPath = require.resolve(customSidebarFile);
        console.log(`Using custom sidebar for ${options.id}: ${customSidebarFile}`);
    } else {
        console.warn(`Custom sidebar file not found for ${options.id}, using default.`);
    }
  }

  return [
    "@docusaurus/plugin-content-docs",
    /** @type {import('@docusaurus/plugin-content-docs').Options} */
    ({
      ...defaultDocsSettings,
      ...options,
      sidebarPath: resolvedSidebarPath,
    }),
  ];
}

// --- Generate Docs Plugin Configurations ---
const docs_plugins = docsInputData.map(create_doc_plugin);

// --- Redirects Setup ---
const getAllRedirects = () => {
  try {
    const redirects = require("./react-ui-kit_redirects.json");
    // const androidRedirects = require("./android-ui-kit_redirects.json");
    return [
      ...redirects,
      // ...androidRedirects,
    ];
  } catch (error) {
      console.error("Error loading redirect files:", error);
      return [];
  }
};

const client_redirect_plugin: [string, object] | null =
  getAllRedirects().length > 0
    ? [
        "@docusaurus/plugin-client-redirects",
        {
          redirects: getAllRedirects(),
        },
      ]
    : null;


// --- Main Plugins Array (Tailwind Plugin Removed) ---
const plugins: (string | [string, object] | null | Promise<any> | (() => any))[] = [
  // tailwindPlugin, // REMOVED
  ...docs_plugins,
  // webpackPlugin,
  // [ // Uncomment if using dotenv
  //   "docusaurus2-dotenv",
  //   { systemvars: true },
  // ],
  client_redirect_plugin,
].filter(Boolean);

// TODO: update this infos
/** @type {import('@docusaurus/plugin-content-docs').Options} */
const defaultSettings = {
  breadcrumbs: true,
  // editUrl: "https://google.com",
  showLastUpdateTime: true,
  remarkPlugins: [
    [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
  ],
  sidebarPath: require.resolve("./sidebar_auto.js"),
};

// --- Main Docusaurus Configuration ---
const config: Config = {
  // --- Basic Metadata ---
  title: 'CometChat Docs',
  tagline: 'Integrate real-time chat, voice, and video functionalities.',
  favicon: 'img/favicon.ico',

  // --- URL/Deployment ---
  url: 'https://www.cometchat.com',
  baseUrl: `/${process.env.BASE_URL || 'docs'}/`,
  organizationName: 'CometChat',
  projectName: 'cometchat-docs',

  // --- Build Behavior ---
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false,

  // --- Internationalization ---
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // --- Explicitly add themes ---
  themes: [
    '@docusaurus/theme-live-codeblock'
  ],

  // --- Client Modules ---
  // clientModules: [require.resolve("./src/client/define-ui-kit.js")],

  // --- Presets ---
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          id: "docs-home",
          path: "docs/home",
          routeBasePath: "/home",
          ...defaultSettings,

          // sidebarPath: require.resolve('./sidebarsHome.js'),
          // ...defaultDocsSettings, // Could apply defaults here too if consistent
        },
        // docs: false, // Use this if ALL docs are in the main 'plugins' array
        blog: false,
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            // require.resolve('./src/css/api-reference.css'),
          ],
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        // googleTagManager: {
        //   containerId: process.env.GTM_CONTAINER_ID,
        // },
      } satisfies Preset.Options,
    ],
  ],

  // --- Stylesheets ---
  // stylesheets: [
  //   "https://fonts.googleapis.com/icon?family=Material+Icons",
  // ],

  // --- Theme Configuration ---
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    image: 'img/cometchat-social-card.jpg',
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      logo: {
        href: '/',
        src: '/img/logo.svg',
        srcDark: '/img/logo_dark.svg', // Optional dark mode logo
        alt: 'CometChat Logo',
      },
      // items: [ // Add navbar items if needed
      // ]
    },
    algolia: {
      appId: process.env.ALGOLIA_APP_ID || 'YOUR_FALLBACK_APP_ID',
      apiKey: process.env.ALGOLIA_API_KEY || 'YOUR_FALLBACK_API_KEY',
      indexName: process.env.ALGOLIA_INDEX_NAME || 'YOUR_FALLBACK_INDEX_NAME',
      contextualSearch: true,
      searchPagePath: 'search',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        'dart', 'ruby', 'groovy', 'kotlin', 'java',
        'swift', 'objectivec', 'bash', 'typescript',
      ],
      magicComments: [
        { className: 'theme-code-block-highlighted-line', line: 'highlight-next-line', block: { start: 'highlight-start', end: 'highlight-end' } },
        { className: 'code-block-error-line', line: 'highlight-next-line-error' },
      ],
    },
  } satisfies Preset.ThemeConfig,

  // --- Custom Webpack Config ---
  // webpack: { /* ... */ }, // Keep if needed for swc-loader or other reasons

  // --- Markdown Processing ---
  // markdown: { /* ... */ }, // Keep if needed

  // --- Static Directories ---
  staticDirectories: ['static'],

};

export default config;