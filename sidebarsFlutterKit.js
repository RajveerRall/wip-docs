// sidebarsFlutterKit.js

/**
 * This sidebar is specific to the 'flutter-kit' documentation instance.
 * Document IDs are relative to the './docs-flutter-kit/' directory.
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
    // You can name this sidebar ID anything, it's used internally by the instance
    flutterKitSidebar: [
      {
        type: 'doc',
        id: 'intro', // Links to docs-flutter-kit/intro.md
        label: 'Flutter Kit Intro',
      },
      // --- Example of adding more pages/categories specific to Flutter Kit ---
      // {
      //   type: 'doc',
      //   id: 'flutter-setup', // Assuming docs-flutter-kit/flutter-setup.md exists
      // },
      // {
      //   type: 'category',
      //   label: 'Flutter Widgets',
      //   items: [
      //      'widgets/card', // Assuming docs-flutter-kit/widgets/card.md exists
      //      'widgets/chat_bubble', // Assuming docs-flutter-kit/widgets/chat_bubble.md exists
      //   ],
      // },
    ],
  };
  
  module.exports = sidebars;


// // sidebarsFlutterKit.js
// const sidebars = {
//   flutterKitSidebar: [
//     {
//       type: 'doc',
//       id: 'intro', // <<< MUST EXACTLY MATCH the ID in intro.md
//       label: 'Flutter Kit Intro',
//     },
//     // ... other items
//   ],
// };
// module.exports = sidebars;