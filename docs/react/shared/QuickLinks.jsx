import React from "react";
import "./QuickLinks.css";
import { ChevronRight } from "react-feather";

const QuickLinks = ({ links }) => {
  return (
    <div className="quick-links">
      <div className="quick-links__header">Quick Links</div>
      <ul className="quick-links__list">
        {links.map((link, index) => (
          <li key={index} className="quick-links__item">
            <a href={link.link} target="_blank" className="quick-links__link">
              <div className="quick-links__icon">
                <img src={link.icon}></img>
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

export default QuickLinks;
