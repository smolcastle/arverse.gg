import type { NextPage } from 'next'
import Head from 'next/head'
// import Link from 'next/link'
// import Button from '../components/Button'
import {
  BookmarkIcon,
  CalculatorIcon,
  PresentationIcon
} from '../components/icons'
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
// import axios from 'axios'
// import Tooltip from 'components/Tooltip'
// import withCommas from 'utils/withCommas'

const StakeGuide: NextPage = () => {
  // const [isAvax, setIsAvax] = React.useState(true)
  const [isCalculating, setIsCalculating] = React.useState(false)
  const [isTutorial, setIsTutorial] = React.useState(false)

  // const [avax, setAvax] = React.useState({
  //   price: 23.52,
  //   marketCap: 16.9,
  //   TVL: 2.8,
  //   stake: 92700
  // })

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
              className="w-full px-[32px] py-[24px] flex items-center gap-[8px]"
              onClick={() => setIsCalculating(!isCalculating)}
            >
              <CalculatorIcon />
              <span className="text-[20px] font-medium">
                Calculate your earnings
              </span>
            </button>
            {isCalculating && (
              <div className="w-full py-[24px] border-t border-black">
                <div className="px-[32px]">
                  <h1>Calculation</h1>
                </div>
              </div>
            )}
          </div>
          <div className="mt-[24px] bg-white rounded-xl border border-gray-300">
            <button
              className="w-full px-[32px] py-[24px] flex items-center gap-[8px]"
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
