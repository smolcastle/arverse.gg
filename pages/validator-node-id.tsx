import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Button from 'components/Button'
import {
  RightArrowIcon,
  BookmarkIcon,
  CopyIcon,
  QuestionIcon,
  CashIcon,
  PeakIcon,
  StackIcon
} from 'components/icons'
import React from 'react'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Tooltip from 'components/Tooltip'
import withCommas from 'utils/withCommas'
import getDonutData, { circumference } from 'utils/getDonutData'
import useSWR from 'swr'
import fetcher from 'utils/fetcher'

const NodeID: NextPage = () => {
  const [isAvax, setIsAvax] = React.useState(true)
  const [copy, setCopy] = React.useState('Copy')
  const [daysLeft, setDaysLeft] = React.useState(300)
  const [fraction, setFraction] = React.useState(0)
  const [avax, setAvax] = React.useState<any>({})

  const { data, error } = useSWR('/api/avax', fetcher)
  console.log('😱 useSWR:', data, error)
  React.useEffect(() => {
    setAvax(data)

    let startTime = data?.startTime
    let endTime = data?.endTime
    let currTime = Math.floor(Date.now() / 1000)
    setDaysLeft(Math.floor((endTime - currTime) / (24 * 60 * 60)))

    let fraction = (endTime - currTime) / (endTime - startTime)
    setFraction(fraction)
  }, [data])

  if (!data) return <div>Loading...</div>

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
        <h1 className="max-w-[640px] w-full font-medium text-[32px] leading-tight text-center z-10">
          Our avalanche staking service is trusted by millions of dollars from
          both institutional and retail investors
        </h1>
        <Link href="how-to-stake-avax">
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
          <p className="mt-[12px] text-[16px] text-gray font-normal">
            Running {avax?.version}
          </p>
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
                      {withCommas(Number(avax?.stake))}
                    </h3>
                    <span className="font-medium text-[12px]">AVAX</span>
                  </>
                ) : (
                  <h3 className="font-semibold text-[40px]">
                    ${withCommas(Number(avax?.stake * avax?.price))}
                  </h3>
                )}
              </div>
              <p className="text-[16px] leading-tight">
                You can stake your AVAX for minimum 2 weeks and earn upto{' '}
                {avax?.rewardRate}% rewards annually with us.
              </p>
            </div>
          </div>
          {/* SVG Donut Chart */}
          <div className="relative w-[120px] h-[120px]">
            <svg
              className="w-[120px] h-[120px] -scale-y-100"
              viewBox="0 0 120 120"
            >
              <circle
                className="stroke-gray-300 fill-transparent"
                r="54"
                cx="60"
                cy="60"
                strokeWidth="12"
              />
              <circle
                className="stroke-green-400 fill-transparent"
                r="54"
                cx="60"
                cy="60"
                strokeWidth="12"
                strokeDasharray={getDonutData(circumference(54), fraction)}
                strokeDashoffset={circumference(54) / 4}
              />
            </svg>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Tooltip message="Time left">
                <span className="whitespace-nowrap text-[16px]">
                  <span className="font-semibold">
                    {daysLeft > 0 ? daysLeft : 0}
                  </span>{' '}
                  days
                </span>
              </Tooltip>
            </span>
          </div>
        </div>
        <div className="mt-[80px] flex flex-wrap justify-center">
          <Link href="https://avascan.info/staking/validator/NodeID-2pN3EtqAUKWvJedQvYfPSgKeonNmFn8bA">
            <a
              target={'_blank'}
              rel="noopener noreferrer"
              className="w-[320px] h-[320px] flex justify-center items-center text-left bg-blue-light hover:bg-blue hover:text-blue-light transition-all"
            >
              <div className="w-[220px] flex flex-col justify-center gap-[10px]">
                <h3 className="font-black text-[28px]">Avascan</h3>
                <span className="text-[16px]">See node status</span>
                <RightArrowIcon className="mt-[10px]" />
              </div>
            </a>
          </Link>
          <Link href="https://vscout.io/validator/NodeID-2pN3EtqAUKWvJedQvYfPSgKeonNmFn8bA">
            <a
              target={'_blank'}
              rel="noopener noreferrer"
              className="w-[320px] h-[320px] flex justify-center items-center text-left bg-green-light hover:bg-green-dark hover:text-green-light transition-all"
            >
              <div className="w-[220px] flex flex-col justify-center gap-[10px]">
                <h3 className="font-black text-[28px]">Vscout</h3>
                <span className="text-[16px]">See validator info</span>
                <RightArrowIcon className="mt-[10px]" />
              </div>
            </a>
          </Link>
          <Link href="https://stats.avax?.network/dashboard/validator-health-check/?nodeid=NodeID-2pN3EtqAUKWvJedQvYfPSgKeonNmFn8bA">
            <a
              target={'_blank'}
              rel="noopener noreferrer"
              className="w-[320px] h-[320px] flex justify-center items-center text-left bg-red-light hover:bg-red hover:text-red-light transition-all"
            >
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
          <span className="pt-[16px] text-gray text-[24px] font-regular leading-tight">
            Compound your AVAX holdings by
            <br /> earning {avax?.rewardRate}% a year
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
        <Link href="faqs">
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
