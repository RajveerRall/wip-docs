import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";

function formatLink(base, title) {
  // from React to react and From React Native to react-native
  return base + title.toLowerCase().replace(" ", "-");
}

const DATA = [
  {
    title: "Chat & Calling",
    items: [
      {
        title: "Overview",
        icon: "message-chat-circle.svg",
        description: "What is CometChat?",
        // link: "/fundamentals/overview",
        link: useBaseUrl("/"),
      },
      {
        title: "Features",
        icon: "puzzle.svg",
        description: "Enhance in-app messaging with CometChat Extensions.",
        // link: "/fundamentals/features-core",
        link: useBaseUrl("/"),
      },
      {
        title: "Multi-tenancy",
        icon: "dataflow.svg",
        // link: "/fundamentals/multi-tenancy-overview",
        description: "Multi-tenancy for better management.",
        link: useBaseUrl("/"),
      },
      {
        title: "Data migration",
        icon: "folder.svg",
        // link: "/fundamentals/data-import-and-migration-overview",
        description: "Migrate from your current chat provider to CometChat.",
        link: useBaseUrl("/"),
      },
      {
        title: "Webhooks",
        icon: "terminal.svg",
        // link: "/fundamentals/webhooks-overview",
        link: useBaseUrl("/"),
        description:
          "Subscribe to CometChat events and receive them via HTTP Post requests on your server.",
      },
    ],
  },
  {
    title: "Extend",
    items: [
      {
        title: "Notifications",
        icon: "notifications-bell.svg",
        // link: "/notifications/overview",
        link: useBaseUrl("/"),
        description:
          "Increase user engagement by sending them updates via notifications.",
      },
      {
        title: "Moderation",
        icon: "moderation.svg",
        // link: "/moderation/overview",
        link: useBaseUrl("/"),
        description:
          "Maintain platform integrity with advanced content rule and keyword management.",
      },
      {
        title: "AI Chatbots",
        icon: "bots.svg",
        // link: "/ai-chatbots/overview",
        link: useBaseUrl("/"),
        description:
          "Ignite natural and organic conversations using CometChat AI.",
      },
      {
        title: "Insights",
        icon: "insights.svg",
        // link: "/insights",
        link: useBaseUrl("/"),
        description:
          "Ignite natural and organic conversations using CometChat AI.",
      },
    ],
  },
  {
    title: "Sample Apps",
    items: [
      {
        title: "React Chat App",
        icon: "react.svg",
        link: "https://github.com/cometchat/cometchat-uikit-react/tree/v6/sample-app",
        description: "",
      },
      {
        title: "React Native Chat App",
        icon: "react.svg",
        link: "https://github.com/cometchat-pro/cometchat-chat-sample-app-react-native",
        description: "",
      },
      {
        title: "iOS Chat App",
        icon: "swift.svg",
        link: "https://github.com/cometchat/cometchat-sample-app-ios/tree/v5",
        description: "",
      },
      {
        title: "Android Chat App (Java)",
        icon: "android1.svg",
        link: "https://github.com/cometchat/cometchat-uikit-android/tree/v5/sample-app-java",
        description: "",
      },
      {
        title: "Android Chat App (Kotlin)",
        icon: "android1.svg",
        link: "https://github.com/cometchat/cometchat-uikit-android/tree/v5/sample-app-kotlin",
        description: "",
      },
    ],
  },
];

function Platform() {
  return (
    <div
      className="flex w-full max-w-full flex-wrap bg-[#191822]"
      style={{
        background: "linear-gradient(270deg, #1E1D27 30%, transparent 30%)",
      }}
    >
      {/* <div
        className=" m-auto flex w-full max-w-[1400px] flex-col items-start md:flex-row md:justify-between"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <CardOverview {...DATA[0]} />
          <CardOverview {...DATA[1]} />
        </div>
        <CardSamples {...DATA[2]} />
      </div> */}

      <div
        className=" m-auto flex w-full max-w-[1400px] flex-col items-start md:flex-row md:justify-between"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <CardOverview {...DATA[0]} />
          <CardOverview {...DATA[1]} />
        </div>

        {/* <CardOverview {...DATA[1]} /> */}

        <CardSamples {...DATA[2]} />
      </div>

      {/* <div className=" m-auto flex w-full max-w-[1400px] flex-col items-start md:flex-row md:justify-between">
        <CardOverview {...DATA[0]} />
      

        <CardSamples {...DATA[2]} />
      </div> */}
    </div>
  );
}

export default Platform;

function CardOverview({ title, items }) {
  return (
    <div className="ml-2 flex  w-full flex-1 flex-col items-start justify-start bg-[#191822] py-4  md:ml-0">
      <h2
        className="mb-5  font-satoshi text-[#FAFAFF] text-opacity-[54%]"
        style={{ lineHeight: "23.32px", fontSize: "22px" }}
      >
        {title}
      </h2>
      <div className="flex flex-wrap gap-4">
        {items.map((item, idx) => (
          <Link
            className="w-[100%] hover:no-underline md:w-[30%] "
            href={item.link}
            key={idx}
            onClick={() => {
              window.location.href = item.link;
            }}
          >
            <div className="card-nav-bar flex flex-col  justify-start">
              <div
                className={`flex flex-row items-center justify-start space-x-1 text-left text-xs text-[#FAFAFF]`}
              >
                <img
                  className="mr-1 h-4 object-contain "
                  src={useBaseUrl(`/imgs/icons/${item.icon}`)}
                  alt={item.title}
                />

                <p
                  className={`m-0 w-1/6  whitespace-nowrap font-satoshi text-opacity-[84%] hover:text-cst-text-purple`}
                  style={{ fontSize: "16px", lineHeight: "17.92px" }}
                >
                  {item.title}
                </p>
              </div>

              <p
                className="mt-2 font-satoshi  text-[#FAFAFF]"
                style={{
                  fontWeight: "600",
                  fontSize: "14px",
                  lineHeight: "19.6px",
                  opacity: "50%",
                }}
              >
                {" "}
                {item.description}
              </p>
            </div>
            {/* <p className="invisible text-sm text-[#FAFAFF] text-opacity-[54%]">
              {item.description}
            </p> */}
          </Link>
        ))}
      </div>
    </div>
  );
}

function CardSamples({ title, items }) {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start bg-[#1E1D27] py-6 pl-4 md:w-auto md:py-10 md:pl-12 md:pr-20">
      <h2
        className="mb-5  font-satoshi text-[#FAFAFF] text-opacity-[54%]"
        style={{ lineHeight: "23.32px", fontSize: "22px" }}
      >
        {title}
      </h2>
      <div className="flex flex-col items-start gap-4">
        {items.map((item, item_index) => (
          <Link
            target="_blank"
            className="card-nav-bar hover:no-underline"
            href={item.link}
            key={item_index}
          >
            <div
              className={`flex flex-row items-center justify-start space-x-1 text-left text-xs text-[#FAFAFF]`}
            >
              <img
                className="mr-1 h-6 object-contain grayscale "
                src={useBaseUrl(`/imgs/logos/${item.icon}`)}
                alt={item.title}
              />
              <p
                className="m-0 whitespace-nowrap  font-satoshi text-[#fafaff] text-opacity-[84%]"
                style={{
                  fontWeight: "600",
                  fontSize: "16px",
                  lineHeight: "17.92px",
                }}
              >
                {item.title}
              </p>
            </div>
          </Link>
        ))}
        <Link
          target="_blank"
          className="font-satoshi text-lg text-[#6851D6] hover:no-underline"
          style={{ fontWeight: "600", lineHeight: "20.16px", fontSize: "18px" }}
          href="https://github.com/cometchat"
        >
          See all apps
        </Link>
      </div>
    </div>
  );
}
