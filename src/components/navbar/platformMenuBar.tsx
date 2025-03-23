import React from "react";
import "./Navbar.css";

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
      icon: "https://img.icons8.com/material/96/dashboard-layout.png",
      description:'Learn the basic of CometChat messaging system.'
    },
    {
      name: "Features",
      icon: "https://img.icons8.com/external-kmg-design-glyph-kmg-design/64/external-shapes-graphic-design-kmg-design-glyph-kmg-design.png",
      description:"Enhance in-app messaging with CometChat's extensions."
    },
    {
      name: "Multi-tenancy",
      icon: "https://img.icons8.com/metro/52/parallel-tasks.png",
      description:"Manage multiple accounts efficiently with multi-tenancy."
    },
    {
      name: "Data Migration",
      icon: "https://img.icons8.com/ios-filled/100/data-in-both-directions.png",
      description:"Seamlessly migrate chats from other provider to CometChat."
    },
    {
      name: "Webhooks",
      icon: "https://img.icons8.com/material/96/dashboard-layout.png",
      description:"Receive real-time CometChat events via HTTP requests."
    }
  ];

  const extendData = [
    {
      name: "Notification",
      icon: "https://img.icons8.com/material/96/dashboard-layout.png",
      description:'Boost engagment by sending instant user notification.'
    },
    {
      name: "Moderation",
      icon: "https://img.icons8.com/material/96/dashboard-layout.png",
      description:"Ensure safety with advance content filtering tools."
    },
    {
      name: "AI Chatbots",
      icon: "https://img.icons8.com/material/96/dashboard-layout.png",
      description:"Automate conversations using AI-powered chatbot technology."
    },
    {
      name: "Insights",
      icon: "https://img.icons8.com/material/96/dashboard-layout.png",
      description:"Generate AI-powered insights for meaningful conversation."
    }
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
      name: "Android chat App (JAVA)",
      icon: "https://img.icons8.com/material/96/dashboard-layout.png",
    },
    {
      name: "Android chat App (Kotlin)",
      icon: "https://img.icons8.com/material/96/dashboard-layout.png",
    }
  ];

  return (
    <div className="dropdown-content">
      <div className="main-menu-container">
        <div className="menu-col-1">
          <span className="menu-heading">Chats & Calling</span>
          {chatsAndCalling.map((item, index) => (
            <div className="item-container-platform">
              <div className="item-container-platform-sub" key={index}>
                <img
                  src={item.icon}
                  style={{ marginRight: "10px", color:'#6A12E0!important' }}
                  height={"20px"}
                  width={"20px"}
                  alt={item.name}
                />
                <span>{item.name}</span>
              </div>
              <div className="item-container-desc" key={index}>
                <span>{item.description}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="vertical-line"></div>
        <div className="menu-col-1">
          <span className="menu-heading">Extend</span>
          {extendData.map((item, index) => (
            <div className="item-container-platform">
              <div className="item-container-platform-sub" key={index}>
                <img
                  src={item.icon}
                  style={{ marginRight: "10px", color:'#6A12E0!important' }}
                  height={"20px"}
                  width={"20px"}
                  alt={item.name}
                />
                <span>{item.name}</span>
              </div>
              <div className="item-container-desc" key={index}>
                <span>{item.description}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="vertical-line"></div>
        <div className="menu-col-1">
          <span className="menu-heading">SDKs</span>
          {sampleApps.map((item, index) => (
            <div className="item-container" key={index}>
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
      </div>
    </div>
  );
};

export default PlatformDropdownMenu;
