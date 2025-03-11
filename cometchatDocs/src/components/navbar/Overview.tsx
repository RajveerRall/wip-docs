import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";

function formatLink(base, title) {
  // from React to react and From React Native to react-native
  return base + title.toLowerCase().replace(" ", "-");
}

const DATA = [
  {
    title: "Articles",
    items: [
      {
        title: "Help Center",
        icon: "help.svg",
        link: "/articles/import-messages",
        description:
          " Learn about the best practices, constraints, data imports and more.",
      },
      {
        title: "Error guide",
        icon: "warning.svg",
        link: "/articles/error-guide",
        description:
          "Understand the error types and why they occur.",
      },


    ],
  },
  {
    title: "Sample Apps",
    items: [
      {
        title: "React Chat App",
        icon: "react.svg",
        link: "https://github.com/cometchat-pro/cometchat-chat-sample-app-react",
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
        link: "https://github.com/cometchat-pro/cometchat-chat-sample-app-ios-swift",
        description: "",
      },
      {
        title: "Android Chat App (Java)",
        icon: "android1.svg",
        link: "https://github.com/cometchat/cometchat-chat-sample-app-android-java",
        description: "",
      },
      {
        title: "Android Chat App (Kotlin)",
        icon: "android1.svg",
        link: "https://github.com/cometchat/cometchat-sample-app-android-kotlin",
        description: "",
      },
    ],
  },
];

function Overview() {
  return (
    <div className="flex w-full max-w-full flex-wrap bg-[#191822]" style={{
      background: "linear-gradient(270deg, #1E1D27 30%, transparent 30%)"
    }}>
      <div className=" flex w-full flex-col max-w-[1400px] items-start md:flex-row m-auto md:justify-between">
        <CardOverview {...DATA[0]} />
        <CardSamples {...DATA[1]} />
      </div>
    </div>
  );
}

export default Overview;

function CardOverview({ title, items }) {
  return (
    <div className="flex md:min-h-[350px]  w-full flex-1 flex-col items-start justify-start bg-[#191822] py-4  md:py-10 ml-2 md:ml-0">
      <h2 className="mb-5 text-[#FAFAFF] text-opacity-[54%] font-satoshi" style={{ fontSize: "18px", lineHeight: "20.16px", fontWeight: "600" }}>
        {title}
      </h2>
      <div className="flex gap-4 flex-wrap">
        {items.map((item, idx) => (
          <Link
            className="hover:no-underline w-[100%] md:w-[30%] "
            href={item.link}
            key={idx}
          >
            <div className="flex flex-col justify-start  card-nav-bar">
              <div
                className={`flex flex-row items-center justify-start space-x-1 text-left text-xs text-[#FAFAFF]`}
              >
                <img
                  className="mr-1 h-4 object-contain "
                  src={useBaseUrl(`/imgs/icons/${item.icon}`)}
                  alt={item.title}
                />

                <p className="m-0 whitespace-nowrap  text-[#fafaff] text-opacity-[84%] hover:text-cst-text-purple font-satoshi" style={{ fontWeight: "600", fontSize: "16px", lineHeight: "17.92px", opacity: "74%" }}>
                  {item.title}
                </p>
              </div>

              <p className="text-[#FAFAFF] font-satoshi  mt-2" style={{ fontWeight: "600", fontSize: "14px", lineHeight: "19.6px", opacity: "50%" }}> {item.description}</p>
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
      <h2 className="mb-6   text-[#FAFAFF] text-opacity-[54%] font-satoshi" style={{ fontWeight: "600", fontSize: "18px", lineHeight: "20.16px" }}>
        {title}
      </h2>
      <div className="flex flex-col items-start gap-4">
        {items.map((item, item_index) => (
          <Link
            target="_blank"
            className="hover:no-underline card-nav-bar"
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
              <p className="m-0 whitespace-nowrap  text-[#fafaff] text-opacity-[84%] font-satoshi" style={{ fontWeight: "600", fontSize: "16px", lineHeight: "17.92px" }}>
                {item.title}
              </p>
            </div>
          </Link>
        ))}
        <Link
          target="_blank"
          className="text-lg text-[#6851D6] hover:no-underline font-satoshi"
          style={{ fontWeight: "600", lineHeight: "20.16px", fontSize: "18px" }}
          href="https://github.com/cometchat"
        >
          See all apps
        </Link>
      </div>
    </div>
  );
}
