import React from "react";
import "./Navbar.css";
import { IconType } from "react-icons/lib";
import {
  MdDashboard,
  MdAccountTree,
  MdNotificationsActive,
  MdInsights,
} from "react-icons/md";
import { FaShapes } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import { RiFileCodeFill } from "react-icons/ri";
import { FaShield, FaRobot } from "react-icons/fa6";
import Link from "@docusaurus/Link";
// Define types for the items in the lists
interface MenuItem {
  icon: string;
  name: string;
}

// Define props for the DropdownMenu component

const PlatformDropdownMenu: React.FC = () => {
  const chatsAndCalling = [
    {
      name: "Overview",
      icon: MdDashboard,
      description: "Learn the basic of CometChat messaging system.",
    },
    {
      name: "Features",
      icon: FaShapes,
      description: "Enhance in-app messaging with CometChat's extensions.",
    },
    {
      name: "Multi-tenancy",
      icon: MdAccountTree,
      description: "Manage multiple accounts efficiently with multi-tenancy.",
    },
    {
      name: "Data Migration",
      icon: BiTransfer,
      description: "Seamlessly migrate chats from other provider to CometChat.",
    },
    {
      name: "Webhooks",
      icon: RiFileCodeFill,
      description: "Receive real-time CometChat events via HTTP requests.",
    },
  ];

  const extendData = [
    {
      name: "Notification",
      icon: MdNotificationsActive,
      description: "Boost engagment by sending instant user notification.",
    },
    {
      name: "Moderation",
      icon: FaShield,
      description: "Ensure safety with advance content filtering tools.",
    },
    {
      name: "AI Chatbots",
      icon: FaRobot,
      description:
        "Automate conversations using AI-powered chatbot technology.",
    },
    {
      name: "Insights",
      icon: MdInsights,
      description: "Generate AI-powered insights for meaningful conversation.",
    },
  ];

  const sampleApps = [
    {
      name: "React Chat App",
      icon: "https://img.icons8.com/color/144/react-native.png",
    },
    {
      name: "React Native Chat App",
      icon: "https://img.icons8.com/color/144/react-native.png",
    },
    {
      name: "iOS chat App",
      icon: "https://img.icons8.com/color/144/swift.png",
    },
    {
      name: "Android chat App (Java)",
      icon: "https://img.icons8.com/color/144/android-os.png",
    },
    {
      name: "Android chat App (Kotlin)",
      icon: "https://img.icons8.com/color/144/kotlin.png",
    },
  ];

  return (
    <div className="dropdown-content">
      <div className="main-menu-container">
        <div className="menu-col-1">
          <span className="menu-heading text-caption-1 font-semibold">
            Chats & Calling
          </span>
          {chatsAndCalling.map((item, index) => (
            <div className="item-container-platform">
              <div
                className="item-container-platform-sub text-caption-1 font-semibold"
                key={index}
              >
                <item.icon className="item-icon-react" />
                <span className="text-body-2 font-semibold">{item.name}</span>
              </div>
              <div className="text-caption-1 font-regular" key={index}>
                <span className="txtDesc">{item.description}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="vertical-line"></div>
        <div className="menu-col-1">
          <span className="menu-heading text-caption-1 font-semibold">Extend</span>
          {extendData.map((item, index) => (
            <div className="item-container-platform">
              <div
                className="item-container-platform-sub text-caption-1 font-semibold"
                key={index}
              >
                <item.icon className="item-icon-react" />
                <span className="text-body-2 font-semibold">{item.name}</span>
              </div>
              <div className="text-caption-1 font-regular" key={index}>
                <span className="txtDesc">{item.description}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="vertical-line"></div>
        <div className="menu-col-1">
          <span className="menu-heading text-caption-1 font-semibold">SDKs</span>
          {sampleApps.map((item, index) => (
            <div
              className="item-container text-body-2 font-medium"
              key={index}
            >
              <img
                src={item.icon}
                style={{ marginRight: "10px" }}
                height={"16px"}
                width={"16px"}
                alt={item.name}
              />
              <span>{item.name}</span>
            </div>
          ))}
        <div onClick={()=>{
          window.location.href = "/docs/sample-apps" 
        }} className={'see-all-apps-link text-caption-1 font-medium'}>
          {" "}
          {/* Adjust href as needed */}
          See All Apps
        </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformDropdownMenu;
