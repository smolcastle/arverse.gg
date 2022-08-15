import React from 'react'

const Tooltip = ({
  message,
  children
}: {
  message: string
  children: React.ReactNode
}) => {
  return (
    <div className="relative flex flex-col items-center group z-50">
      {children}
      <div className="absolute bottom-0 group-hover:flex flex-col items-center hidden mb-6">
        <div className="px-4 relative z-20 min-w-[80px] w-full h-[32px] flex items-center justify-center font-medium text-center text-[12px] leading-none text-white whitespace-nowrap bg-gray rounded-md">
          {message}
        </div>
        <div className=" border border-transparent border-t-[8px] border-t-gray border-x-[7px]" />
      </div>
    </div>
  )
}

export default Tooltip
