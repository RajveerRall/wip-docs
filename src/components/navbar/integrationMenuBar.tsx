import React from "react";
import "./Navbar.css";
import { RiUserSettingsLine } from "react-icons/ri";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

// Define props for the DropdownMenu component

const IntegrationDropdownMenu: React.FC = () => {
  const uiKitsList = [
    {
      name: "React",
      icon: "https://img.icons8.com/color/144/react-native.png",
    },
    {
      name: "React Native",
      icon: "https://img.icons8.com/color/144/react-native.png",
    },
    {
      name: "ios",
      icon: "https://img.icons8.com/color/144/swift.png",
    },
    {
      name: "Android",
      icon: "https://img.icons8.com/color/144/android-os.png",
    },
    {
      name: "Flutter",
      icon: "https://img.icons8.com/color/144/flutter.png",
    },
  ];

  const sdks = [
    {
      name: "React",
      icon: "https://img.icons8.com/color/144/react-native.png",
    },
    {
      name: "React Native",
      icon: "https://img.icons8.com/color/144/react-native.png",
    },
    {
      name: "ios",
      icon: "https://img.icons8.com/color/144/swift.png",
    },
    {
      name: "Android",
      icon: "https://img.icons8.com/color/144/android-os.png",
    },
    {
      name: "Flutter",
      icon: "https://img.icons8.com/color/144/flutter.png",
    },
    {
      name: "Ionic/Capacitor",
      icon: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-ionic-a-complete-open-source-sdk-for-hybrid-mobile-app-development-logo-color-tal-revivo.png",
    },
  ];

  const widgets = [
    {
      name: "Wordpress /BuddyPress",
      icon: "https://img.icons8.com/color/144/wordpress.png",
    },
    {
      name: "HTML/ Bootstrap/ JQuery",
      icon: "https://img.icons8.com/color/144/html-5--v1.png",
    },
  ];

  const apis = [
    {
      name: "Chat APIs",
      icon: IoChatboxEllipsesOutline,
    },
    {
      name: "Managment API",
      icon: RiUserSettingsLine,
    },
  ];

  return (
    <div className="dropdown-content">
      <div className="main-menu-container">
        {/* Column 1: UI Kits */}
        <div className="menu-col-1">
          <span className="menu-heading text-caption-1 font-semibold">
            UI Kits
          </span>
          {uiKitsList.map((item, index) => (
            <div
              className="item-container text-body-2 font-medium"
              key={index}
            >
              <img
                src={item.icon}
                style={{ marginRight: "10px" }}
                height={"20px"}
                width={"20px"}
                alt={item.name}
              />
              <span
               
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Vertical Separator 1 */}
        <div className="vertical-line"></div>

        {/* Column 2: SDKs */}
        <div className="menu-col-1">
          <span className="menu-heading text-caption-1 font-semibold">SDKs</span>
          {sdks.map((item, index) => (
            <div
              className="item-container text-body-2 font-medium"
              key={index}
            >
              <img
                src={item.icon}
                style={{ marginRight: "10px" }}
                height={"20px"}
                width={"20px"}
                alt={item.name}
              />
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {/* Vertical Separator 2 */}
        <div className="vertical-line"></div>


        {/* Column 3: Widgets & APIs */}
        <div className="menu-col-1">
          {/* Widgets Section */}
          <div>
            <span className="menu-heading text-caption-1 font-semibold">
              Widgets
            </span>
            {widgets.map((item, index) => (
              <div
                className="item-container text-body-2 font-medium"
                key={index}
              >
                <img
                  src={item.icon}
                  style={{ marginRight: "10px" }}
                  height={"20px"}
                  width={"20px"}
                  alt={item.name}
                />
                <span>{item.name}</span>
              </div>
            ))}
          </div>

          {/* Horizontal Separator */}
          {/* No inline style needed here - handled by CSS */}
          <div
            className="horizontal-line"
            style={{ marginTop: "10px", marginBottom: "10px" }} // Add margin here to space out sections
          ></div>

          {/* APIs Section */}
          <div>
            <span
              className="menu-heading text-caption-1 font-semibold"
             // style={{ marginBottom: "20px!important" }} // Can control spacing via margin-top on this span or margin-bottom on horizontal line
            >
              APIs
            </span>
            {apis.map((item, index) => (
              <div
                className="item-container text-body-2 font-medium"
                key={index}
              >
                <item.icon className="item-icon-react" /> {/* Added class */}
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationDropdownMenu;