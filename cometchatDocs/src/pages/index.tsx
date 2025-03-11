// // // src/pages/index.tsx
// // import React from 'react';
// // import Link from '@docusaurus/Link';
// // import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// // import Layout from '@theme/Layout';
// // import FrameworkGrid, { Framework } from '../components/framework-grid';
// // import styles from '../pages/index.module.css';

// // // Import your framework icons
// // import reactIcon from '../../static/img/frameworks/react-icon.svg';
// // import reactNativeIcon from '../../static/img/frameworks/react-native-svg.svg';
// // import angularIcon from '../../static/img/frameworks/angular-svg.svg';
// // import iosIcon from '../../static/img/frameworks/ios-svg.svg';
// // import androidKotlinIcon from '../../static/img/frameworks/android-kotlin-svg.svg';
// // import androidJavaIcon from '../../static/img/frameworks/android-java-svg.svg';
// // import vueIcon from '../../static/img/frameworks/vue-svg.svg';

// // export default function Home(): React.ReactElement {
// //   const { siteConfig } = useDocusaurusContext();
  
// //   const uiKits: Framework[] = [
// //     {
// //       id: 'react',
// //       title: 'React',
// //       version: '3',
// //       icon: '../../static/img/frameworks/react-icon.svg',
// //       link: '/ui-kits/react/installation'
// //     },
// //     {
// //       id: 'react-native',
// //       title: 'React Native',
// //       version: '4',
// //       icon: reactNativeIcon,
// //       link: '/ui-kits/react-native/installation'
// //     },
// //     {
// //       id: 'angular',
// //       title: 'Angular',
// //       version: '5',
// //       icon: angularIcon,
// //       link: '/ui-kits/angular/installation'
// //     },
// //     {
// //       id: 'ios-swift',
// //       title: 'iOS Swift',
// //       version: '3',
// //       icon: iosIcon,
// //       link: '/ui-kits/ios-swift/installation'
// //     },
// //     {
// //       id: 'android-kotlin',
// //       title: 'Android Kotlin',
// //       version: '4',
// //       icon: androidKotlinIcon,
// //       link: '/ui-kits/android-kotlin/installation'
// //     },
// //     {
// //       id: 'android-java',
// //       title: 'Android Java',
// //       version: '3',
// //       icon: androidJavaIcon,
// //       link: '/ui-kits/android-java/installation'
// //     },
// //     {
// //       id: 'vue',
// //       title: 'Vue',
// //       version: '2',
// //       icon: vueIcon,
// //       link: '/ui-kits/vue/installation'
// //     }
// //   ];
  
// //   const sdks: Framework[] = [
// //     {
// //       id: 'react-sdk',
// //       title: 'React',
// //       version: '5',
// //       icon: reactIcon,
// //       link: '/sdks/react/installation'
// //     },
// //     {
// //       id: 'react-native-sdk',
// //       title: 'React Native',
// //       version: '4',
// //       icon: reactNativeIcon,
// //       link: '/sdks/react-native/installation'
// //     },
// //     {
// //       id: 'android-sdk',
// //       title: 'Android',
// //       version: '5',
// //       icon: androidKotlinIcon,
// //       link: '/sdks/android/installation'
// //     },
// //     {
// //       id: 'ios-swift-sdk',
// //       title: 'iOS Swift',
// //       version: '3',
// //       icon: iosIcon,
// //       link: '/sdks/ios-swift/installation'
// //     },
// //   ];

// //   return (
// //     <Layout
// //       title={`${siteConfig.title}`}
// //       description={siteConfig.tagline}>
// //       <main className={styles.main}>
// //         <div className={styles.container}>
// //           <div className={styles.breadcrumbs}>
// //             <Link to="/">Home</Link> / Docs
// //           </div>
          
// //           <div className={styles.hero}>
// //             <h1 className={styles.heroTitle}>Get Started</h1>
// //             <p className={styles.heroDescription}>
// //               Seamlessly integrate real-time chat, voice, and video functionalities. Build your chat app by picking the
// //               implementation method that aligns best with your goals.
// //             </p>
// //           </div>
          
// //           <FrameworkGrid 
// //             title="UI Kits" 
// //             description="Quickly implement chat functionality with UI Kits that include built-in business logic and a customizable user interface."
// //             frameworks={uiKits} 
// //           />
          
// //           <FrameworkGrid 
// //             title="SDKs" 
// //             description="Use Our SDKs to tap into the full potential while building your own user interface."
// //             frameworks={sdks} 
// //           />
// //         </div>
// //       </main>
// //     </Layout>
// //   );
// // }

// // // // src/pages/index.tsx
// // // import React from 'react';
// // // import Layout from '@theme/Layout';
// // // import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// // // import { CardItem } from '../components/CardItem';
// // // import styles from '../pages/index.module.css';

// // // export default function Home(): React.ReactElement {
// // //   const { siteConfig } = useDocusaurusContext();
// // //   const uiKits = [
// // //     {
// // //       title: "React",
// // //       link: "/ui-kits/react/installation",
// // //       icon: "react.svg"
// // //     },
// // //     {
// // //       title: "React Native",
// // //       link: "/ui-kits/react-native/installation",
// // //       icon: "react.svg"
// // //     },
// // //     {
// // //       title: "Angular",
// // //       link: "/ui-kits/angular/installation",
// // //       icon: "angular.svg"
// // //     },
// // //     {
// // //       title: "iOS Swift",
// // //       link: "/ui-kits/ios-swift/installation",
// // //       icon: "swift.svg"
// // //     },
// // //     {
// // //       title: "Android Kotlin",
// // //       link: "/ui-kits/android-kotlin/installation",
// // //       icon: "android.svg"
// // //     },
// // //     {
// // //       title: "Android Java",
// // //       link: "/ui-kits/android-java/installation",
// // //       icon: "android.svg"
// // //     },
// // //     {
// // //       title: "Vue",
// // //       link: "/ui-kits/vue/installation",
// // //       icon: "vue.svg"
// // //     }
// // //   ];
  
// // //   const sdks = [
// // //     {
// // //       title: "React",
// // //       link: "/sdks/react/installation",
// // //       icon: "react.svg"
// // //     },
// // //     {
// // //       title: "React Native",
// // //       link: "/sdks/react-native/installation",
// // //       icon: "react.svg"
// // //     },
// // //     {
// // //       title: "Android",
// // //       link: "/sdks/android/installation",
// // //       icon: "android.svg"
// // //     },
// // //     {
// // //       title: "iOS Swift",
// // //       link: "/sdks/ios-swift/installation",
// // //       icon: "swift.svg"
// // //     }
// // //   ];

// // //   return (
// // //     <Layout
// // //       title={`${siteConfig.title}`}
// // //       description={siteConfig.tagline}>
// // //       <main className={styles.main}>
// // //         <div className={styles.container}>
// // //           <div className={styles.hero}>
// // //             <h1 className={styles.heroTitle}>Get Started</h1>
// // //             <p className={styles.heroDescription}>
// // //               Seamlessly integrate real-time chat, voice, and video functionalities. Build your chat app by picking the
// // //               implementation method that aligns best with your goals.
// // //             </p>
// // //           </div>
          
// // //           <div className={styles.section}>
// // //             <h2 className={styles.sectionTitle}>UI Kits</h2>
// // //             <p className={styles.sectionDescription}>
// // //               Quickly implement chat functionality with UI Kits that include built-in business logic and a customizable user interface.
// // //             </p>
            
// // //             <div className={styles.grid}>
// // //               {uiKits.map((item, index) => (
// // //                 <CardItem key={index} {...item} />
// // //               ))}
// // //             </div>
// // //           </div>
          
// // //           <div className={styles.section}>
// // //             <h2 className={styles.sectionTitle}>SDKs</h2>
// // //             <p className={styles.sectionDescription}>
// // //               Use Our SDKs to tap into the full potential while building your own user interface.
// // //             </p>
            
// // //             <div className={styles.grid}>
// // //               {sdks.map((item, index) => (
// // //                 <CardItem key={index} {...item} />
// // //               ))}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </main>
// // //     </Layout>
// // //   );
// // // }// src/pages/index.tsx

// // // // src/pages/index.tsx
// // // import React, { ReactElement } from 'react';
// // // import Layout from '@theme/Layout';
// // // import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// // // import { CardItem, CardItemProps } from '../components/CardItem';
// // // import styles from '../pages/index.module.css';

// // // // Define a typed wrapper for CardItem with the correct image path
// // // const CardItemWithCorrectPath = (props: Omit<CardItemProps, 'imagePath'>): ReactElement => {
// // //   return React.createElement(CardItem, {
// // //     ...props,
// // //     imagePath: '/img/frameworks/'
// // //   });
// // // };



// // // export default function Home(): React.ReactElement {
// // //   const { siteConfig } = useDocusaurusContext();
  
// // //   // Define proper types for our data structure
// // //   interface CardItemData {
// // //     title: string;
// // //     link: string;
// // //     icon: string;
// // //   }
  
// // //   interface SectionData {
// // //     title: string;
// // //     subHeading: string;
// // //     description: string;
// // //     items: CardItemData[];
// // //   }
  
// // //   const DATA: SectionData[] = [
// // //     {
// // //       title: "UI Kits",
// // //       subHeading: "Pre-built UI & business logic",
// // //       description:
// // //         "Quickly implement chat functionality with UI Kits that include built-in business logic and a customizable user interface.",
// // //       items: [
// // //         {
// // //           title: "React",
// // //           link: "/ui-kits/react/installation",
// // //           icon: "react.svg"
// // //         },
// // //         {
// // //           title: "React Native",
// // //           link: "/ui-kits/react-native/installation",
// // //           icon: "react.svg"
// // //         },
// // //         {
// // //           title: "Angular",
// // //           link: "/ui-kits/angular/installation",
// // //           icon: "angular.svg"
// // //         },
// // //         {
// // //           title: "iOS Swift",
// // //           link: "/ui-kits/ios-swift/installation",
// // //           icon: "swift.svg"
// // //         },
// // //         {
// // //           title: "Android Kotlin",
// // //           link: "/ui-kits/android-kotlin/installation",
// // //           icon: "android.svg"
// // //         },
// // //         {
// // //           title: "Android Java",
// // //           link: "/ui-kits/android-java/installation",
// // //           icon: "android.svg"
// // //         },
// // //         {
// // //           title: "Vue",
// // //           link: "/ui-kits/vue/installation",
// // //           icon: "vue.svg"
// // //         }
// // //       ]
// // //     },
// // //     {
// // //       title: "SDKs",
// // //       subHeading: "Build bespoke chat experiences",
// // //       description:
// // //         "Use Our SDKs to tap into the full potential while building your own user interface.",
// // //       items: [
// // //         {
// // //           title: "React",
// // //           link: "/sdks/react/installation",
// // //           icon: "react.svg"
// // //         },
// // //         {
// // //           title: "React Native",
// // //           link: "/sdks/react-native/installation",
// // //           icon: "react.svg"
// // //         },
// // //         {
// // //           title: "Android",
// // //           link: "/sdks/android/installation",
// // //           icon: "android.svg"
// // //         },
// // //         {
// // //           title: "iOS Swift",
// // //           link: "/sdks/ios-swift/installation",
// // //           icon: "swift.svg"
// // //         }
// // //       ]
// // //     }
// // //   ];

// // //   return React.createElement(
// // //     Layout,
// // //     {
// // //       title: `${siteConfig.title}`,
// // //       description: siteConfig.tagline
// // //     },
// // //     React.createElement(
// // //       'main',
// // //       null,
// // //       React.createElement(
// // //         'div',
// // //         { className: "mb-6 mt-16 px-6 md:px-16 flex w-full items-center justify-center flex-col" },
// // //         React.createElement(
// // //           'div',
// // //           { className: "flex w-full max-w-[1440px] items-start" },
// // //           React.createElement(
// // //             'div',
// // //             { className: "w-full max-w-[1440px]" },
// // //             React.createElement(
// // //               'div',
// // //               { className: "mb-16" },
// // //               React.createElement(
// // //                 'div',
// // //                 { className: "mb-2 md:mb-4" },
// // //                 React.createElement(
// // //                   'h1',
// // //                   { className: "mb-2 font-satoshi font-semibold text-[#6852D6]", style: {fontSize: "2rem", lineHeight: "106%"} },
// // //                   "Get Started"
// // //                 ),
// // //                 React.createElement(
// // //                   'p',
// // //                   { className: "dark:text-cst-sec-title-dark font-satoshi font-medium", style: { color: "#14131D", fontSize: "1.375rem", lineHeight: "120%", opacity: "0.74" } },
// // //                   "Seamlessly integrate real-time chat, voice, and video functionalities. Build your chat app by picking the implementation method that aligns best with your goals."
// // //                 )
// // //               )
// // //             ),
// // //             DATA.map((item, index) => 
// // //               React.createElement(
// // //                 'div',
// // //                 { key: index },
// // //                 React.createElement(
// // //                   'div',
// // //                   { className: "mb-16" },
// // //                   React.createElement(
// // //                     'div',
// // //                     { className: "mb-2 md:mb-4" },
// // //                     React.createElement(
// // //                       'h1',
// // //                       { className: "mb-2 font-satoshi font-semibold text-[#6852D6]", style: {fontSize: "2rem", lineHeight: "106%" } },
// // //                       item.title
// // //                     ),
// // //                     React.createElement(
// // //                       'h3',
// // //                       { className: "mb-3 dark:text-cst-sec-title-dark font-satoshi font-semibold", style: { color: "#14131D", fontSize: "1.625rem", lineHeight: "106%" } },
// // //                       item.subHeading
// // //                     ),
// // //                     React.createElement(
// // //                       'p',
// // //                       { className: "dark:text-cst-sec-title-dark font-satoshi font-medium", style: { color: "#14131D", fontSize: "1.375rem", lineHeight: "120%", opacity: "0.74" } },
// // //                       item.description
// // //                     )
// // //                   ),
// // //                   React.createElement(
// // //                     'div',
// // //                     { className: "grid w-12/12 max-w-[1440px] mb-3 grid-cols-1 md:grid-cols-2 gap-3 md:w-12/12 lg:grid-cols-4 md:mb-7 md:gap-7" },
// // //                     item.items.map((cardItem) => 
// // //                       React.createElement(CardItemWithCorrectPath, {
// // //                         key: cardItem.title,
// // //                         ...cardItem
// // //                       })
// // //                     )
// // //                   )
// // //                 )
// // //               )
// // //             )
// // //           )
// // //         )
// // //       )
// // //     )
// // //   );
// // // }
// // src/pages/integration.tsx
// import React from 'react';
// import FrameworkGrid, { Framework } from '../components/framework-grid';
// import useBaseUrl from "@docusaurus/useBaseUrl";

// export default function Integration() {
//   // Use hooks inside the component function
//   const getIconPath = (iconName) => useBaseUrl(`/imgs/logos/${iconName}`);
  
//   // Prepare data in the format expected by FrameworkGrid
//   const uiKits: Framework[] = [
//     {
//       id: 'react',
//       title: "React",
//       version: "6",
//       icon: getIconPath("react.svg"),
//       link: "/ui-kit/react/v6/overview"
//     },
//     {
//       id: 'react-native',
//       title: "React Native",
//       version: "",
//       icon: getIconPath("react.svg"), // Using react.svg for React Native too
//       link: "/ui-kit/react-native/overview"
//     },
//     {
//       id: 'ios',
//       title: "iOS",
//       version: "5",
//       icon: getIconPath("swift.svg"),
//       link: "/ui-kit/ios/v5/overview"
//     },
//     {
//       id: 'android',
//       title: "Android",
//       version: "5",
//       icon: getIconPath("android.svg"),
//       link: "/ui-kit/android/v5/overview"
//     },
//     {
//       id: 'flutter',
//       title: "Flutter",
//       version: "",
//       icon: getIconPath("flutter.svg"),
//       link: "/ui-kit/flutter/overview"
//     },
//     {
//       id: 'angular',
//       title: "Angular",
//       version: "",
//       icon: getIconPath("angular.svg"),
//       link: "/ui-kit/angular/overview"
//     },
//     {
//       id: 'vue',
//       title: "Vue",
//       version: "",
//       icon: getIconPath("vue.svg"),
//       link: "/ui-kit/vue/overview"
//     }
//   ];

//   const sdks: Framework[] = [
//     {
//       id: 'javascript',
//       title: "JavaScript",
//       version: "",
//       icon: getIconPath("javascript.svg"),
//       link: "/sdk/javascript/overview"
//     },
//     {
//       id: 'react-native-sdk',
//       title: "React Native",
//       version: "",
//       icon: getIconPath("react.svg"),
//       link: "/sdk/react-native/overview"
//     },
//     {
//       id: 'ios-sdk',
//       title: "iOS",
//       version: "",
//       icon: getIconPath("swift.svg"),
//       link: "/sdk/ios/overview"
//     },
//     {
//       id: 'android-sdk',
//       title: "Android",
//       version: "",
//       icon: getIconPath("android.svg"),
//       link: "/sdk/android/overview"
//     },
//     {
//       id: 'flutter-sdk',
//       title: "Flutter",
//       version: "",
//       icon: getIconPath("flutter.svg"),
//       link: "/sdk/flutter/overview"
//     },
//     {
//       id: 'ionic-sdk',
//       title: "Ionic",
//       version: "",
//       icon: getIconPath("ionic.svg"),
//       link: "/sdk/ionic/overview"
//     }
//   ];

//   const widgets: Framework[] = [
//     {
//       id: 'wordpress',
//       title: "Wordpress / BuddyPress",
//       version: "",
//       icon: getIconPath("wp.svg"),
//       link: "/widget/wordpress-buddypress"
//     },
//     {
//       id: 'html',
//       title: "HTML / Bootstrap / jQuery",
//       version: "",
//       icon: getIconPath("html.svg"),
//       link: "/widget/html-bootstrap-jquery"
//     }
//   ];

//   return (
//     <div className="mb-6 mt-16 px-6 md:px-16 flex w-full items-center justify-center flex-col">
//       <div className="flex w-full max-w-[1440px] items-start">
//         <div className="w-full max-w-[1440px]">
//           <FrameworkGrid 
//             title="UI Kits" 
//             description="Pre-built UI & business logic. Quickly implement chat functionality with UI Kits that include built-in business logic and a customizable user interface."
//             frameworks={uiKits} 
//           />
          
//           <FrameworkGrid 
//             title="SDKs" 
//             description="Build bespoke chat experiences. Use Our SDKs to tap into the full potential of CometChat while building your own user interface."
//             frameworks={sdks} 
//           />
          
//           <FrameworkGrid 
//             title="Widgets" 
//             description="For simpler websites. Integrate chat into any simple HTML, Bootstrap, or jQuery site effortlessly with our copy-and-paste code."
//             frameworks={widgets} 
//           />
//         </div>
//       </div>
//     </div>
//   );
// }



// src/pages/index.tsx
import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import FrameworkGrid, { Framework } from '../components/framework-grid';
import styles from '../pages/index.module.css';
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function Home(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();
  
  // Helper function to get the correct icon path
  const getIconPath = (iconName) => useBaseUrl(`/imgs/logos/${iconName}`);
  
  const uiKits: Framework[] = [
    {
      id: 'react',
      title: 'React',
      version: '3',
      icon: getIconPath('react.svg'),
      link: '/ui-kits/react/installation'
    },
    {
      id: 'react-native',
      title: 'React Native',
      version: '4',
      icon: getIconPath('react.svg'),
      link: '/ui-kits/react-native/installation'
    },
    {
      id: 'angular',
      title: 'Angular',
      version: '5',
      icon: getIconPath('angular.svg'),
      link: '/ui-kits/angular/installation'
    },
    {
      id: 'ios-swift',
      title: 'iOS Swift',
      version: '3',
      icon: getIconPath('swift.svg'),
      link: '/ui-kits/ios-swift/installation'
    },
    {
      id: 'android-kotlin',
      title: 'Android Kotlin',
      version: '4',
      icon: getIconPath('android.svg'),
      link: '/ui-kits/android-kotlin/installation'
    },
    {
      id: 'android-java',
      title: 'Android Java',
      version: '3',
      icon: getIconPath('android.svg'),
      link: '/ui-kits/android-java/installation'
    },
    {
      id: 'vue',
      title: 'Vue',
      version: '2',
      icon: getIconPath('vue.svg'),
      link: '/ui-kits/vue/installation'
    }
  ];
  
  const sdks: Framework[] = [
    {
      id: 'react-sdk',
      title: 'React',
      version: '5',
      icon: getIconPath('react.svg'),
      link: '/sdks/react/installation'
    },
    {
      id: 'react-native-sdk',
      title: 'React Native',
      version: '4',
      icon: getIconPath('react.svg'),
      link: '/sdks/react-native/installation'
    },
    {
      id: 'android-sdk',
      title: 'Android',
      version: '5',
      icon: getIconPath('android.svg'),
      link: '/sdks/android/installation'
    },
    {
      id: 'ios-swift-sdk',
      title: 'iOS Swift',
      version: '3',
      icon: getIconPath('swift.svg'),
      link: '/sdks/ios-swift/installation'
    },
  ];

  return (
    <Layout
      title={`${siteConfig.title}`}
      description={siteConfig.tagline}>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link> / Docs
          </div>
          
          <div className={styles.hero}>
            <h1 className={styles.heroTitle}>Get Started</h1>
            <p className={styles.heroDescription}>
              Seamlessly integrate real-time chat, voice, and video functionalities. Build your chat app by picking the
              implementation method that aligns best with your goals.
            </p>
          </div>
          
          <FrameworkGrid 
            title="UI Kits" 
            description="Quickly implement chat functionality with UI Kits that include built-in business logic and a customizable user interface."
            frameworks={uiKits} 
          />
          
          <FrameworkGrid 
            title="SDKs" 
            description="Use Our SDKs to tap into the full potential while building your own user interface."
            frameworks={sdks} 
          />
        </div>
      </main>
    </Layout>
  );
}