import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Button from '../components/Button'
import {
  RightArrowIcon,
  BookmarkIcon,
  CopyIcon,
  QuestionIcon,
  CashIcon,
  PeakIcon,
  StackIcon
} from '../components/icons'
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import axios from 'axios'
import Tooltip from 'components/Tooltip'
import withCommas from 'utils/withCommas'

const NodeID: NextPage = () => {
  const [isAvax, setIsAvax] = React.useState(true)
  const [copy, setCopy] = React.useState('Copy')

  const [avax, setAvax] = React.useState({
    price: 23.52,
    marketCap: 16.9,
    TVL: 2.8,
    stake: 92700
  })

  async function getAVAX() {
    await axios
      .get(`${process.env.NEXT_PUBLIC_ARVERSE_URL}/api/avax` ?? '')
      .then((res) => setAvax(res.data))
      .catch((err) => console.log('ERROR:', err))
  }

  // first time
  React.useEffect(() => {
    getAVAX()
  }, [])

  // every 5 mins
  React.useEffect(() => {
    const interval = setInterval(() => {
      getAVAX()
    }, 300000) // 5 mins
    return () => clearInterval(interval)
  }, [avax])

  function handleCopy() {
    setCopy('Copied')
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
        <h1 className="max-w-[640px] w-full font-medium text-[32px] leading-tight text-center z-10">
          Our avalanche staking service is trusted by millions of dollars from
          both institutional and retail investors
        </h1>
        <Link href="#">
          <a>
            <Button filled classNames="mt-[32px]" startIcon={<BookmarkIcon />}>
              Learn how to stake
            </Button>
          </a>
        </Link>
        <div className="mt-[64px] max-w-[640px] w-full font-medium">
          <p className="text-[16px]">Node ID</p>
          <div
            className="mt-[12px] flex items-center gap-[16px] p-[24px] w-full bg-accent text-white text-[20px] cursor-pointer rounded-lg"
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
        </div>

        <div className="mt-[50px] flex items-center justify-between max-w-[640px] w-full">
          <div className="">
            <p className="text-[16px] font-medium">Total stake</p>
            <div className="mt-[12px] w-full text-[20px]">
              <div
                className="w-fit flex items-baseline gap-[4px] cursor-pointer"
                onClick={() => setIsAvax(!isAvax)}
              >
                {isAvax ? (
                  <>
                    <h3 className="font-semibold text-[40px]">
                      {withCommas(avax.stake)}
                    </h3>
                    <span className="font-medium text-[12px]">AVAX</span>
                  </>
                ) : (
                  <h3 className="font-semibold text-[40px]">
                    ${withCommas(avax.stake * 20)}
                  </h3>
                )}
              </div>
              <p className="text-[16px] leading-tight">
                You can stake your AVAX for minimum 2 weeks and earn upto 9%
                rewards annually with us.
              </p>
            </div>
          </div>
          <div className="w-[120px] h-[120px] bg-green-400">High charts</div>
        </div>
        <div className="mt-[80px] flex">
          <Link href="#">
            <a className="w-[320px] h-[320px] flex justify-center items-center text-left bg-blue-light hover:bg-blue hover:text-white transition-all">
              <div className="w-[220px] flex flex-col justify-center gap-[10px]">
                <h3 className="font-black text-[28px]">Avascan</h3>
                <span className="text-[16px]">See node status</span>
                <RightArrowIcon className="mt-[10px]" />
              </div>
            </a>
          </Link>
          <Link href="#">
            <a className="w-[320px] h-[320px] flex justify-center items-center text-left bg-green-light hover:bg-green-dark hover:text-white transition-all">
              <div className="w-[220px] flex flex-col justify-center gap-[10px]">
                <h3 className="font-black text-[28px]">Allnodes</h3>
                <span className="text-[16px]">See validator info</span>
                <RightArrowIcon className="mt-[10px]" />
              </div>
            </a>
          </Link>
          <Link href="#">
            <a className="w-[320px] h-[320px] flex justify-center items-center text-left bg-red-light hover:bg-red hover:text-white transition-all">
              <div className="w-[220px] flex flex-col justify-center gap-[10px]">
                <h3 className="font-black text-[28px]">Stats</h3>
                <span className="text-[16px]">See validator stats</span>
                <RightArrowIcon className="mt-[10px]" />
              </div>
            </a>
          </Link>
        </div>
        <div className="mt-[160px] text-center">
          <h2 className="font-bold text-[48px]">Benefits of staking AVAX</h2>
          <span className="pt-[16px] text-gray text-[24px] font-medium leading-tight">
            Compound your AVAX holdings by
            <br /> earning 9% a year
          </span>
          <div className="mt-[80px] flex flex-col max-w-[640px] w-full">
            <div className="w-[400px] h-[400px] bg-white flex flex-col items-center justify-center gap-[8px] rounded-full">
              <CashIcon />
              <h3 className="mt-[16px] font-semibold text-[24px]">
                Start with 25 AVAX
              </h3>
              <span className="w-[250px] text-[16px] text-center leading-tight">
                You can start staking with as low as 25 AVAX with us.
              </span>
            </div>
            <div className="-my-[45px] ml-auto w-[400px] h-[400px] bg-white flex flex-col items-center justify-center gap-[8px] rounded-full">
              <PeakIcon />
              <h3 className="mt-[16px] font-semibold text-[24px]">
                Easy to earn
              </h3>
              <span className="w-[250px] text-[16px] text-center leading-tight">
                Running avalanche validator is hard. We make it easy for you to
                earn by staking.
              </span>
            </div>
            <div className="w-[400px] h-[400px] bg-white flex flex-col items-center justify-center gap-[8px] rounded-full">
              <StackIcon />
              <h3 className="mt-[16px] font-semibold text-[24px]">
                Put money to work
              </h3>
              <span className="w-[250px] text-[16px] text-center leading-tight">
                By earning extra rewards on your AVAX holdings, your investment
                gets compounded over a period of time.
              </span>
            </div>
          </div>
        </div>
        <Link href="#">
          <a className="px-[48px] mt-[160px] w-full h-[400px] flex justify-between items-center max-w-[640px] bg-accent text-white text-left rounded-[40px]">
            <div className="w-full flex flex-col justify-center gap-[10px]">
              <h3 className="font-black text-[28px]">Have question?</h3>
              <span className="text-[16px]">
                Check out help center to know more about staking
              </span>
              <RightArrowIcon className="mt-[10px]" />
            </div>
            <QuestionIcon />
          </a>
        </Link>
      </main>

      <Footer />
    </div>
  )
}

export default NodeID