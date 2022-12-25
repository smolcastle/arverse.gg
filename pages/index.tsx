import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Button from 'components/Button'
import {
  RightArrowIcon,
  AvaxIcon,
  UptimeIcon,
  MonitorIcon,
  EnterpriseIcon
} from 'components/icons'
import React from 'react'
import Footer from 'components/Footer'
import withCommas from 'utils/withCommas'
import Header from 'components/Header'
import FAQsList from 'components/FAQsList'
import useSWR from 'swr'
import fetcher from 'utils/fetcher'
import Loader from 'components/Loader'

const Home: NextPage<any> = () => {
  const [isAvax, setIsAvax] = React.useState(true)
  const [avax, setAvax] = React.useState<any>({})

  const { data } = useSWR('/api/avax', fetcher)
  React.useEffect(() => {
    setAvax(data)
  }, [data])

  return (
    <div className="w-full bg-light">
      <Head>
        <title>
          Beetroot | Avalanche Validator, Earn Staking Rewards on AVAX
        </title>
        <meta
          name="description"
          content="Beetroot is a non-custodial staking provider for Avalanche blockchain. You can stake AVAX and earn up to 9.22% per annum."
        />
        <meta
          property="og:title"
          content="Beetroot | Avalanche Validator, Earn Staking Rewards on AVAX"
        />
        <meta
          property="og:og:description"
          content="Beetroot is a non-custodial staking provider for Avalanche blockchain. You can stake AVAX and earn up to 9.22% per annum."
        />
        <meta property="og:url" content="https://beetroot.ai/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://beetroot.ai/cover.jpg" />
      </Head>

      <Header />

      <main className="pt-[140px] px-4 flex flex-col items-center justify-center gap-6 mx-auto min-h-screen z-10">
        <div
          className={`absolute top-[calc(800px)] left-0 w-full ${
            isAvax
              ? 'lg:h-[2200px] md:h-[1900px] sm:h-[1800px] h-[1750px]'
              : 'lg:h-[2000px] md:h-[1850px] sm:h-[1700px] h-[1650px]'
          } bg-accent skew-y-6`}
        />
        <h1 className="max-w-[640px] w-full font-bold text-[44px] text-center z-10">
          Stake, Earn, Grow your <span className="text-red">AVAX</span>
        </h1>
        {avax?.rewardRate > 0 ? (
          <span className="px-4 my-4 max-w-[640px] w-full font-medium text-[24px] text-center z-10">
            Beetroot is a non-custodial staking provider for Avalanche
            blockchain. You can stake AVAX and earn up to {avax?.rewardRate}%
            per annum.
          </span>
        ) : (
          <Loader />
        )}
        <div className="my-4 flex gap-6 font-medium text-[16px] z-10">
          <span className="underline underline-offset-2 decoration-dotted text-center">
            Fully decentralized
          </span>
          <span className="underline underline-offset-2 decoration-dotted text-center">
            100% on-chain
          </span>
          <span className="underline underline-offset-2 decoration-dotted text-center">
            Enterprise grade
          </span>
        </div>
        <div className="mt-6 max-w-[640px] w-full flex items-stretch justify-center flex-wrap min-h-[300px] z-10">
          <Link href="how-to-stake-avax">
            <a className="w-[320px] h-[320px] flex justify-center items-center text-left bg-red-light hover:bg-red hover:text-red-light transition-all">
              <div className="flex flex-col justify-center gap-[10px]">
                <h3 className="font-extrabold text-[28px]">STAKING GUIDE</h3>
                <span className="text-[16px]">
                  Follow step by step tutorial
                </span>
                <RightArrowIcon className="mt-[10px]" />
              </div>
            </a>
          </Link>
          <Link href="validator-node-id">
            <a className="w-[320px] h-[320px] flex justify-center items-center text-left bg-green-light hover:bg-green hover:text-green-light transition-all">
              <div className="flex flex-col justify-center gap-[10px]">
                <h3 className="font-extrabold text-[28px]">NODE STATUS</h3>
                <span className="text-[16px]">View our node ID details</span>
                <RightArrowIcon className="mt-[10px]" />
              </div>
            </a>
          </Link>
        </div>
        <div className="mt-[280px] lg:max-w-[1000px] max-w-[640px] w-full z-10 text-white">
          <h2 className="mx-auto text-center leading-snug font-semibold lg:text-[48px] text-[32px]">
            Beetroot is trusted by millions of dollars from both institutional
            and retail investors
          </h2>
        </div>
        <div className="mt-[60px] z-10 text-white text-center font-extralight">
          {isAvax ? (
            avax?.stake ? (
              <h2 className="lg:text-[320px] md:text-[200px] sm:text-[116px] text-[90px]">
                {withCommas(Math.floor(avax?.stake))}
              </h2>
            ) : (
              <Loader />
            )
          ) : (
            <h2 className="flex items-center lg:text-[320px] md:text-[200px] sm:text-[116px] text-[70px]">
              <span className="font-medium text-[64px]">$</span>

              {avax?.price > 0 ? (
                <span>{withCommas(Math.floor(avax?.stake * avax?.price))}</span>
              ) : (
                <Loader />
              )}
            </h2>
          )}
          <div className="w-full flex justify-center gap-2 text-[24px]">
            <button
              className={`px-2 ${
                isAvax ? 'bg-red' : 'bg-green'
              } text-white font-bold`}
              onClick={() => setIsAvax(!isAvax)}
            >
              {isAvax ? 'AVAX' : 'USD'}
            </button>
            <span className="font-semibold">staked with us</span>
          </div>
        </div>
        <div className="mt-[300px] self-start max-w-[640px] w-full mx-auto text-white z-10">
          <h2 className="font-bold text-[48px]">What is Avalanche?</h2>
          <p className="mt-[40px] font-regular text-[24px]">
            Avalanche is open, programmable smart contracts platform for
            decentralized applications. It is blazingly fast, low cost, and
            eco-friendly. Compared to Ethereum and Bitcoin, it is the fastest
            blockchain in terms of time-to-finality. What makes Avalanche unique
            are the subnets. Subnets are isolated networks that can be deployed
            with Avalalanche. Subnets don't compete with other apps for network
            resources, and can scale infinitely.
          </p>
        </div>
        <div className="mt-[40px] flex flex-wrap gap-[40px] max-w-[640px] w-full mx-auto z-10">
          <a
            href="https://www.avax.network/"
            target={'_blank'}
            rel="noreferrer noopener"
          >
            <Button startIcon={<AvaxIcon />} filled>
              Avalanche website
            </Button>
          </a>
          <a
            href="https://www.avax.network/subnets"
            target={'_blank'}
            rel="noreferrer noopener"
          >
            <Button filled>Learn more about subnets</Button>
          </a>
        </div>
        <div className="mt-[110px] flex text-center justify-evenly max-w-[640px] w-full mx-auto z-10">
          <div className="flex flex-col items-center gap-1">
            {avax?.price > 0 ? (
              <h3 className="font-bold sm:text-4xl text-[40px]">
                ${avax?.price}
              </h3>
            ) : (
              <Loader />
            )}
            <span className="text-[16px]">AVAX Price</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            {avax?.price > 0 ? (
              <h3 className="font-bold sm:text-4xl text-[40px]">
                ${avax?.marketCap}B
              </h3>
            ) : (
              <Loader />
            )}
            <span className="text-[16px]">AVAX marketcap</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            {avax?.price > 0 ? (
              <h3 className="font-bold sm:text-4xl text-[40px]">
                {avax?.totalStake}%
              </h3>
            ) : (
              <Loader />
            )}
            <span className="text-[16px]">AVAX Stake</span>
          </div>
        </div>
        <div className="mt-[240px] flex flex-col justify-center items-center max-w-[920px] w-full z-10">
          <h2 className="font-bold text-[48px]">Why people trust us</h2>
          <div className="mt-[120px] w-full flex justify-center flex-wrap gap-[64px]">
            <div className="pt-16 pb-24 px-5 bg-white w-[264px] flex flex-col items-center justify-center gap-[24px] rounded-3xl shadow-md">
              <UptimeIcon />
              <h3 className="font-bold text-[24px]">High uptime</h3>
              <span className="font-medium text-[16px] text-center">
                Highly available and redundant validator nodes ensure{' '}
                {Number(avax?.uptime).toFixed(2)}% uptime
              </span>
            </div>
            <div className="pt-16 pb-24 px-5 bg-white w-[264px] flex flex-col items-center justify-center gap-[24px] rounded-3xl shadow-md">
              <MonitorIcon />
              <h3 className="font-bold text-[24px]">Monitoring</h3>
              <span className="font-medium text-[16px] text-center">
                Secure non-custodial staking with advanced monitroing and
                support
              </span>
            </div>
            <div className="pt-16 pb-24 px-5 bg-white w-[264px] flex flex-col items-center justify-center gap-[24px] rounded-3xl shadow-md">
              <EnterpriseIcon />
              <h3 className="font-bold text-[24px]">Enterprise</h3>
              <span className="font-medium text-[16px] text-center">
                Enterprise grade security infrastrucutre to support
                institutional staking
              </span>
            </div>
          </div>
        </div>

        <FAQsList limit={3} />

        <div className="relative mt-[275px] mb-[160px] flex items-center justify-between gap-[16px] max-w-[640px] w-full mx-auto">
          <h2 className="pl-[32px] text-white font-bold text-[44px] w-[280px] leading-tight z-10">
            Stake to Beetroot and earn up to {avax?.rewardRate}% per on your AVAX
          </h2>
          <Link href="how-to-stake-avax">
            <a className="w-[320px] h-[320px] flex justify-center items-center text-left bg-white border-2 border-transparent hover:border-accent shadow-md transition-all z-10">
              <div className="flex flex-col justify-center gap-[10px]">
                <h3 className="font-extrabold text-[28px]">STAKING GUIDE</h3>
                <span className="text-[16px]">
                  Follow these five simple steps
                </span>
                <RightArrowIcon className="mt-[10px]" />
              </div>
            </a>
          </Link>
          <div className="max-w-[540px] w-full h-[640px] absolute top-1/2 left-0 -translate-y-1/2 bg-accent rounded-3xl" />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
