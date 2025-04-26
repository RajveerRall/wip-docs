// src/components/resources/additional-resources.tsx
import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./additionalResourec.module.css";

interface ResourceItem {
  title: string;
  description: string;
  iconSrc: string; // Path to SVG icon
  link: string;
}

const resources: ResourceItem[] = [
  {
    title: "Sample Apps",
    description: "Reference implementations for quick starts",
    iconSrc: "imgs/icons/sample-apps.svg",
    link: "/sample-apps",
  },
  {
    title: "APIs",
    description: "API reference for integration & management.",
    iconSrc: "imgs/icons/apis.svg",
    link: "/api-reference",
  },
  {
    title: "Product Updates",
    description: "New features and platform updates",
    iconSrc: "imgs/icons/product-updates.svg",
    link: "/product-updates",
  },
  {
    title: "Feature Updates",
    description: "Direct input into product roadmap",
    iconSrc: "imgs/icons/feature-updates.svg",
    link: "/feature-updates",
  },
  {
    title: "UI Kits",
    description: "Component library with full styling control",
    iconSrc: "imgs/icons/ui-kits.svg",
    link: "/ui-kits",
  },
  {
    title: "SDKs",
    description: "Native SDKs for deep integration",
    iconSrc: "imgs/icons/sdks.svg",
    link: "/sdks",
  },
  {
    title: "Community",
    description: "Implementation guides and troubleshooting tips",
    iconSrc: "imgs/icons/community.svg",
    link: "/community",
  },
  {
    title: "Help Center",
    description: "Platform knowledge base and FAQs",
    iconSrc: "imgs/icons/help-center.svg",
    link: "/help-center",
  },
  {
    title: "Office Hours",
    description: "Live technical guidance for implementations",
    iconSrc: "imgs/icons/office-hours.svg",
    link: "/office-hours",
  },
  {
    title: "Report an Issue",
    description: "Direct support for technical issues",
    iconSrc: "imgs/icons/report-an-issue.svg",
    link: "/report-issue",
  },
];

export default function AdditionalResources() {
  return (
    <div className={styles.resourcesSection}>
      <p className={`${styles.title} text-h1 font-semibold`}>Additional Resource</p>

      <div className={styles.resourceGrid}>
        {resources.map((resource, index) => (
          <div
            key={index}
            // href={useBaseUrl(resource.link)}
            className={styles.resourceCard}
          >
            <div className={styles.iconBox}>
              <img
                src={useBaseUrl(resource.iconSrc)}
                alt={`${resource.title} icon`}
                className={styles.icon}
              />
            </div>
            <div className={styles.contentContainer}>
              <p className={`${styles.resourceTitle} text-h4 font-semibold`}>{resource.title}</p>
              <p className={`${styles.resourceDescription} text-body-1 font-regular`}>
                {resource.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
