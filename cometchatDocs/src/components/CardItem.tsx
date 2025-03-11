// src/components/CardItem.tsx
import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';

export interface CardItemProps {
  icon: string;
  title: string;
  link: string;
  imagePath?: string;
}

export function CardItem({
  icon,
  title,
  link,
  imagePath = '/imgs/logos/',
}: CardItemProps): React.ReactElement {
  // Construct the full image path
  const imgSrc = useBaseUrl(`${imagePath}${icon}`);
  
  return React.createElement(
    Link,
    {
      to: link,
      className: clsx(
        "flex flex-row gap-x-3 items-center justify-content-center items-start rounded-[20px] border border-solid border-cst-border bg-transparent py-3 pl-4 pr-3 hover:bg-slate-50 dark:hover:bg-slate-500",
        "cursor-pointer dark:border-cst-border-dark integration-card"
      )
    },
    React.createElement(
      'img',
      {
        src: imgSrc,
        alt: title,
        className: "h-12 w-12 object-contain grayscale"
      }
    ),
    React.createElement(
      'h3',
      { 
        className: "mb-0 mt-1 sm:text-sm md:text-[18px] font-satoshi font-semibold", 
        style: { opacity: "0.84" } 
      },
      title
    )
  );
}