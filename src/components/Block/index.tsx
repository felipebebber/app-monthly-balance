import { JSX } from "react";
import BlockTitle from "./Title";
import React from "react";

type Block = {
  children: JSX.Element | JSX.Element[],
  title?: boolean | string,
  className: null | string,
  HeaderBtn?: boolean | (() => JSX.Element)
}

function Block({ children, title = false, className = null, HeaderBtn = false }: Block) {
  return (
    <div className={`shadow-sm rounded-md bg-blue-50 ${className ? className : ''}`}>
      <div className="flex flex-col h-full">
        {title && <BlockTitle>
          {title}{HeaderBtn && HeaderBtn}
        </BlockTitle>}
        <div className="flex-1 flex-col flex overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
};

export default Block;
