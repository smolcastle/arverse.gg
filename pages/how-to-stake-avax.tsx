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
import React from 'react'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Tooltip from 'components/Tooltip'
import Toggle from 'components/Toggle'
import classNames from 'utils/classNames'
import ExternalLink from 'components/ExternalLink'
import useSWR from 'swr'
import fetcher from 'utils/fetcher'

const StakeGuide: NextPage = () => {
  const [isCalculating, setIsCalculating] = React.useState(false)
  const [isTutorial, setIsTutorial] = React.useState(true)
  const [isAvax, setIsAvax] = React.useState(false)
  const [amount, setAmount] = React.useState(0)
  const [days, setDays] = React.useState(0)
  const [estimatedEarnings, setEstimatedEarnings] = React.useState(0)
  const [copy, setCopy] = React.useState('Copy')
  const [avax, setAvax] = React.useState<any>({})

  const { data, error } = useSWR('/api/avax', fetcher)
  console.log('😱 useSWR:', data, error)
  React.useEffect(() => {
    setAvax(data)
  }, [data])

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

  return (
    <div className="w-full bg-light">
      <Head>
        <title>Arverse</title>
      </Head>

      <Header />

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
            {isCalculating && (
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
                        {avax?.rewardRate.toFixed(2)}%
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
                        {avax?.delegationFee.toFixed(2)}%
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
            )}
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
            {isTutorial && (
              <div className="w-full border-t border-black">
                <div className="border-b-2 border-gray-200 px-[32px] py-[24px]">
                  <span className="flex items-center gap-[16px]">
                    <span className="text-accent text-[16px] font-medium">
                      Step 1
                    </span>
                    <span
                      className="cursor-pointer"
                      onClick={() => console.log('step-1 clicked')}
                    >
                      <PlayIcon />
                    </span>
                  </span>
                  <span className="block mt-[12px] text-[20px] font-medium">
                    Login to your account on{' '}
                    <ExternalLink href="https://wallet.avax?.network">
                      https://wallet.avax?.network
                    </ExternalLink>
                    .
                  </span>
                  <span className="block mt-[20px] text-[16px] font-medium text-gray-light">
                    If you don't have account on{' '}
                    <ExternalLink href="https://wallet.avax?.network">
                      https://wallet.avax?.network
                    </ExternalLink>{' '}
                    then you must create it. Then move your AVAX to the above
                    wallet.
                  </span>
                  <CustomButton icon={<TickIcon />}>
                    Mark as completed
                  </CustomButton>
                </div>
                <div className="border-b-2 border-gray-200 px-[32px] py-[24px]">
                  <span className="flex items-center gap-[16px]">
                    <span className="text-accent text-[16px] font-medium">
                      Step 2
                    </span>
                    <span
                      className="cursor-pointer"
                      onClick={() => console.log('step-2 clicked')}
                    >
                      <PlayIcon />
                    </span>
                  </span>
                  <span className="block mt-[12px] text-[20px] font-medium">
                    Click <span className="text-accent">Cross Chain</span> from
                    the menu and transfer your AVAX to{' '}
                    <span className="text-accent">P-Chain</span>.
                  </span>
                  <CustomButton icon={<TickIcon />}>
                    Mark as completed
                  </CustomButton>
                </div>
                <div className="border-b-2 border-gray-200 px-[32px] py-[24px]">
                  <span className="flex items-center gap-[16px]">
                    <span className="text-accent text-[16px] font-medium">
                      Step 3
                    </span>
                    <span
                      className="cursor-pointer"
                      onClick={() => console.log('step-3 clicked')}
                    >
                      <PlayIcon />
                    </span>
                  </span>
                  <span className="block mt-[12px] text-[20px] font-medium">
                    Click <span className="text-accent">Earn</span> from the
                    menu. Click{' '}
                    <span className="text-accent">Add Delegator</span>.
                  </span>
                  <CustomButton icon={<TickIcon />}>
                    Mark as completed
                  </CustomButton>
                </div>
                <div className="border-b-2 border-gray-200 px-[32px] py-[24px]">
                  <span className="flex items-center gap-[16px]">
                    <span className="text-accent text-[16px] font-medium">
                      Step 4
                    </span>
                    <span
                      className="cursor-pointer"
                      onClick={() => console.log('step-4 clicked')}
                    >
                      <PlayIcon />
                    </span>
                  </span>
                  <span className="block mt-[12px] text-[20px] font-medium">
                    In the search field, Search the below Node ID. Then click{' '}
                    <span className="text-accent">Select</span>
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
                  <CustomButton icon={<TickIcon />}>
                    Mark as completed
                  </CustomButton>
                </div>
                <div className="px-[32px] py-[24px]">
                  <span className="flex items-center gap-[16px]">
                    <span className="text-accent text-[16px] font-medium">
                      Step 5
                    </span>
                    <span
                      className="cursor-pointer"
                      onClick={() => console.log('step-5 clicked')}
                    >
                      <PlayIcon />
                    </span>
                  </span>
                  <span className="block mt-[12px] text-[20px] font-medium">
                    Select Staking End Date, Enter Stake Amount and click the
                    <span className="text-accent">Confirm button</span>.
                  </span>
                  <CustomButton icon={<TickIcon />}>
                    Mark as completed
                  </CustomButton>
                </div>
              </div>
            )}
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
  children: React.ReactNode
}

const CustomButton = (props: Props) => {
  return (
    <button className="ml-auto mt-[16px] px-[10px] py-[10px] text-[16px] font-medium text-accent-light flex items-center gap-[10px] border-2 border-accent-light rounded-xl hover:text-accent hover:border-accent">
      {props.icon}
      <span>{props.children}</span>
    </button>
  )
}
