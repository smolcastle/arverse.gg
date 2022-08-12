import type { NextPage } from 'next'
import Head from 'next/head'
import {
  BookmarkIcon,
  CalculatorIcon,
  CopyIcon,
  InfoIcon,
  PlayIcon,
  PresentationIcon,
  TickIcon
} from 'components/icons'
import React, { Fragment } from 'react'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Tooltip from 'components/Tooltip'
import Toggle from 'components/Toggle'
import classNames from 'utils/classNames'
import ExternalLink from 'components/ExternalLink'
import useSWR from 'swr'
import fetcher from 'utils/fetcher'
import step1 from 'assets/image/stake-steps/Step_1.png'
import step2 from 'assets/image/stake-steps/Step_2.png'
import step3 from 'assets/image/stake-steps/Step_3.png'
import step4 from 'assets/image/stake-steps/Step_4.png'
import step5 from 'assets/image/stake-steps/Step_5.png'
import Modal from 'components/Modal'
import { Transition } from '@headlessui/react'

const StakeGuide: NextPage = () => {
  const [isCalculating, setIsCalculating] = React.useState(true)
  const [isTutorial, setIsTutorial] = React.useState(true)
  const [isAvax, setIsAvax] = React.useState(false)
  const [amount, setAmount] = React.useState(0)
  const [days, setDays] = React.useState(0)
  const [estimatedEarnings, setEstimatedEarnings] = React.useState(0)
  const [copy, setCopy] = React.useState('Copy')
  const [avax, setAvax] = React.useState<any>({})
  const [open, setOpen] = React.useState(false)
  const [step, setStep] = React.useState(0)
  const [step1Marked, setStep1Marked] = React.useState(false)
  const [step2Marked, setStep2Marked] = React.useState(false)
  const [step3Marked, setStep3Marked] = React.useState(false)
  const [step4Marked, setStep4Marked] = React.useState(false)
  const [step5Marked, setStep5Marked] = React.useState(false)

  const stepsImgList = [step1, step2, step3, step4, step5]

  const { data } = useSWR('/api/avax', fetcher)
  React.useEffect(() => {
    setAvax(data)
  }, [data])

  React.useEffect(() => {
    const allMarkedSteps = JSON.parse(
      localStorage.getItem('markedSteps') || '[]'
    )
    const allSteps = [
      setStep1Marked,
      setStep2Marked,
      setStep3Marked,
      setStep4Marked,
      setStep5Marked
    ]
    for (let i = 0; i < allSteps.length; i++) {
      allSteps[i](allMarkedSteps[i] ?? false)
    }
  }, [])

  if (!data) return <div>Loading...</div>

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    let newAmount = parseFloat(e.target.value) || 0
    if (newAmount > 1e15) return
    setAmount(newAmount)

    if (days && newAmount) {
      let effectiveAPY = avax?.rewardRate * (1 - avax?.delegationFee / 100)
      if (!isAvax) newAmount = newAmount / avax?.price
      let newEstimatedEarnings =
        Math.round(((((newAmount * effectiveAPY) / 100) * days) / 365) * 100) /
        100
      setEstimatedEarnings(newEstimatedEarnings)
    } else setEstimatedEarnings(0)
  }

  function handleDaysChange(e: React.ChangeEvent<HTMLInputElement>) {
    let newDays = parseInt(e.target.value) || 0
    setDays(newDays)

    if (newDays && amount) {
      let effectiveAPY = avax?.rewardRate * (1 - avax?.delegationFee / 100)
      let updatedAmount = isAvax ? amount : amount / avax?.price
      let newEstimatedEarnings =
        Math.round(
          ((((updatedAmount * effectiveAPY) / 100) * newDays) / 365) * 100
        ) / 100
      setEstimatedEarnings(newEstimatedEarnings)
    } else setEstimatedEarnings(0)
  }

  function handleCurrencyChange() {
    setIsAvax(!isAvax)
    if (typeof avax?.price === 'number') {
      let newAmount: number
      if (isAvax) {
        newAmount = Math.round(amount * avax?.price * 100) / 100 || 0
      } else {
        newAmount = Math.round((amount / avax?.price) * 100) / 100 || 0
      }
      setAmount(newAmount)
    }
  }

  function handleCopy() {
    setCopy('Copied!')
    setTimeout(() => {
      setCopy('Copy')
    }, 2000)
  }

  function handleStepPreview(step: number) {
    setStep(step)
    setOpen(true)
  }

  function handleStepMarked(step: number, setMarked: any) {
    setMarked((marked: boolean) => !marked)
    let allStepsMarked = [
      step1Marked,
      step2Marked,
      step3Marked,
      step4Marked,
      step5Marked
    ].map((item, index) => {
      if (index === step - 1) return !item
      return item
    })
    localStorage.setItem('markedSteps', JSON.stringify(allStepsMarked))
  }

  const allMarked =
    step1Marked && step2Marked && step3Marked && step4Marked && step5Marked

  return (
    <div className="w-full bg-light">
      <Head>
        <title>Arverse</title>
      </Head>

      <Header />

      <Modal
        open={open}
        onClick={setOpen}
        imgUrl={stepsImgList[step - 1]?.src}
      />

      <main className="pt-[140px] px-4 flex flex-col items-center mx-auto min-h-screen z-10">
        <div className="max-w-[640px] w-full flex flex-col items-center gap-[16px]">
          <BookmarkIcon className="w-[60px] h-[60px]" />
          <h1 className="mt-[16px] text-[32px] font-medium text-center">
            AVAX staking guide
          </h1>
          <p className="max-w-[480px] w-full font-regular text-center text-[20px] text-gray">
            Follow the instructions below to stake your AVAX with Arverse
          </p>
        </div>
        <div className="mt-[50px] max-w-[640px] w-full">
          <div className="bg-white rounded-xl border border-gray-300">
            <button
              className="w-full h-[80px] px-[32px] flex items-center gap-[8px]"
              onClick={() => setIsCalculating(!isCalculating)}
            >
              <CalculatorIcon />
              <span className="text-[20px] font-medium">
                Calculate your earnings
              </span>
            </button>
            <Transition.Root show={isCalculating} as={Fragment}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 -translate-y-4"
                enterTo="opacity-100"
                leave="ease-in duration-200 -translate-y-4"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="w-full px-[32px] pb-[24px] border-t border-black">
                  <div className="flex justify-between py-[40px]">
                    <div className="">
                      <div>
                        <label
                          htmlFor="amount"
                          className="mb-[6px] text-[12px] flex justify-between"
                        >
                          <span className="flex items-center gap-[5px]">
                            <span>Amount</span>
                            <Tooltip message="Amount you would like to stake">
                              <InfoIcon />
                            </Tooltip>
                          </span>
                          <span className="flex items-center font-semibold gap-[4px]">
                            <span>USD</span>
                            <Toggle
                              enabled={isAvax}
                              onChange={handleCurrencyChange}
                            />
                            <span className={`${isAvax ? 'text-red' : ''}`}>
                              AVAX
                            </span>
                          </span>
                        </label>
                        <label
                          className={classNames(
                            'w-[240px] flex items-center border-2 px-[16px] py-[8px]',
                            isAvax ? 'border-red' : 'border-gray'
                          )}
                        >
                          <input
                            type="text"
                            id="amount"
                            placeholder="0"
                            value={amount}
                            onChange={handleAmountChange}
                            className={classNames(
                              !amount ? 'text-gray-400' : 'text-black',
                              'p-0 outline-none border-transparent focus:border-transparent focus:ring-0'
                            )}
                            style={{
                              width: `calc(${amount.toString().length}ch + 4px)`
                            }}
                          />
                          <span className="text-[16px]">
                            {isAvax ? 'AVAX' : 'USD'}
                          </span>
                        </label>
                      </div>
                      <div className="mt-[24px]">
                        <label
                          htmlFor="days"
                          className="mb-[6px] text-[12px] flex justify-between"
                        >
                          <span className="flex items-center gap-[5px]">
                            <span>Staking period</span>
                            <Tooltip message="Duration you would like to stake for">
                              <InfoIcon />
                            </Tooltip>
                          </span>
                        </label>
                        <label className="w-[240px] flex items-center border-2 border-gray px-[16px] py-[8px]">
                          <input
                            type="text"
                            id="days"
                            placeholder="0"
                            value={days}
                            onChange={handleDaysChange}
                            className={classNames(
                              !days ? 'text-gray-400' : 'text-black',
                              'p-0 outline-none border-transparent focus:border-transparent focus:ring-0'
                            )}
                            style={{
                              width: `calc(${days.toString().length}ch + 4px)`
                            }}
                          />
                          <span className="text-[16px]">Days</span>
                        </label>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-[32px]">
                      <div className="text-[12px]">
                        <span className="flex items-center justify-end gap-[5px]">
                          <span>Annual reward rate</span>
                          <Tooltip message="Based on network data">
                            <InfoIcon />
                          </Tooltip>
                        </span>
                        <h2 className="mt-[4px] text-[24px] font-medium">
                          {avax?.rewardRate?.toFixed(2)}%
                        </h2>
                      </div>
                      <div className="text-[12px]">
                        <span className="flex items-center justify-end gap-[5px]">
                          <span>Delegation fee</span>
                          <Tooltip message="Deducted from the rewards earned">
                            <InfoIcon />
                          </Tooltip>
                        </span>
                        <h2 className="mt-[4px] text-[24px] font-medium">
                          {avax?.delegationFee?.toFixed(2)}%
                        </h2>
                      </div>
                      <div className="text-[12px]">
                        <span className="flex items-center justify-end gap-[5px]">
                          <span>Estimated earnings</span>
                          <Tooltip message="Est. earnings after fee deduction">
                            <InfoIcon />
                          </Tooltip>
                        </span>
                        <h2 className="mt-[4px] text-[24px] font-medium text-green">
                          +{!isAvax ? '$' : ''}
                          {(isAvax
                            ? estimatedEarnings
                            : Math.round(
                                estimatedEarnings * avax?.price * 100
                              ) / 100
                          ).toFixed(2)}{' '}
                          {isAvax ? (
                            <span className="text-[16px]">AVAX</span>
                          ) : (
                            ''
                          )}
                        </h2>
                        <span className="text-[16px] mt-[4px] font-medium text-gray">
                          ~ {isAvax ? '$' : ''}
                          {(!isAvax
                            ? estimatedEarnings
                            : Math.round(
                                estimatedEarnings * avax?.price * 100
                              ) / 100
                          ).toFixed(2)}{' '}
                          {!isAvax ? 'AVAX' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-[8px] border-t border-gray text-[12px] text-gray leading-tight">
                    The effective earnings depend on many dynamic variables.
                    Even the presented results are based on proprietary
                    prediction formulas, we do not guarantee any kind of
                    accuracy.
                  </div>
                </div>
              </Transition.Child>
            </Transition.Root>
          </div>
          <div className="mt-[24px] bg-white rounded-xl border border-gray-300">
            <button
              className="w-full h-[80px] px-[32px] flex items-center gap-[8px]"
              onClick={() => setIsTutorial(!isTutorial)}
            >
              <PresentationIcon />
              <span className="text-[20px] font-medium">
                Follow steps below to stake AVAX with us
              </span>
            </button>
            <Transition.Root show={isTutorial} as={Fragment}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 -translate-y-4"
                enterTo="opacity-100"
                leave="ease-in duration-200 -translate-y-4"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="w-full border-t border-black">
                  <div
                    className={classNames(
                      'border-b-2 border-gray-200 flex w-full px-[32px] py-[32px]',
                      step1Marked
                        ? 'flex-row items-center justify-between'
                        : 'flex-col'
                    )}
                  >
                    <span className="flex items-center gap-[16px]">
                      <span className="text-accent text-[16px] font-medium">
                        Step 1
                      </span>
                      <span
                        className="cursor-pointer"
                        onClick={() => handleStepPreview(1)}
                      >
                        <PlayIcon />
                      </span>
                    </span>
                    {!step1Marked && (
                      <>
                        <span className="block mt-[12px] text-[20px] font-medium">
                          Login to your account on{' '}
                          <ExternalLink href="https://wallet.avax.network">
                            https://wallet.avax.network
                          </ExternalLink>
                          .
                        </span>
                        <span className="block mt-[20px] text-[16px] font-medium text-gray-light">
                          If you don't have account on{' '}
                          <ExternalLink href="https://wallet.avax.network">
                            https://wallet.avax.network
                          </ExternalLink>{' '}
                          then you must create it. Then move your AVAX to the
                          above wallet.
                        </span>
                      </>
                    )}
                    <CustomButton
                      icon={<TickIcon />}
                      onClick={() => handleStepMarked(1, setStep1Marked)}
                      marked={step1Marked}
                    />
                  </div>
                  <div
                    className={classNames(
                      'border-b-2 border-gray-200 flex w-full px-[32px] py-[32px]',
                      step2Marked
                        ? 'flex-row items-center justify-between'
                        : 'flex-col'
                    )}
                  >
                    <span className="flex items-center gap-[16px]">
                      <span className="text-accent text-[16px] font-medium">
                        Step 2
                      </span>
                      <span
                        className="cursor-pointer"
                        onClick={() => handleStepPreview(2)}
                      >
                        <PlayIcon />
                      </span>
                    </span>
                    {!step2Marked && (
                      <span className="block mt-[12px] text-[20px] font-medium">
                        Click <span className="text-accent">Cross Chain</span>{' '}
                        from the menu and transfer your AVAX to{' '}
                        <span className="text-accent">P-Chain</span>.
                      </span>
                    )}
                    <CustomButton
                      icon={<TickIcon />}
                      onClick={() => handleStepMarked(2, setStep2Marked)}
                      marked={step2Marked}
                    />
                  </div>
                  <div
                    className={classNames(
                      'border-b-2 border-gray-200 flex w-full px-[32px] py-[32px]',
                      step3Marked
                        ? 'flex-row items-center justify-between'
                        : 'flex-col'
                    )}
                  >
                    <span className="flex items-center gap-[16px]">
                      <span className="text-accent text-[16px] font-medium">
                        Step 3
                      </span>
                      <span
                        className="cursor-pointer"
                        onClick={() => handleStepPreview(3)}
                      >
                        <PlayIcon />
                      </span>
                    </span>
                    {!step3Marked && (
                      <span className="block mt-[12px] text-[20px] font-medium">
                        Click <span className="text-accent">Earn</span> from the
                        menu. Click{' '}
                        <span className="text-accent">Add Delegator</span>.
                      </span>
                    )}
                    <CustomButton
                      icon={<TickIcon />}
                      onClick={() => handleStepMarked(3, setStep3Marked)}
                      marked={step3Marked}
                    />
                  </div>
                  <div
                    className={classNames(
                      'border-b-2 border-gray-200 flex w-full px-[32px] py-[32px]',
                      step4Marked
                        ? 'flex-row items-center justify-between'
                        : 'flex-col'
                    )}
                  >
                    <span className="flex items-center gap-[16px]">
                      <span className="text-accent text-[16px] font-medium">
                        Step 4
                      </span>
                      <span
                        className="cursor-pointer"
                        onClick={() => handleStepPreview(4)}
                      >
                        <PlayIcon />
                      </span>
                    </span>
                    {!step4Marked && (
                      <span className="block mt-[12px] text-[20px] font-medium">
                        In the search field, Search the below Node ID. Then
                        click <span className="text-accent">Select</span>
                        <div
                          className="mx-auto mt-[12px] flex items-center gap-[16px] p-[24px] w-fit bg-accent text-white text-[16px] cursor-pointer rounded-lg"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              process.env.NEXT_PUBLIC_NODE_ID ?? ''
                            )
                            handleCopy()
                          }}
                        >
                          <p>{process.env.NEXT_PUBLIC_NODE_ID}</p>
                          <Tooltip message={copy}>
                            <CopyIcon />
                          </Tooltip>
                        </div>
                      </span>
                    )}
                    <CustomButton
                      icon={<TickIcon />}
                      onClick={() => handleStepMarked(4, setStep4Marked)}
                      marked={step4Marked}
                    />
                  </div>
                  <div
                    className={classNames(
                      'flex w-full px-[32px] py-[32px]',
                      step5Marked
                        ? 'flex-row items-center justify-between'
                        : 'flex-col',
                      allMarked
                        ? 'border-b-2 border-gray-200 pb-[24px]'
                        : 'pb-[32px]'
                    )}
                  >
                    <span className="flex items-center gap-[16px]">
                      <span className="text-accent text-[16px] font-medium">
                        Step 5
                      </span>
                      <span
                        className="cursor-pointer"
                        onClick={() => handleStepPreview(5)}
                      >
                        <PlayIcon />
                      </span>
                    </span>
                    {!step5Marked && (
                      <span className="block mt-[12px] text-[20px] font-medium">
                        Select Staking End Date, Enter Stake Amount and click
                        the
                        <span className="text-accent">Confirm button</span>.
                      </span>
                    )}
                    <CustomButton
                      icon={<TickIcon />}
                      onClick={() => handleStepMarked(5, setStep5Marked)}
                      marked={step5Marked}
                    />
                  </div>
                  {allMarked && (
                    <div className="px-[32px] pt-[32px] pb-[120px] text-[16px] text-accent text-center">
                      <p className="text-[24px] font-medium">🎉 🥳 🎊</p>
                      <p>
                        Congratulations. Thank you for choosing us as your
                        staking partner.
                      </p>
                    </div>
                  )}
                </div>
              </Transition.Child>
            </Transition.Root>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default StakeGuide

type Props = {
  icon?: React.ReactNode
  onClick?: () => void
  marked?: boolean
}

const CustomButton = (props: Props) => {
  return (
    <button
      className={classNames(
        'self-end px-[10px] py-[10px] text-[16px] font-medium flex items-center gap-[10px] border-2  rounded-xl',
        props.marked
          ? 'bg-accent text-white border-accent'
          : 'mt-[16px] text-accent-light hover:text-accent hover:border-accent border-accent-light'
      )}
      onClick={props.onClick}
    >
      {props.icon}
      <span>{!props.marked ? 'Mark as completed' : 'Completed'}</span>
    </button>
  )
}
