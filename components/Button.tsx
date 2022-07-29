import { NextPage } from "next";
import React from "react";

type Props = {
  children: React.ReactNode;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  classNames?: string;
  outlined?: Boolean;
  filled?: Boolean;
};

const Button: NextPage<Props> = (props) => {
  return (
    <button
      className={`${props.classNames} font-semibold flex items-center gap-3 ${
        props.outlined
          ? "border-2 border-light-600 text-light-600 hover:border-black hover:text-black"
          : props.filled
          ? "bg-white text-black hover:bg-zinc-50"
          : "text-light-600 hover:bg-light-300 hover:text-black"
      } px-6 py-3 rounded-lg text-xl transition-all`}
    >
      {props.startIcon}
      <span>{props.children}</span>
      {props.endIcon}
    </button>
  );
};

export default Button;
