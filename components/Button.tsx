import { NextPage } from 'next'
import React from 'react'

type Props = {
  children: React.ReactNode
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  classNames?: string
  outlined?: Boolean
  filled?: Boolean
}

const Button: NextPage<Props> = (props) => {
  return (
    <button
      className={`${
        props.classNames
      } font-medium flex justify-center items-center gap-3 ${
        props.outlined
          ? 'border-2 border-light-600 text-light-600 hover:border-black hover:text-black'
          : props.filled
          ? 'bg-white text-black hover:bg-zinc-50'
          : 'text-light-600 hover:bg-light-300 hover:text-black'
      } min-w-[160px] h-[56px] px-[18px] rounded-lg text-[16px] transition-all`}
    >
      {props.startIcon}
      <span>{props.children}</span>
      {props.endIcon}
    </button>
  )
}

export default Button
