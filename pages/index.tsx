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
    price: 0,
    marketCap: 0,
    TVL: 0,
    stake: 0
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

  return (
    <div className="w-full bg-light">
      <Head>
        <title>Arverse</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="sm:pt-48 pt-24 px-4 flex flex-col items-center justify-center gap-6 mx-auto min-h-screen z-10">
        <div className="absolute top-[calc(800px)] left-0 w-full lg:h-[1700px] sm:h-[1500px] h-[1700px] bg-accent skew-y-6" />
        <h1 className="font-bold sm:text-7xl text-6xl text-center z-10">
          Compound your <span className="text-red">AVAX</span>
        </h1>
        <span className="px-4 my-4 md:w-[1000px] font-medium text-3xl text-center z-10">
          Stake your AVAX tokens and earn passive income on your investments
        </span>
        <div className="my-6 flex gap-6 font-medium text-xl z-10">
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
        <div className="my-6 max-w-[640px] w-full flex flex-wrap items-stretch min-h-[300px] z-10">
          <Link href="how-to-stake-avax">
            <a className="flex-1 flex flex-col justify-center gap-4 px-10 py-10 text-left bg-red-light hover:bg-red hover:text-white transition-all">
              <h3 className="font-extrabold text-4xl">STAKE WITH US</h3>
              <span className="text-2xl">Follow step by step tutorials</span>
              <RightArrowIcon />
            </a>
          </Link>
          <Link href="validator-node-id">
            <a className="flex-1 flex flex-col justify-center gap-4 px-10 py-10 text-left bg-green-light hover:bg-green hover:text-white transition-all">
              <h3 className="font-extrabold text-4xl">NODE STATUS</h3>
              <span className="text-2xl">
                View our node ID
                <br />
                details
              </span>
              <RightArrowIcon />
            </a>
          </Link>
        </div>
        <div className="sm:mt-40 mt-10 z-10 text-white">
          <h2 className="mx-auto max-w-[1000px] w-full text-center leading-snug font-semibold sm:text-5xl text-3xl">
            Stake with one of the largest validators of the Avalanche Blockchain
          </h2>
        </div>
        <div className="sm:mb-40 mb-10 z-10 text-white text-center">
          {isAvax ? (
            <h2 className="font-extralight lg:text-[20rem] md:text-[15rem] sm:text-[10rem] text-[5rem]">
              {avax.stake}
            </h2>
          ) : (
            <h2 className="font-extralight lg:text-[20rem] md:text-[15rem] sm:text-[10rem] text-[5rem] flex items-center">
              <span className="font-medium lg:text-[10rem] md:text-[8rem] text-[2rem]">
                $
              </span>
              <span>{avax.stake * 20}</span>
            </h2>
          )}
          <div className="w-full flex justify-center gap-2 text-2xl">
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
        <div className="self-start max-w-[640px] w-full mx-auto text-white z-10">
          <h2 className="font-bold text-4xl my-12">What is Avalanche?</h2>
          <p className="font-medium text-xl sm:leading-loose leading-snug">
            Avalanche is open, programmable smart contracts platform for
            decentralized applications. It is blazingly fast, low cost, and
            eco-friendly. Compared to Ethereum and Bitcoin, it is the fastest
            blockchain in terms of time-to-finality. What makes Avalanche unique
            are the subnets. Subnets are isolated networks that can be deployed
            with Avalalanche. Subnets don’t compete with other apps for network
            resources, and can scale infinitely.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 max-w-[640px] w-full mx-auto z-10">
          <Button startIcon={<AvaxIcon />} filled>
            Avalanche website
          </Button>
          <Button filled>Learn more about subnets</Button>
        </div>
        <div className="sm:mt-28 mt-20 flex sm:gap-24 gap-6 text-center justify-center md:max-w-[640px] w-full mx-auto text-xl z-10">
          <div className="flex flex-col items-center gap-1">
            <h3 className="font-bold sm:text-4xl text-2xl">
              ${avax.price ?? 22.98}
            </h3>
            <span className="font-medium">AVAX Price</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="font-bold sm:text-4xl text-2xl">
              ${avax.marketCap ?? 16.5}B
            </h3>
            <span className="font-medium">AVAX marketcap</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="font-bold sm:text-4xl text-2xl">
              ${avax.TVL ?? 2.8}B
            </h3>
            <span className="font-medium">Avalanche TVL</span>
          </div>
        </div>
        <div className="sm:mt-40 mt-20 flex flex-col justify-center items-center gap-24 w-full mx-auto z-10">
          <h2 className="font-bold text-4xl">Why people trust us</h2>
          <div className="flex justify-center flex-wrap gap-20">
            <div className="pt-16 pb-24 px-5 bg-white w-[300px] flex flex-col items-center justify-center gap-6 rounded-3xl shadow-md">
              <UptimeIcon />
              <h3 className="font-bold text-2xl">High uptime</h3>
              <span className="font-medium text-lg text-center">
                Highly available and redundant validator nodes ensure 99.9%
                uptime
              </span>
            </div>
            <div className="pt-16 pb-24 px-5 bg-white w-[300px] flex flex-col items-center justify-center gap-6 rounded-3xl shadow-md">
              <MonitorIcon />
              <h3 className="font-bold text-2xl">Monitoring</h3>
              <span className="font-medium text-lg text-center">
                Secure non-custodial staking with advanced monitroing and
                support
              </span>
            </div>
            <div className="pt-16 pb-24 px-5 bg-white w-[300px] flex flex-col items-center justify-center gap-6 rounded-3xl shadow-md">
              <EnterpriseIcon />
              <h3 className="font-bold text-2xl">Enterprise</h3>
              <span className="font-medium text-lg text-center">
                Enterprise grade security infrastrucutre to support
                institutional staking
              </span>
            </div>
          </div>
        </div>

        <FAQsList limit={3} />

        <div className="relative sm:mt-40 mt-20 sm:mb-60 mb-40 sm:pl-10 pl-5 flex items-center justify-around sm:gap-10 gap-5 max-w-[640px] w-full mx-auto">
          <h2 className="text-white font-bold sm:text-4xl text-2xl sm:w-1/4 w-3/4 leading-snug z-10">
            Stake with us to earn upto 8.0% a year on your AVAX
          </h2>
          <Link href="how-to-stake-avax">
            <a className="w-[400px] min-h-[400px] flex flex-col justify-center gap-4 sm:px-10 px-5 py-10 text-left bg-white border-2 border-transparent hover:border-accent shadow-md transition-all z-10">
              <h3 className="font-extrabold text-4xl">STAKE WITH US</h3>
              <span className="text-2xl">Follow step by step tutorials</span>
              <RightArrowIcon />
            </a>
          </Link>
          <div className="xs:w-[500px] w-full h-[calc(100%+200px)] absolute top-1/2 left-0 -translate-y-1/2 bg-accent rounded-3xl" />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
