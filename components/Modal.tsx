import { Dialog, Transition } from '@headlessui/react'
import { NextPage } from 'next'
import React, { Fragment } from 'react'
import { CrossFilledIcon } from './icons'

type Props = {
  open: boolean
  onClick: any
  imgUrl: string
}

const Modal: NextPage<Props> = (props) => {
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={props.onClick}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-2 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-[1000px]">
                <div className="w-full">
                  {/* eslint-disable-next-line */}
                  <img
                    src={props.imgUrl}
                    className="w-full rounded-md border border-transparent shadow-sm"
                    alt="preview"
                  />
                  <span
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={() => props.onClick(false)}
                  >
                    <CrossFilledIcon />
                  </span>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
