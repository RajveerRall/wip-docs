// src/theme/Footer/index.js
import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const SOCIAL_MEDIA = [
  {
    title: "Facebook",
    href: "https://www.facebook.com/cometchat/",
    icon: "facebook.svg",
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/company/cometchat/",
    icon: "linkedin.svg",
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/cometchat/",
    icon: "instagram.svg",
  },
  {
    title: "Twitter",
    href: "https://twitter.com/CometChat",
    icon: "x.svg",
  },
  {
    title: "GitHub",
    href: "https://www.github.com/cometchat",
    icon: "github.svg",
  },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Copyright */}
        <div className={styles.copyright}>
          <p>2025 © CometChat</p>
        </div>
        
        {/* Social Media */}
        <div className={styles.socialLinks}>
          {SOCIAL_MEDIA.map((item) => (
            <a
              target="_blank"
              rel="noopener noreferrer"
              key={item.title}
              href={item.href}
              className={styles.socialLink}
            >
              <img
                className={styles.socialIcon}
                src={useBaseUrl(`/imgs/icons/${item.icon}`)}
                alt={item.title}
              />
              <span className={styles.socialText}>{item.title}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;