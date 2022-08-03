import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Button from '../components/Button'
import {
  RightArrowIcon,
  AvaxIcon,
  UptimeIcon,
  MonitorIcon,
  EnterpriseIcon
} from '../components/icons'
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import FAQsList from '../components/FAQsList'
import axios from 'axios'

const Home: NextPage = () => {
  const [isAvax, setIsAvax] = React.useState(true)
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="sm:pt-48 pt-24 px-4 flex flex-col items-center justify-center gap-6 mx-auto min-h-screen z-10">
        <div
          className={`absolute top-[calc(800px)] left-0 w-full ${
            isAvax
              ? 'lg:h-[2300px] md:h-[1900px] sm:h-[1900px] h-[1800px]'
              : 'lg:h-[2150px] md:h-[2000px] sm:h-[1800px] h-[1700px]'
          } bg-accent skew-y-6`}
        />
        <h1 className="font-bold text-[56px] text-center z-10">
          Compound your <span className="text-red">AVAX</span>
        </h1>
        <span className="px-4 my-4 md:w-[640px] font-medium text-[24px] text-center z-10">
          Stake your AVAX tokens and earn passive income on your investments
        </span>
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
        <div className="mt-6 max-w-[640px] w-full flex items-stretch min-h-[300px] z-10">
          <Link href="how-to-stake-avax">
            <a className="w-[320px] h-[320px] flex justify-center items-center text-left bg-red-light hover:bg-red hover:text-white transition-all">
              <div className="flex flex-col justify-center gap-[10px]">
                <h3 className="font-extrabold text-[28px]">STAKE WITH US</h3>
                <span className="text-[16px]">
                  Follow step by step tutorials
                </span>
                <RightArrowIcon className="mt-[10px]" />
              </div>
            </a>
          </Link>
          <Link href="validator-node-id">
            <a className="w-[320px] h-[320px] flex justify-center items-center text-left bg-green-light hover:bg-green hover:text-white transition-all">
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
            Stake with one of the largest validators of the Avalanche Blockchain
          </h2>
        </div>
        <div className="mt-[60px] z-10 text-white text-center font-extralight">
          {isAvax ? (
            <h2 className="lg:text-[448px] md:text-[300px] sm:text-[216px] text-[190px]">
              {avax.stake}
            </h2>
          ) : (
            <h2 className="flex items-center lg:text-[330px] md:text-[250px] sm:text-[150px] text-[130px]">
              <span className="font-medium text-[64px]">$</span>
              <span>{avax.stake * 20}</span>
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
          <p className="mt-[80px] font-medium text-[24px]">
            Avalanche is open, programmable smart contracts platform for
            decentralized applications. It is blazingly fast, low cost, and
            eco-friendly. Compared to Ethereum and Bitcoin, it is the fastest
            blockchain in terms of time-to-finality. What makes Avalanche unique
            are the subnets. Subnets are isolated networks that can be deployed
            with Avalalanche. Subnets don’t compete with other apps for network
            resources, and can scale infinitely.
          </p>
        </div>
        <div className="mt-[64px] flex flex-wrap gap-[40px] max-w-[640px] w-full mx-auto z-10">
          <Button startIcon={<AvaxIcon />} filled>
            Avalanche website
          </Button>
          <Button filled>Learn more about subnets</Button>
        </div>
        <div className="mt-[110px] flex text-center justify-evenly max-w-[640px] w-full mx-auto z-10">
          <div className="flex flex-col items-center gap-1">
            <h3 className="font-bold sm:text-4xl text-[40px]">
              ${avax.price ?? 22.98}
            </h3>
            <span className="text-[16px]">AVAX Price</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="font-bold sm:text-4xl text-[40px]">
              ${avax.marketCap ?? 16.5}B
            </h3>
            <span className="text-[16px]">AVAX marketcap</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="font-bold sm:text-4xl text-[40px]">
              ${avax.TVL ?? 2.8}B
            </h3>
            <span className="text-[16px]">Avalanche TVL</span>
          </div>
        </div>
        <div className="mt-[240px] flex flex-col justify-center items-center max-w-[920px] w-full z-10">
          <h2 className="font-bold text-[48px]">Why people trust us</h2>
          <div className="mt-[120px] w-full flex justify-center flex-wrap gap-[64px]">
            <div className="pt-16 pb-24 px-5 bg-white w-[264px] flex flex-col items-center justify-center gap-[24px] rounded-3xl shadow-md">
              <UptimeIcon />
              <h3 className="font-bold text-[24px]">High uptime</h3>
              <span className="font-medium text-[16px] text-center">
                Highly available and redundant validator nodes ensure 99.9%
                uptime
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
          <h2 className="pl-[32px] text-white font-bold text-[44px] w-[275px] leading-tight z-10">
            Stake with us to earn upto 8.0% a year on your AVAX
          </h2>
          <Link href="how-to-stake-avax">
            <a className="w-[320px] h-[320px] flex justify-center items-center text-left bg-white border-2 border-transparent hover:border-accent shadow-md transition-all z-10">
              <div className="flex flex-col justify-center gap-[10px]">
                <h3 className="font-extrabold text-[28px]">STAKE WITH US</h3>
                <span className="text-[16px]">
                  Follow step by step tutorials
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
