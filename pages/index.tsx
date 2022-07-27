import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Button from "../components/Button";
import {
	ClockIcon,
	ServerIcon,
	CurrentIcon,
	RightArrowIcon,
} from "../components/icons";

const Home: NextPage = () => {
	return (
		<div className="w-full">
			<Head>
				<title>Arverse</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="pt-56 flex flex-col items-center justify-center gap-6 max-w-[800px] mx-auto min-h-screen">
				<h1 className="font-bold text-7xl">
					Compound your <span className="text-red-dark">AVAX</span>
				</h1>
				<span className="px-4 my-4 font-medium text-3xl text-center">
					Stake your AVAX tokens and earn passive income on <br />
					your investments
				</span>
				<div className="my-6 flex gap-6 font-medium text-xl">
					<span className="underline underline-offset-2 decoration-dotted">
						Fully decentralized
					</span>
					<span className="underline underline-offset-2 decoration-dotted">
						100% on-chain
					</span>
				</div>
				<div className="my-6 w-full flex items-stretch h-[400px]">
					<Link href="how-to-stake-avax">
						<a className="flex-1 flex flex-col justify-center gap-4 px-10 text-left bg-red-light hover:bg-red-dark hover:text-white transition-all">
							<h3 className="font-extrabold text-4xl">
								STAKE WITH US
							</h3>
							<span className="text-2xl">
								Follow step by step tutorials
							</span>
							<RightArrowIcon />
						</a>
					</Link>
					<Link href="validator-node-id">
						<a className="flex-1 flex flex-col justify-center gap-4 px-10 text-left bg-green-light hover:bg-green-dark hover:text-white transition-all">
							<h3 className="font-extrabold text-4xl">
								NODE STATUS
							</h3>
							<span className="text-2xl">
								View our node ID details
							</span>
							<RightArrowIcon />
						</a>
					</Link>
				</div>
				<div className="self-start mt-40">
					<h2 className="leading-snug font-semibold text-6xl">
						STAKE WITH
						<br />
						ONE OF THE
						<br />
						LARGEST
						<br />
						VALIDATOR
						<br />
						ON AVALANCHE
					</h2>
					{/* <div className="flex gap-4">
						<Button startIcon={<ServerIcon />} filled>
							Enterprise grade
						</Button>
						<Button startIcon={<ClockIcon />} filled>
							24x7 monitoring
						</Button>
						<Button startIcon={<CurrentIcon />} filled>
							99.93% uptime
						</Button>
					</div> */}
				</div>
				<div>
					<h2 className="font-extralight text-[34rem] text-transparent text-stroke">
						97200
					</h2>
					<span className="w-full flex justify-center gap-2 text-2xl -mt-20">
						<span className="px-2 bg-red-dark text-white font-bold">
							AVAX
						</span>
						<span>staked with us</span>
					</span>
				</div>
			</main>
		</div>
	);
};

export default Home;
