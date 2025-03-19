/**
 * For Docs dropdown Versions
 */

import React, { forwardRef, useEffect, useState } from "react";
import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { Check, ChevronDown, ChevronUp, ChevronUpIcon } from "react-feather";
import {
  useVersions,
  useActiveDocContext,
} from "@docusaurus/plugin-content-docs/client";
import { useDocsPreferredVersion } from "@docusaurus/theme-common";
import { useDocsVersionCandidates } from '@docusaurus/plugin-content-docs/client';
import { translate } from "@docusaurus/Translate";
import { useLocation, useHistory } from "@docusaurus/router";
import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem";
import Link from "@docusaurus/Link";

const getVersionMainDoc = (version) =>
  version.docs.find((doc) => doc.id === version.mainDocId);
export default function DocsVersionDropdownNavbarItem({
  mobile,
  docsPluginId,
  dropdownActiveClassDisabled,
  dropdownItemsBefore,
  dropdownItemsAfter,
  ...props
}) {
  const { search, hash } = useLocation();
  const [dropDown, setDropDown] = useState(false)
  const router = useHistory();
  const activeDocContext = useActiveDocContext(docsPluginId);
  const versions = useVersions(docsPluginId);
  const { savePreferredVersionName } = useDocsPreferredVersion(docsPluginId);
  const [currentVersion, setCurrentVersion] = useState("v3");

  const versionLinks = versions.map((version) => {
    const versionDoc =
      activeDocContext.alternateDocVersions[version.name] ??
      getVersionMainDoc(version);
    return {
      label: version.label,
      // preserve ?search#hash suffix on version switches
      to: `${versionDoc.path}${search}${hash}`,
      isActive: () => version === activeDocContext.activeVersion,
      isSelected: () => version.name === activeDocContext.preferredVersion,
      onClick: () => savePreferredVersionName(version.name),
    };
  });
  const items = [
    ...dropdownItemsBefore,
    ...versionLinks,
    ...dropdownItemsAfter,
  ];
  useEffect(() => {
    const { pathname, hash } = router.location;
    items.forEach((item) => {
      if (item.to == pathname) {
        setCurrentVersion(item.label);
      }
    });
  }, []);

  const dropdownVersion = useDocsVersionCandidates(docsPluginId)[0];
  const history = useHistory();
  // Mobile dropdown is handled a bit differently
  const dropdownLabel =
    mobile && items.length > 1
      ? translate({
        id: "theme.navbar.mobileVersionsDropdown.label",
        message: "Versions",
        description:
          "The label for the navbar versions dropdown on mobile view",
      })
      : dropdownVersion.label;

  // DROPDOWN FOR DOCS WITH ONE VERSION
  if (items.length <= 1) {
    return (
      <div
        className="flex !min-w-[80px] flex-row items-center justify-center rounded-lg 
       px-2 py-[11px] text-sm  text-[#14131d80] dark:text-[#FFFFFFBF]"
      >
        {dropdownLabel}
      </div>
    );
  }
  return (
    // VERSION DROPDOWN FOR DOCS WITH VERSIONS
    <div className="dropdown dropdown-end dropdown-bottom">
      <div
        tabIndex={0}
        className="btn flex w-[60px] cursor-pointer flex-row items-center bg-transparent"
       // className="btn flex w-[89px] cursor-pointer flex-row items-center bg-transparent"
        // className="btn flex w-[70px] !h-fit !min-h-fit flex-row items-center  justify-center rounded-lg bg-[#6851D6] !py-2 capitalize text-white gap-0 pl-3 px-0"
        onClick={
          () => {
            setDropDown(!dropDown)
          }
        }
      >

<label className="cursor-pointer border-x-0 border-b border-t-0 border-dashed border-[#14131d80] text-base lowercase text-[#14131d80] hover:text-[#6851D6] dark:border-[#7B7A8280] dark:text-[#FFFFFFBF] dark:hover:text-[#6851D6]">
          {dropdownLabel}
        </label>

        {/* <ChevronDown
              size={28}
              strokeWidth={1}
              className={`m-0 ${false ? "" : "-rotate-90"
                } stroke-white transition-transform duration-200 bg-[transparent]`}
            /> */}
      </div>
      {
        dropDown ?
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[9999] mt-[-4px] w-[60px] rounded-lg bg-gray-100 px-1 shadow dark:bg-gray-700 lg:bg-white"
          >
            {items.map((childItemProps, index) => (
              <li key={index}>
                <Link
                  className="text-[#14131d80] no-underline dark:border-[#7B7A8280] dark:text-[#FFFFFFBF]"
                  key={index}
                  to={childItemProps.to}
                >
                  {childItemProps.label}
                </Link>
              </li>
            ))}
          </ul>
          : ''

      }
    </div>
  );
}
