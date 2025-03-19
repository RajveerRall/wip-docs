import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import clsx from "clsx";
import React from "react";

function formatLink(base, link) {
  // from React to react and From React Native to react-native
  if (base == "/widget/") {
    return base + link;
  }
  return base + link + "/" + "overview";
}

const DATA = [
  {
    title: "UI Kits",
    base: "/",
    items: [
      {
        title: "React",
        icon: "react.svg",
        link: "ui-kit/react/v6",
      },
      {
        title: "React Native",
        icon: "react.svg",
        link: "ui-kit/react-native",
      },
      {
        title: "iOS",
        icon: "swift.svg",
        link: "ui-kit/ios/v5",
      },
      {
        title: "Android",
        icon: "android1.svg",
        link: "ui-kit/android/v5",
      },
      {
        title: "Flutter",
        icon: "kotlin.svg",
        link: "ui-kit/flutter",
      },
      {
        title: "Angular",
        icon: "angular.svg",
        link: "ui-kit/angular",
      },
      {
        title: "Vue",
        icon: "vue.svg",
        link: "ui-kit/vue",
      }
    ],
  },
  {
    title: "SDKs",
    base: "/",
    items: [
      {
        title: "JavaScript",
        icon: "javascript.svg",
        link: "sdk/javascript",
      },
      {
        title: "React Native",
        icon: "react.svg",
        link: "sdk/react-native",
      },
      {
        title: "iOS",
        icon: "swift.svg",
        link: "sdk/ios",
      },
      {
        title: "Android",
        icon: "android1.svg",
        link: "sdk/android",
      },
      {
        title: "Flutter",
        icon: "flutter.svg",
        link: "sdk/flutter",
      },
      {
        title: "Ionic/Capacitor",
        icon: "ionic.svg",
        link: "sdk/ionic",
      },
    ],
  },

  {
    title: "Widgets",
    base: "/widget/",
    items: [
      {
        title: "WordPress / BuddyPress",
        icon: "wp.svg",
        link: "wordpress-buddypress",
      },
      {
        title: "HTML / Bootstrap / jQuery",
        icon: "html.svg",
        link: "html-bootstrap-jquery",
      },
    ],
  },
  {
    title: "APIs",
    base: "",
    items: [
      {
        title: "Chat APIs",
        icon: "message-chat-circle.svg",
        link: "https://api-explorer.cometchat.com/reference/chat-apis",
        description: "Connect CometChat with your app and programatically manage users, groups and conversations with our Chat APIs."
      }, {
        title: "Management APIs",
        icon: "Solid.svg",
        link: "https://api-explorer.cometchat.com/reference/management-apis",
        description: "Create and manage your CometChat apps, trigger webhooks and access dashboard features with our Management APIs."
      },

    ],
  },
];

function Implementation() {
  return (

    <div className="flex w-full max-w-full flex-wrap bg-[#191822]">
      <div className="w-full nav-bar-build" >
        <div className="flex w-full flex-col h-full max-w-[1400px] items-start justify-between m-auto md:flex-row ">
          {DATA.map((card, index) => (
            <>
              <Card index={index} {...card} key={card.title} />
              {index < 2 ? <div className="hidden md:block md:border-l border-solid border-cst-text-purple h-56 w-0 mt-6 " style={{ border: '0.5px', borderImageSource: 'linear-gradient(360deg, rgba(39, 39, 48, 0) -0.22%, #272730 24.78%, #272730 49.78%, #272730 74.78%, rgba(39, 39, 48, 0) 99.78%, rgba(39, 39, 48, 0) 99.78%)', borderImageSlice: 1 }}>

              </div> : ""}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Implementation;

function Card({ title, items, base, index }) {
  return (

    <div
      className={clsx(
        "flex h-full flex-1 flex-col items-start justify-start ml-2 md:ml-0 py-4  md:py-10 border-r-4 border-white ",
        index != 3 ? " md:pr-7 " : "pr-4 md:pl-10 ",
        [1, 2].includes(index) ? 'md:pl-7' : '',
        /* index == 1 || index == 2 ? "bg-[#272730]" : "bg-[#191822]" */
        index == 3 ? "bg-[#1E1D27] pr-0" : "bg-[#191822]"
      )}
    >

      <h2 className="mb-5  text-[#FAFAFF] text-opacity-[54%] font-satoshi" style={{ lineHeight: "23.32px", fontSize: "22px" }}>
        {title}
      </h2>


      <div className={`flex  gap-2 md:gap-4 ${title === "Widgets" ? "flex-col" : "flex-wrap "} ${title === "APIs" ? "flex-col" : "flex-wrap "}`}>
        {items.map((item, item_index) => (
          <Link
            href={title == "APIs" ? item.link : formatLink(base, item.link)}
            key={item.title}
            className={`flex flex-row items-center justify-start w-full hover:no-underline  ${title === "APIs" ? "" : "sm:w-[45%]"} ${item_index < 4 ? " col-start-1 row-auto" : `col-start-2`
              }
            space-x-1 text-left text-xs text-[#FAFAFF]`}
            style={{
              gridRowStart: item_index < 4 ? "auto" : item_index - 3,
              gridColumnStart: item_index < 4 ? 1 : 2,
            }}
          >
            <div className="card-nav-bar">
              <div className="flex gap-2">
                <img
                  className={`h-5 object-contain ${title === "APIs" ? "" : "grayscale"}`}
                  src={useBaseUrl(`/imgs/logos/${item.icon}`)}
                  alt={item.title}
                />
                <p className={`m-0 whitespace-nowrap  text-opacity-[84%] font-satoshi hover:text-cst-text-purple ${index == 2 ? "w-1/6" : ""}`} style={{ fontSize: "16px", lineHeight: "17.92px" }}>
                  {item.title}
                </p>
              </div>
              <p className="mt-2 font-satoshi " style={{ fontSize: "14px", lineHeight: "19.6px", opacity: "54%" }}>
                {item.description ? item.description : null}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
