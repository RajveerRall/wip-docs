// // sidebarsReactKit.js
// module.exports = {
//   reactKitSidebar: [
//     "overview",
//     //   'installation',
//     // Add other React Kit doc IDs here
//   ],
// };


// sidebarsReactKit.js

/**
 * This sidebar is specific to the 'react-kit' documentation instance.
 * Document IDs are relative to the './docs-react-kit/' directory.
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  // You can name this sidebar ID anything, it's used internally by the instance
  reactKitSidebar: [
    {
      type: 'doc',
      id: 'overview', // Links to docs-react-kit/overview.md
      label: 'React Kit Overview',
    },
    // --- Example of adding more pages/categories specific to React Kit ---
    // {
    //   type: 'doc',
    //   id: 'react-installation', // Assuming docs-react-kit/react-installation.md exists
    // },
    // {
    //   type: 'category',
    //   label: 'React Components',
    //   items: [
    //      'components/button', // Assuming docs-react-kit/components/button.md exists
    //      'components/list', // Assuming docs-react-kit/components/list.md exists
    //   ],
    // },
  ],
};

module.exports = sidebars;