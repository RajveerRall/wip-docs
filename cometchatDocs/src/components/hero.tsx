

import React, { useEffect, useState } from "react";
import { useHistory } from "@docusaurus/router";
import clsx from "clsx";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useLocation } from 'react-router-dom';





function Hero({ data }) {

  return (

    <div className="relative flex  items-center justify-center bg-[#F2F2F7] banner-background" style={{ height: "40vh" }}>
      <div
        className={clsx(
          "banner-background-inner flex w-full flex-col items-center justify-center bg-cst-white  text-black",
          "dark:bg-cst-black dark:text-white"
        )}
      >
        {/* Banner */}

        <img
          src={useBaseUrl("/imgs/Doc-banner.png")}
          alt="Planets"
          className="w-full banner"
        />
        <img src={useBaseUrl("/imgs/planets/planet-1.svg")} alt="planet" className="absolute planet-1 planet"/>
        <img src={useBaseUrl("/imgs/planets/planet-2.svg")} alt="planet" className="absolute planet-2 planet"/>
        <img src={useBaseUrl("/imgs/planets/planet-3.svg")} alt="planet" className="absolute planet-3 planet"/>
        <img src={useBaseUrl("/imgs/planets/planet-4.svg")} alt="planet" className="absolute planet-4 planet"/>
        <img src={useBaseUrl("/imgs/planets/planet-5.svg")} alt="planet" className="absolute planet-5 planet"/>
        <img src={useBaseUrl("/imgs/planets/planet-6.svg")} alt="planet" className="absolute planet-6 planet"/>
        <img src={useBaseUrl("/imgs/planets/planet-7.svg")} alt="planet" className="absolute planet-7 planet"/>
       
        {/* middle */}
        <div className="absolute flex flex-col items-center w-full  gap-6 ">
          <div className=" ">
            <h1 className="dark-mode-h1 text-4xl md:text-5xl  mb-0 get-start font-satoshi font-semibold banner-title" style={{ color: "#14131D", lineHeight: "106%" }}>{data.title}</h1>
          </div>
          <div className="md:w-[45%] w-[80%]" >
            <p className=" text-justify ml-auto mr-auto mb-0  font-satoshi font-medium banner-text" style={{ textAlignLast: "center", color: "#14131D", fontSize: "1.375rem", letterSpacing: "0.00688rem", lineHeight: "120%", opacity: "0.74" }}>
              {data.content}
            </p>
          </div>
        </div>
      </div >
    </div>
  );
}

export default Hero;


export function CardItem({
  icon,
  title,
  link,
}: {
  icon: string;
  title: string;
  link: string;
}) {
  const router = useHistory();
  const url = useBaseUrl('a').split('/')[1];
  return (
    <div
      onClick={() => {
        router.push(`/${url}` + link);
      }}
      className={clsx(
        "flex flex-row gap-x-3 items-center justify-content-center  items-start rounded-[20px] border border-solid border-cst-border bg-transparent py-3 pl-4 pr-3 hover:bg-slate-50 dark:hover:bg-slate-500",
        "cursor-pointer dark:border-cst-border-dark integration-card"
      )}
    >
      <img
        src={useBaseUrl(`/imgs/logos/${icon}`)}
        alt={title}
        className="h-12 w-12 object-contain grayscale"
      />
      <h3 className="mb-0 mt-1 sm:text-sm md:text-[18px] font-satoshi font-semibold" style={{ opacity:"0.84"}}>{title}</h3>
    </div>
  );
}

