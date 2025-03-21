// // // import React from 'react';
// // // import clsx from 'clsx';
// // // import {ThemeClassNames} from '@docusaurus/theme-common';
// // // import {
// // //   useSidebarBreadcrumbs,
// // //   useHomePageRoute,
// // // } from '@docusaurus/theme-common/internal';
// // // import Link from '@docusaurus/Link';
// // // import {translate} from '@docusaurus/Translate';
// // // import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home';
// // // import styles from './styles.module.css';

// // // // TODO move to design system folder
// // // function BreadcrumbsItemLink({children, href, isLast}) {
// // //   const className = 'breadcrumbs__link';
// // //   if (isLast) {
// // //     return (
// // //       <span className={className} itemProp="name">
// // //         {children}
// // //       </span>
// // //     );
// // //   }
// // //   return href ? (
// // //     <Link className={className} href={href} itemProp="item">
// // //       <span itemProp="name">{children}</span>
// // //     </Link>
// // //   ) : (
// // //     <span className={className}>{children}</span>
// // //   );
// // // }

// // // // TODO move to design system folder
// // // function BreadcrumbsItem({children, active, index, addMicrodata}) {
// // //   return (
// // //     <li
// // //       {...(addMicrodata && {
// // //         itemScope: true,
// // //         itemProp: 'itemListElement',
// // //         itemType: 'https://schema.org/ListItem',
// // //       })}
// // //       className={clsx('breadcrumbs__item', {
// // //         'breadcrumbs__item--active': active,
// // //       })}>
// // //       {children}
// // //       <meta itemProp="position" content={String(index + 1)} />
// // //     </li>
// // //   );
// // // }

// // // function BreadcrumbsItemSeparator() {
// // //   return <li className="breadcrumbs__item breadcrumbs__item--separator">›</li>;
// // // }

// // // export default function DocBreadcrumbs() {
// // //   const breadcrumbs = useSidebarBreadcrumbs();
// // //   const homePageRoute = useHomePageRoute();

// // //   if (!breadcrumbs) {
// // //     return null;
// // //   }

// // //   return (
// // //     <nav
// // //       className={clsx(
// // //         ThemeClassNames.docs.docBreadcrumbs,
// // //         styles.breadcrumbs,
// // //       )}
// // //       aria-label={translate({
// // //         id: 'theme.docs.breadcrumbs.navAriaLabel',
// // //         message: 'Breadcrumbs',
// // //         description: 'The ARIA label for the breadcrumbs',
// // //       })}>
// // //       <ul
// // //         className="breadcrumbs__list"
// // //         itemScope
// // //         itemType="https://schema.org/BreadcrumbList">
// // //         {homePageRoute && (
// // //           <>
// // //             <HomeBreadcrumbItem />
// // //             <BreadcrumbsItemSeparator />
// // //           </>
// // //         )}
// // //         {breadcrumbs.map((item, idx) => {
// // //           const isLast = idx === breadcrumbs.length - 1;
// // //           return (
// // //             <React.Fragment key={idx}>
// // //               <BreadcrumbsItem
// // //                 active={isLast}
// // //                 index={idx}
// // //                 addMicrodata={!!item.href}>
// // //                 <BreadcrumbsItemLink
// // //                   href={item.href}
// // //                   isLast={isLast}>
// // //                   {item.label}
// // //                 </BreadcrumbsItemLink>
// // //               </BreadcrumbsItem>
// // //               {!isLast && <BreadcrumbsItemSeparator />}
// // //             </React.Fragment>
// // //           );
// // //         })}
// // //       </ul>
// // //     </nav>
// // //   );
// // // }
// // import React from 'react';
// // import {useActiveDocContext} from '@docusaurus/plugin-content-docs/client';
// // import {useLocation} from '@docusaurus/router';
// // import Link from '@docusaurus/Link';
// // import styles from './styles.module.css';

// // function DocBreadcrumbs() {
// //   const {pathname} = useLocation();
// //   const {activeDoc} = useActiveDocContext();
  
// //   if (!activeDoc) {
// //     return null;
// //   }

// //   // Create breadcrumbs based on URL path
// //   const pathParts = pathname
// //     .split('/')
// //     .filter(Boolean)
// //     .filter(part => part !== 'next'); // Remove version path if needed

// //   // If there's only one part (direct child of root), no breadcrumbs needed
// //   if (pathParts.length <= 1) {
// //     return null;
// //   }

// //   const breadcrumbs = [
// //     { label: 'Home', href: '/' },
// //     { label: 'Docs', href: '/' }
// //   ];

// //   // Build up the breadcrumb items based on the path
// //   let currentPath = '';
// //   for (let i = 0; i < pathParts.length - 1; i++) {
// //     currentPath += `/${pathParts[i]}`;
    
// //     // Skip version path components
// //     if (pathParts[i] === 'next' || pathParts[i].match(/^\d+\.\d+\.\d+$/)) {
// //       continue;
// //     }
    
// //     // Format the label (capitalize, replace hyphens with spaces)
// //     const label = pathParts[i]
// //       .split('-')
// //       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
// //       .join(' ');
    
// //     breadcrumbs.push({
// //       label,
// //       href: currentPath
// //     });
// //   }

// //   // Add current page
// //   breadcrumbs.push({
// //     label: activeDoc.title,
// //     href: pathname
// //   });

// //   return (
// //     <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
// //       <ul className="breadcrumbs__list">
// //         {breadcrumbs.map((item, idx) => {
// //           const isLast = idx === breadcrumbs.length - 1;
// //           return (
// //             <React.Fragment key={idx}>
// //               <li className="breadcrumbs__item">
// //                 {isLast ? (
// //                   <span className="breadcrumbs__link">{item.label}</span>
// //                 ) : (
// //                   <Link className="breadcrumbs__link" href={item.href}>
// //                     {item.label}
// //                   </Link>
// //                 )}
// //               </li>
// //               {!isLast && (
// //                 <li className="breadcrumbs__item breadcrumbs__item--separator">›</li>
// //               )}
// //             </React.Fragment>
// //           );
// //         })}
// //       </ul>
// //     </nav>
// //   );
// // }

// // export default DocBreadcrumbs;

// import React from 'react';
// import {useActiveDocContext} from '@docusaurus/plugin-content-docs/client';
// import {useLocation} from '@docusaurus/router';
// import Link from '@docusaurus/Link';
// import styles from './styles.module.css';

// function DocBreadcrumbs() {
//   const {pathname} = useLocation();
//   const {activeDoc} = useActiveDocContext();
  
//   if (!activeDoc) {
//     return null;
//   }

//   // Create breadcrumbs based on URL path
//   const pathParts = pathname
//     .split('/')
//     .filter(Boolean)
//     .filter(part => part !== 'next' && part !== 'wip-docs'); // Remove version path and repo name

//   // If there's only one part (direct child of root), no breadcrumbs needed
//   if (pathParts.length === 0) {
//     return null;
//   }

//   const breadcrumbs = [
//     { label: 'Home', href: '/' }
//   ];

//   // Build up the breadcrumb items based on the path
//   let currentPath = '';
//   for (let i = 0; i < pathParts.length - 1; i++) {
//     // Skip version path components
//     if (pathParts[i] === 'next' || pathParts[i].match(/^\d+\.\d+\.\d+$/)) {
//       continue;
//     }
    
//     // Add repo name to path if needed
//     if (currentPath === '') {
//       currentPath = '/wip-docs';
//     }
    
//     currentPath += `/${pathParts[i]}`;
    
//     // Format the label (capitalize, replace hyphens with spaces)
//     const label = pathParts[i]
//       .split('-')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ');
    
//     breadcrumbs.push({
//       label,
//       href: currentPath
//     });
//   }

//   // Add current page (only if we have a title)
//   if (activeDoc.title) {
//     breadcrumbs.push({
//       label: activeDoc.title,
//       href: pathname
//     });
//   }

//   return (
//     <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
//       <ul className="breadcrumbs__list">
//         {breadcrumbs.filter(item => item.label).map((item, idx) => {
//           const isLast = idx === breadcrumbs.filter(item => item.label).length - 1;
//           return (
//             <React.Fragment key={idx}>
//               <li className="breadcrumbs__item">
//                 {isLast ? (
//                   <span className="breadcrumbs__link">{item.label}</span>
//                 ) : (
//                   <Link className="breadcrumbs__link" href={item.href}>
//                     {item.label}
//                   </Link>
//                 )}
//               </li>
//               {!isLast && (
//                 <li className="breadcrumbs__item breadcrumbs__item--separator">›</li>
//               )}
//             </React.Fragment>
//           );
//         })}
//       </ul>
//     </nav>
//   );
// }

// export default DocBreadcrumbs;
import React from 'react';
import {useActiveDocContext} from '@docusaurus/plugin-content-docs/client';
import {useLocation} from '@docusaurus/router';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

function DocBreadcrumbs() {
  const {pathname} = useLocation();
  const {activeDoc} = useActiveDocContext();
  
  if (!activeDoc) {
    return null;
  }

  // Create breadcrumbs based on URL path
  const pathParts = pathname
    .split('/')
    .filter(Boolean)
    .filter(part => part !== 'next' && part !== 'wip-docs'); // Remove version path and repo name

  // If there's only one part (direct child of root), no breadcrumbs needed
  if (pathParts.length === 0) {
    return null;
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' }
  ];

  // Build clean breadcrumbs array
  const cleanBreadcrumbs = [];
  
  // Start with Home
  cleanBreadcrumbs.push({ label: 'Home', href: '/wip-docs/' });
  
  // Add path segments
  let currentPath = '/wip-docs';
  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];
    
    // Skip empty parts, version numbers, etc.
    if (!part || part === 'next' || part.match(/^\d+\.\d+\.\d+$/)) {
      continue;
    }
    
    currentPath += `/${part}`;
    
    // Format the label
    const label = part
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Don't add duplicate of current page
    if (i < pathParts.length - 1 || !activeDoc.title) {
      cleanBreadcrumbs.push({
        label,
        href: currentPath
      });
    }
  }
  
  // Add current page title as last item, if different from path
  if (activeDoc.title && activeDoc.title !== cleanBreadcrumbs[cleanBreadcrumbs.length - 1].label) {
    cleanBreadcrumbs.push({
      label: activeDoc.title,
      href: pathname
    });
  }

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
      <ul className="breadcrumbs__list">
        {cleanBreadcrumbs.map((item, idx) => {
          const isLast = idx === cleanBreadcrumbs.length - 1;
          return (
            <React.Fragment key={idx}>
              <li className="breadcrumbs__item">
                {isLast ? (
                  <span className="breadcrumbs__link">{item.label}</span>
                ) : (
                  <Link className="breadcrumbs__link" href={item.href}>
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
}

export default DocBreadcrumbs;