/**
 * Navbar dropdown for Overview and Implementation
 */

import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import {
  isRegexpStringMatch,
  useCollapsible,
  Collapsible,
} from "@docusaurus/theme-common";
import {
  isSamePath,
  useLocalPathname,
} from "@docusaurus/theme-common/internal";
import SectionsMenu from "@site/src/components/SectionsMenu";
import NavbarNavLink from "@theme/NavbarItem/NavbarNavLink";
import NavbarItem from "@theme/NavbarItem";
import Implementation from "@site/src/components/navbar/Implementation";
import Overview from "@site/src/components/navbar/Overview";
import Extend from "@site/src/components/navbar/Extend";
import Platform from "@site/src/components/navbar/Platform";

import { ChevronDown } from "react-feather";

function isItemActive(item, localPathname) {
  if (isSamePath(item.to, localPathname)) {
    return true;
  }
  if (isRegexpStringMatch(item.activeBaseRegex, localPathname)) {
    return true;
  }
  if (item.activeBasePath && localPathname.startsWith(item.activeBasePath)) {
    return true;
  }
  return false;
}

function containsActiveItems(items, localPathname) {
  return items.some((item) => isItemActive(item, localPathname));
}
function DropdownNavbarItemDesktop({
  items,
  position,
  className,
  isVersions,
  onClick,
  ...props
}) {
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  /*** Handle Mouse Out for Nav Bar ****/
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 100);
  };
  /****End Of: Handle Mouse Out for Nav Bar*****/

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current || dropdownRef.current.contains(event.target)) {
        return;
      }

      setShowDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("focusin", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("focusin", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <div
      ref={dropdownRef}
      style={{}}
      onClick={(e) => {
        setShowDropdown(!showDropdown);
        onClick && onClick(e);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={clsx(
        "navbar__item",
        "dropdown",

        isVersions
          ? "version--dropdown dropdown--hoverable--versions "
          : "dropdown--hoverable ",

        {
          "dropdown--right": position === "right",
          "dropdown--show": showDropdown,
        }
      )}
    >
      {/* NAVBAR DROPDOWN */}
      <NavbarNavLink
        aria-haspopup="true"
        aria-expanded={showDropdown}
        role="button"
        href={props.to ? undefined : "#"}
        className={clsx(`navbar__link font-satoshi`, className)}
        label={props.label}
        onClick={props.to ? undefined : (e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            setShowDropdown(!showDropdown);
          }
        }}
      >
        {props.children ?? props.label}
      </NavbarNavLink>
      <ul className="dropdown__menu">
        {props.label === "Platform" && <Platform />}
        {props.label === "Integrate" && <Implementation />}
        {props.label === "Extend" && <Extend />}
        {props.label !== "Platform" &&
          props.label !== "Integrate" &&
          props.label !== "Extend" &&
          items.map((childItemProps, i) => (
            <NavbarItem
              isDropdownItem
              activeClassName="dropdown__link--active"
              {...childItemProps}
              key={i}
            />
          ))}
      </ul>
    </div>
  );
}
function DropdownNavbarItemMobile({
  items,
  className,
  position, // Need to destructure position from props so that it doesn't get passed on.
  onClick,
  isVersions,
  ...props
}) {
  const localPathname = useLocalPathname();
  const containsActive = containsActiveItems(items, localPathname);
  const { collapsed, toggleCollapsed, setCollapsed } = useCollapsible({
    initialState: () => !containsActive,
  });
  // Expand/collapse if any item active after a navigation
  useEffect(() => {
    if (containsActive) {
      setCollapsed(!containsActive);
    }
  }, [localPathname, containsActive, setCollapsed]);
  return (
    <li
      className={clsx("menu__list-item", {
        "menu__list-item--collapsed": collapsed,
      })}
    >
      <NavbarNavLink
        role="button"
        className={clsx(
          "menu__link menu__link--sublist menu__link--sublist-caret",
          className
        )}
        {...props}
        onClick={(e) => {
          e.preventDefault();
          toggleCollapsed();
        }}
      >
        {props.children ?? props.label}
      </NavbarNavLink>
      <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
        {items.map((childItemProps, i) => (
          <NavbarItem
            mobile
            isDropdownItem
            onClick={onClick}
            activeClassName="menu__link--active"
            {...childItemProps}
            key={i}
          />
        ))}
      </Collapsible>
    </li>
  );
}
export default function DropdownNavbarItem({
  mobile = false,
  isVersions = false,
  ...props
}) {
  const Comp = mobile ? DropdownNavbarItemMobile : DropdownNavbarItemDesktop;
  return <Comp isVersions={isVersions} {...props} />;
}
