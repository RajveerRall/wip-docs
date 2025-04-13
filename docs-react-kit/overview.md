---
sidebar_position: 1
title: Overview
# slug: /overview # Remove slug if you want it at /ui-kits/react/next/overview
---
import React from "react"; // Import React
import { ChevronRight } from "react-feather"; // Import from react-feather
import './QuickLinks.css'; // Import CSS (we'll create this)
import useBaseUrl from '@docusaurus/useBaseUrl'; // Hook to get base URL for images

{/* Define QuickLinks component directly here (as per original) */}
const QuickLinks = ({ links }) => {
  const baseUrl = useBaseUrl('/'); // Get base URL
  return (
    <div className="quick-links">
      <div className="quick-links__header">Quick Links</div>
      <ul className="quick-links__list">
        {links.map((link, index) => (
          <li key={index} className="quick-links__item">
            {/* Use target="_blank" for external links */}
            <a href={link.link} target={link.link.startsWith('http') ? '_blank' : '_self'} className="quick-links__link">
              <div className="quick-links__icon">
                 {/* Prepend base URL to relative icon paths */}
                <img src={baseUrl + link.icon.replace(/^\//, '')} alt="" />
              </div>
              <div className="quick-links__content">
                <div className="quick-links__title">{link.title}</div>
                <div className="quick-links__description">
                  {link.description}
                </div>
              </div>
              <div className="quick-links__arrow">
                <ChevronRight size={20} />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
{/* End of QuickLinks component definition */}


# **CometChat UI Kit for React**

The **CometChat UI Kit** for React is a powerful solution... (rest of your intro text)

---

## **Why Choose CometChat UI Kit?**
- **Rapid Integration** – Prebuilt UI components for faster deployment.
- **Customizable & Flexible** – Modify the UI to align with your brand’s identity.
- **Cross-Platform Compatibility** – Works seamlessly across various React-based frameworks.
- **Scalable & Reliable** – Built on CometChat's **robust chat infrastructure** for enterprise-grade performance.

---

## **User Interface Preview**
{/* Use absolute path from static folder */}
![UI Preview](/assets/intro_web_screens.png)

---

## **Try Live Demo**
**Experience the CometChat UI Kit in action:**

[![Launch Live Demo](https://img.shields.io/badge/%F0%9F%9A%80_Launch_Live_Demo-007ACC?style=for-the-badge&logo=visual-studio-code&labelColor=333)](https://link.cometchat.com/cometchat-demo)

[![Edit React - Conversation List + Message Experience](https://codesandbox.io/static/img/play-codesandbox.svg)](https://link.cometchat.com/react-conversation-list-message)
> **Tip:** You can **fork** the sandbox... (rest of your text)

---

## **Integration Options**
CometChat UI Kit works with **React.js** and **Next.js**:

{/* Adjust relative links if needed */}
- **[React.js Guide](./react-js-integration)** – For React apps.
- **[Next.js Guide](./next-js-integration)** – For Next.js apps.

---

## **Next Steps for Developers**
{/* Adjust paths if needed - these look like they might be outside react-kit */}
1. **Learn the Basics** – [Key Concepts](/fundamentals/key-concepts).
2. **Pick a Framework** – React.js or Next.js.
3. **Follow the Setup Guide** – [React.js](./react-js-integration) | [Next.js](./next-js-integration).
4. **Customize UI** – Adjust [styles, themes](./theme), and [components](./components-overview).
5. **Test & Deploy** – Run tests and launch your chat app.

---

## **Helpful Resources**
Explore these essential resources...

{/* Keep your styled divs as they are valid JSX */}
<div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
  {/* Resource 1 */}
  <div style={{ flex: '1', minWidth: '300px', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', textAlign: 'center'}}>
    <h4>🚀 React Sample App</h4>
    <p>Fully functional sample applications to accelerate your development.</p>
    <a href="https://github.com/cometchat/cometchat-uikit-react/tree/v6/sample-app" target="_blank" style={{ color: '#6851D6', fontWeight: 'bold' }}>View on GitHub</a>
  </div>
  {/* Resource 2 */}
  <div style={{ flex: '1', minWidth: '300px', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', textAlign: 'center' }}>
    <h4>📦 UI Kit Source Code</h4>
    <p>Access the complete UI Kit source code on GitHub.</p>
    <a href="https://github.com/cometchat/cometchat-uikit-react/tree/v6" target="_blank" style={{ color: '#6851D6', fontWeight: 'bold' }}>View on GitHub</a>
  </div>
  {/* Resource 3 */}
  <div style={{ flex: '1', minWidth: '300px', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', textAlign: 'center'}}>
    <h4>🎨 Figma Design File</h4>
    <p>UI design resources for customization and prototyping.</p>
    <a href="https://www.figma.com/community/file/1442863561340379957/cometchat-ui-kit-for-web" target="_blank" style={{ color: '#6851D6', fontWeight: 'bold' }}>View on Figma</a>
  </div>
</div>

---

## **💡 Need Help?**
If you need assistance, check out:
- 💬 [Developer Community](http://community.cometchat.com/)
- ❓ [Support Portal](https://help.cometchat.com/hc/en-us/requests/new)

---

{/* Note: The QuickLinks component itself is NOT rendered here by default. */}
{/* If you want to RENDER it, you need data and call it like: */}
{/* <QuickLinks links={yourQuickLinksDataArray} /> */}