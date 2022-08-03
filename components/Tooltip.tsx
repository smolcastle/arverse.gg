import React from 'react'

const Tooltip = ({
  message,
  children
}: {
  message: string
  children: React.ReactNode
}) => {
  return (
    <div className="relative flex flex-col items-center group">
      {children}
      <div className="absolute bottom-0 group-hover:flex flex-col items-center hidden mb-6">
        <div className="relative z-20 w-[80px] h-[32px] flex items-center justify-center font-medium text-center text-[12px] leading-none text-white whitespace-no-wrap bg-gray rounded-md">
          {message}
        </div>
        <div className=" border border-transparent border-t-[10px] border-t-gray border-x-[10px]" />
      </div>
    </div>
  )
}

export default Tooltip