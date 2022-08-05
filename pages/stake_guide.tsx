import type { NextPage } from 'next'
import Head from 'next/head'
// import Link from 'next/link'
// import Button from 'components/Button'
import {
  BookmarkIcon,
  CalculatorIcon,
  InfoIcon,
  PresentationIcon
} from 'components/icons'
import React from 'react'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Tooltip from 'components/Tooltip'
import Toggle from 'components/Toggle'
import classNames from 'utils/classNames'
// import axios from 'axios'
// import withCommas from 'utils/withCommas'

const StakeGuide: NextPage = () => {
  const [isCalculating, setIsCalculating] = React.useState(false)
  const [isTutorial, setIsTutorial] = React.useState(false)
  const [isAvax, setIsAvax] = React.useState(false)
  const [amount, setAmount] = React.useState(0)
  const [days, setDays] = React.useState(0)

  const [avax, setAvax] = React.useState({
    price: 23.52,
    marketCap: 16.9,
    TVL: 2.8,
    stake: 92700
  })

  // async function getAVAX() {
  //   await axios
  //     .get(`${process.env.NEXT_PUBLIC_ARVERSE_URL}/api/avax` ?? '')
  //     .then((res) => setAvax(res.data))
  //     .catch((err) => console.log('ERROR:', err))
  // }

  // // first time
  // React.useEffect(() => {
  //   getAVAX()
  // }, [])

  // // every 5 mins
  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     getAVAX()
  //   }, 300000) // 5 mins
  //   return () => clearInterval(interval)
  // }, [avax])

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(parseFloat(e.target.value) || 0)
  }

  function handleCurrencyChange() {
    setIsAvax(!isAvax)
    if (typeof avax.price === 'number') {
      let newAmount: number
      if (isAvax) {
        newAmount = Math.round(amount * avax.price * 100) / 100 || 0
      } else {
        newAmount = Math.round((amount / avax.price) * 100) / 100 || 0
      }
      setAmount(newAmount)
    }
  }

  function handleDaysChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDays(parseFloat(e.target.value) || 0)
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
          <p className="max-w-[480px] w-full font-medium text-center text-[20px] text-gray">
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
                          <span>AVAX</span>
                        </span>
                      </label>
                      <label className="w-[240px] flex items-center border-2 border-gray px-[16px] py-[8px]">
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
                      <span className="flex items-center gap-[5px]">
                        <span>Annual reward rate</span>
                        <Tooltip message="Based on network data">
                          <InfoIcon />
                        </Tooltip>
                      </span>
                      <h2 className="mt-[4px] text-[24px] font-medium">
                        9.00%
                      </h2>
                    </div>
                    <div className="text-[12px]">
                      <span className="flex items-center gap-[5px]">
                        <span>Delegation fee</span>
                        <Tooltip message="Deducted from the rewards earned">
                          <InfoIcon />
                        </Tooltip>
                      </span>
                      <h2 className="mt-[4px] text-[24px] font-medium">
                        10.00%
                      </h2>
                    </div>
                    <div className="text-[12px]">
                      <span className="flex items-center gap-[5px]">
                        <span>Estimated earnings</span>
                        <Tooltip message="Est. earnings after fee deduction">
                          <InfoIcon />
                        </Tooltip>
                      </span>
                      <h2 className="mt-[4px] text-[24px] font-medium text-green">
                        +$0
                      </h2>
                      <span className="text-[16px] mt-[4px] font-medium text-gray">
                        ~ 0 AVAX
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
                Ready to stake? Follow step-by-step tutorials
              </span>
            </button>
            {isTutorial && (
              <div className="w-full py-[24px] border-t border-black">
                <div className="px-[32px]">
                  <h1>Stake tutorial</h1>
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
