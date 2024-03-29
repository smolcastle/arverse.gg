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
import step1 from 'assets/image/stake-steps/1.jpg'
import step2 from 'assets/image/stake-steps/2.jpg'
import step3 from 'assets/image/stake-steps/3.jpg'
import step4 from 'assets/image/stake-steps/4.jpg'
import step5 from 'assets/image/stake-steps/5.jpg'
import Modal from 'components/Modal'
import { Transition } from '@headlessui/react'
import handleCopy from 'utils/copyToClipboard'
import Loader from 'components/Loader'

const StakeGuide: NextPage = () => {
  const [isCalculating, setIsCalculating] = React.useState(false)
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
  const [step1Open, setStep1Open] = React.useState(true)
  const [step2Open, setStep2Open] = React.useState(true)
  const [step3Open, setStep3Open] = React.useState(true)
  const [step4Open, setStep4Open] = React.useState(true)
  const [step5Open, setStep5Open] = React.useState(true)
  const [isDataFetched, setIsDataFetched] = React.useState(false)

  const stepsImgList = [step1, step2, step3, step4, step5]

  const { data } = useSWR('/api/avax', fetcher)
  React.useEffect(() => {
    setAvax(data)
  }, [data])

  React.useEffect(() => {
    const allMarkedSteps = JSON.parse(
      localStorage.getItem('markedSteps') || '[]'
    )

    setIsDataFetched(true)

    const allSteps = [
      setStep1Marked,
      setStep2Marked,
      setStep3Marked,
      setStep4Marked,
      setStep5Marked
    ]

    const allOpenSteps = [
      setStep1Open,
      setStep2Open,
      setStep3Open,
      setStep4Open,
      setStep5Open
    ]

    for (let i = 0; i < allSteps.length; i++) {
      allSteps[i](allMarkedSteps[i] ?? false)
      if (allMarkedSteps[i]) allOpenSteps[i](false)
    }
  }, [])

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

  function handleStepPreview(step: number) {
    setStep(step)
    setOpen(true)
  }

  function handleStepMarked(setStepOpen: any, step: number, setMarked: any) {
    setStepOpen((step: boolean) => !step)
    let isMarked
    setMarked((marked: boolean) => {
      isMarked = marked
    })
    if (isMarked) {
      return
    }
    setMarked(true)
    let allStepsMarked = [
      step1Marked,
      step2Marked,
      step3Marked,
      step4Marked,
      step5Marked
    ].map((item, index) => {
      if (index === step - 1) return true
      return item
    })
    localStorage.setItem('markedSteps', JSON.stringify(allStepsMarked))
  }

  const allMarked =
    step1Marked && step2Marked && step3Marked && step4Marked && step5Marked

  return (
    <div className="w-full bg-light">
      <Head>
        <title>Beetroot | Avax Staking Guide, Earn Rewards up to 9%</title>
        <meta
          name="description"
          content="Follow our staking guide to learn how to stake your AVAX with us. Earn up to 9% annually on your AVAX staking."
        />
        <meta
          property="og:title"
          content="Beetroot | Avax Staking Guide, Earn Rewards up to 9%"
        />
        <meta
          property="og:og:description"
          content="Follow our staking guide to learn how to stake your AVAX with us. Earn up to 9% annually on your AVAX staking."
        />
        <meta
          property="og:url"
          content="https://beetroot.ai/how-to-stake-avax"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://beetroot.ai/cover.jpg" />
      </Head>

      <Header />

      <Modal
        open={open}
        onClick={setOpen}
        imgUrl={stepsImgList[step - 1]?.src}
        altText={`Step ${step} Preview`}
      />

      <main className="pt-[140px] px-4 flex flex-col items-center mx-auto z-10">
        <div className="max-w-[640px] w-full flex flex-col items-center gap-[16px]">
          <BookmarkIcon className="w-[60px] h-[60px]" />
          <h1 className="mt-[16px] text-[32px] font-medium text-center">
            Become an Avalanche Delegator
          </h1>
          <p className="max-w-[640px] w-full font-regular text-center text-[20px] text-gray">
            Help us secure the avalanche network by staking your AVAX to Beetroot
            and earn rewards
          </p>
        </div>
        <div className="relative mt-[50px] max-w-[640px] w-full transition-all duration-300">
          <div className="relative">
            <button
              className={classNames(
                'relative bg-white w-full h-[80px] px-[32px] flex items-center border border-l-gray-300 border-r-gray-300 border-t-gray-300 gap-[8px] rounded-tl-xl rounded-tr-xl transition-all duration-300 ease-in-out z-50',
                isCalculating
                  ? ''
                  : 'rounded-bl-xl rounded-br-xl border-b-gray-300'
              )}
              onClick={() => setIsCalculating(!isCalculating)}
            >
              <CalculatorIcon />
              <span className="text-[20px] font-medium">
                Staking rewards calculator
              </span>
            </button>
            <Transition
              show={isCalculating}
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 -translate-y-2"
              enterTo="opacity-100"
              leave="ease-in duration-200 -translate-y-2"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute bg-white w-full px-[32px] pb-[24px] border border-t-black border-b-gray-300 border-l-gray-300 border-r-gray-300 rounded-bl-xl rounded-br-xl transition-all duration-300">
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
                          : Math.round(estimatedEarnings * avax?.price * 100) /
                            100
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
                          : Math.round(estimatedEarnings * avax?.price * 100) /
                            100
                        ).toFixed(2)}{' '}
                        {!isAvax ? 'AVAX' : ''}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-[8px] border-t border-gray text-[12px] text-gray leading-tight">
                  The effective earnings depend on many dynamic variables. Even
                  the presented results are based on proprietary prediction
                  formulas, we do not guarantee any kind of accuracy.
                </div>
              </div>
            </Transition>
          </div>
          <div
            className={classNames(
              'mt-[24px] bg-white rounded-xl border border-gray-300 transition-all duration-200',
              isCalculating ? 'translate-y-[407px]' : 'mt-[24px]'
            )}
          >
            <div className="w-full h-[80px] px-[32px] flex items-center gap-[8px]">
              <PresentationIcon />
              <span className="text-[20px] font-medium">
                Follow these steps to stake your AVAX
              </span>
            </div>
            <div className="w-full border-t border-black">
              {isDataFetched ? (
                <>
                  <div className="border-b-2 border-gray-200 flex items-center justify-between flex-wrap w-full px-[32px] py-[32px] transition-all duration-1000">
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
                    <Transition.Root show={step1Open} as={Fragment}>
                      <Transition.Child
                        as={Fragment}
                        enter="linear duration-50"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="linear duration-50"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <span>
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
                        </span>
                      </Transition.Child>
                    </Transition.Root>
                    <CustomButton
                      icon={<TickIcon />}
                      onClick={() =>
                        handleStepMarked(setStep1Open, 1, setStep1Marked)
                      }
                      marked={step1Marked}
                      open={step1Open}
                    />
                  </div>
                  <div className="border-b-2 border-gray-200 flex items-center justify-between flex-wrap w-full px-[32px] py-[32px]">
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
                    <Transition.Root show={step2Open} as={Fragment}>
                      <Transition.Child
                        as={Fragment}
                        enter="linear duration-50"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="linear duration-50"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <span className="block mt-[12px] text-[20px] font-medium">
                          Click <span className="text-accent">Cross Chain</span>{' '}
                          from the menu and transfer your AVAX to{' '}
                          <span className="text-accent">P-Chain</span>.
                        </span>
                      </Transition.Child>
                    </Transition.Root>
                    <CustomButton
                      icon={<TickIcon />}
                      onClick={() =>
                        handleStepMarked(setStep2Open, 2, setStep2Marked)
                      }
                      marked={step2Marked}
                      open={step2Open}
                    />
                  </div>
                  <div className="border-b-2 border-gray-200 flex items-center justify-between flex-wrap w-full px-[32px] py-[32px]">
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
                    <Transition.Root show={step3Open} as={Fragment}>
                      <Transition.Child
                        as={Fragment}
                        enter="linear duration-50"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="linear duration-50"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <span className="w-full block mt-[12px] text-[20px] font-medium">
                          Click <span className="text-accent">Earn</span> from
                          the menu. Click{' '}
                          <span className="text-accent">Add Delegator</span>.
                        </span>
                      </Transition.Child>
                    </Transition.Root>
                    <CustomButton
                      icon={<TickIcon />}
                      onClick={() =>
                        handleStepMarked(setStep3Open, 3, setStep3Marked)
                      }
                      marked={step3Marked}
                      open={step3Open}
                    />
                  </div>
                  <div className="border-b-2 border-gray-200 flex items-center justify-between flex-wrap w-full px-[32px] py-[32px]">
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
                    <Transition.Root show={step4Open} as={Fragment}>
                      <Transition.Child
                        as={Fragment}
                        enter="linear duration-50"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="linear duration-50"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <span className="block mt-[12px] text-[20px] font-medium">
                          In the search field, Search the below Node ID. Then
                          click <span className="text-accent">Select</span>
                          <div
                            className="mx-auto mt-[12px] flex items-center gap-[16px] p-[24px] w-fit bg-accent text-white text-[16px] cursor-pointer rounded-lg"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                process.env.NEXT_PUBLIC_NODE_ID ?? ''
                              )
                              handleCopy(setCopy)
                            }}
                          >
                            <p>{process.env.NEXT_PUBLIC_NODE_ID}</p>
                            <Tooltip message={copy}>
                              <CopyIcon />
                            </Tooltip>
                          </div>
                        </span>
                      </Transition.Child>
                    </Transition.Root>
                    <CustomButton
                      icon={<TickIcon />}
                      onClick={() =>
                        handleStepMarked(setStep4Open, 4, setStep4Marked)
                      }
                      marked={step4Marked}
                      open={step4Open}
                    />
                  </div>
                  <div className="border-b-2 border-gray-200 flex items-center justify-between flex-wrap w-full px-[32px] py-[32px]">
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
                    <Transition.Root show={step5Open} as={Fragment}>
                      <Transition.Child
                        as={Fragment}
                        enter="linear duration-50"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="linear duration-50"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <span className="block mt-[12px] text-[20px] font-medium">
                          Select Staking End Date, Enter Stake Amount and click
                          the{' '}
                          <span className="text-accent">Confirm button</span>.
                        </span>
                      </Transition.Child>
                    </Transition.Root>
                    <CustomButton
                      icon={<TickIcon />}
                      onClick={() =>
                        handleStepMarked(setStep5Open, 5, setStep5Marked)
                      }
                      marked={step5Marked}
                      open={step5Open}
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
                </>
              ) : (
                <div className="py-[32px] px-[32px]">
                  <Loader />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <div className={isCalculating ? 'mt-[calc(120px+407px)]' : ''}>
        <Footer />
      </div>
    </div>
  )
}

export default StakeGuide

type Props = {
  icon?: React.ReactNode
  onClick?: () => void
  marked?: boolean
  open?: boolean
}

const CustomButton = (props: Props) => {
  return (
    <button
      className={classNames(
        'ml-auto transition-all duration-200 self-end px-[10px] py-[10px] text-[16px] font-medium flex items-center gap-[10px] border-2  rounded-xl',
        props.marked
          ? 'bg-accent text-white border-accent'
          : 'text-accent-light hover:text-accent hover:border-accent border-accent-light',
        props.open ? 'mt-[16px]' : ''
      )}
      onClick={props.onClick}
    >
      {props.icon}
      <span>{!props.marked ? 'Mark as completed' : 'Completed'}</span>
    </button>
  )
}
