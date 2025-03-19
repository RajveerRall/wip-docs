import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";

const DATA = [
  {
    title: "Extensions",
    icon: "puzzle.svg",
    link: "/extensions/overview",
    description: "Enhance in-app messaging with CometChat Extensions.",
  },
  {
    title: "Notifications",
    icon: "notifications-bell.svg",
    link: "/notifications/overview",
    description:
      "Increase user engagement by sending them updates via notifications.",
  },
  {
    title: "Webhooks",
    icon: "terminal.svg",
    link: "/fundamentals/webhooks-overview",
    description:
      "Subscribe to CometChat events and receive them via HTTP Post requests on your server.",
  },
  {
    title: "Bots",
    icon: "bots.svg",
    link: "/ai-chatbots/overview",
    description:
      "Send and receive messages autonomously in user conversations.",
  },
  {
    title: "AI",
    icon: "bots.svg",
    link: "/fundamentals/ai-user-copilot/overview",
    description: "Ignite natural and organic conversations using CometChat AI.",
  },
  {
    title: "Moderation",
    icon: "moderation.svg",
    link: "/moderation/overview",
    description:
      "Maintain platform integrity with advanced content rule and keyword management.",
  },
];

function Extend() {
  return (
    <div className="w-full bg-[#191822]">
      <div className="ml-2 max-w-[1400px]  flex-col  bg-[#191822]  pb-6 pt-4 md:m-auto  md:pt-10 ">
        <h2
          className="mb-5  font-satoshi text-[#FAFAFF] text-opacity-[54%]"
          style={{ lineHeight: "23.32px", fontSize: "22px" }}
        >
          {" "}
          Extend{" "}
        </h2>
        <div
          style={{ columnGap: "200px" }}
          className="flex w-full flex-row flex-wrap items-start md:flex-row "
        >
          {DATA.map((card, index) => (
            <Card index={index} {...card} key={card.title} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Card(props) {
  return (
    <div className="cursor-pointer  md:w-1/5">
      <Link
        className="card-nav-bar text-white hover:no-underline"
        href={props.link}
        key={props.index}
      >
        <div className="flex items-center ">
          <img
            className="mr-2  h-4"
            src={useBaseUrl(`/imgs/icons/${props.icon}`)}
            alt={props.title}
          />
          <p
            className={`m-0 w-1/6  whitespace-nowrap font-satoshi text-opacity-[84%] hover:text-cst-text-purple`}
            style={{ fontSize: "16px", lineHeight: "17.92px" }}
          >
            {props.title}
          </p>
        </div>
        <p
          className="mt-2 font-satoshi"
          style={{
            fontSize: "14px",
            opacity: "54%",
            lineHeight: "19.6px",
            fontWeight: "600",
          }}
        >
          {props.description}
        </p>
      </Link>
    </div>
  );
}

export default Extend;
