import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Button from "../components/Button";
import {
	RightArrowIcon,
	AvaxIcon,
	UptimeIcon,
	MonitorIcon,
	EnterpriseIcon,
	PlusIcon,
	CrossIcon,
	PoweredIcon,
} from "../components/icons";
import { Disclosure } from "@headlessui/react";
import React from "react";

const faqs = [
	{
		question: "Why should you stake?",
		answer: "When you stake your AVAX with us, you help secure the network. The more you stake, the more secure it becomes. In return, the network rewards stakers in the form of newly created AVAX tokens.",
	},
	{
		question: "What does a validator do?",
		answer: "The validator validates transactions and mine new blocks on Avalanche network and its subnets.",
	},
	{
		question: "How much you can stake with us?",
		answer: "Minimum: 25 AVAX, Maximum: calculate on the go = 92,700 * 5 - platform.getMaxStakeAmount",
	},
];

const Home: NextPage = () => {
	const [isAvax, setIsAvax] = React.useState(true);
	const [avax, setAvax] = React.useState(92700);

	return (
		<div className="w-full bg-light">
			<Head>
				<title>Arverse</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<header className="flex justify-between items-center pt-10 w-[800px] mx-auto z-50">
				<Link href="/">
					<a className="text-2xl font-semibold text-accent">
						ARVERSE
					</a>
				</Link>
				<div className="flex gap-8">
					<Link href="/faqs">
						<a>FAQs</a>
					</Link>
					<Link href="/node-id">
						<a>Node ID</a>
					</Link>
					<Link href="/stake-with-us">
						<a>Stake with us</a>
					</Link>
				</div>
			</header>

			<main className="pt-48 flex flex-col items-center justify-center gap-6 mx-auto min-h-screen z-10">
				<div className="absolute top-[calc(800px)] left-0 w-screen h-[calc(200vh-200px)] bg-accent skew-y-12" />
				<h1 className="font-bold text-7xl z-10">
					Compound your <span className="text-red-dark">AVAX</span>
				</h1>
				<span className="px-4 my-4 font-medium text-3xl text-center z-10">
					Stake your AVAX tokens and earn passive income on <br />
					your investments
				</span>
				<div className="my-6 flex gap-6 font-medium text-xl z-10">
					<span className="underline underline-offset-2 decoration-dotted">
						Fully decentralized
					</span>
					<span className="underline underline-offset-2 decoration-dotted">
						100% on-chain
					</span>
					<span className="underline underline-offset-2 decoration-dotted">
						Enterprise grade
					</span>
				</div>
				<div className="my-6 w-[800px] flex items-stretch h-[400px] z-10">
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
				<div className="mt-40 -mb-20 z-10 text-white">
					<h2 className="mx-auto w-[1000px] text-center leading-snug font-semibold text-5xl">
						Stake with one of the largest validators of the
						Avalanche Blockchain
					</h2>
				</div>
				<div className="mb-40 z-10 text-white">
					{isAvax ? (
						<h2 className="font-extralight text-[25rem]">{avax}</h2>
					) : (
						<h2 className="font-extralight text-[25rem] flex items-center">
							<span className="font-medium text-9xl">$</span>
							<span>{avax * 20}</span>
						</h2>
					)}
					<div className="w-full flex justify-center gap-2 text-2xl -mt-20">
						<button
							className={`px-2 ${
								isAvax ? "bg-red-dark" : "bg-green-dark"
							} text-white font-bold`}
							onClick={() => setIsAvax(!isAvax)}
						>
							{isAvax ? "AVAX" : "USD"}
						</button>
						<span className="font-semibold">staked with us</span>
					</div>
				</div>
				<div className="self-start max-w-[800px] w-full mx-auto text-white z-10">
					<h2 className="font-bold text-4xl my-12">
						What is Avalanche?
					</h2>
					<p className="font-medium text-xl leading-loose">
						Avalanche is open, programmable smart contracts platform
						for decentralized applications. It is blazingly fast,
						low cost, and eco-friendly. Compared to Ethereum and
						Bitcoin, it is the fastest blockchain in terms of
						time-to-finality. What makes Avalanche unique are the
						subnets. Subnets are isolated networks that can be
						deployed with Avalalanche. Subnets don’t compete with
						other apps for network resources, and can scale
						infinitely.
					</p>
				</div>
				<div className="flex gap-4 max-w-[800px] w-full mx-auto z-10">
					<Button startIcon={<AvaxIcon />} filled>
						Avalanche website
					</Button>
					<Button filled>Learn more about subnets</Button>
				</div>
				<div className="mt-28 flex gap-24 justify-center max-w-[800px] w-full mx-auto text-xl z-10">
					<div className="flex flex-col items-center gap-1">
						<h3 className="font-bold text-4xl">$22.98</h3>
						<span>AVAX Price</span>
					</div>
					<div className="flex flex-col items-center gap-1">
						<h3 className="font-bold text-4xl">$16.5B</h3>
						<span>AVAX marketcap</span>
					</div>
					<div className="flex flex-col items-center gap-1">
						<h3 className="font-bold text-4xl">$2.8B</h3>
						<span>Avalanche TVL</span>
					</div>
				</div>
				<div className="mt-40 flex flex-col justify-center items-center gap-24 max-w-[800px] w-full mx-auto z-10">
					<h2 className="font-bold text-4xl">Why people trust us</h2>
					<div className="flex justify-center gap-20">
						<div className="pt-16 pb-24 px-5 bg-white w-[300px] flex flex-col items-center justify-center gap-6 rounded-3xl shadow-lg">
							<UptimeIcon />
							<h3 className="font-bold text-2xl">High uptime</h3>
							<span className="font-medium text-lg text-center">
								Highly available and redundant validator nodes
								ensure 99.9% uptime
							</span>
						</div>
						<div className="pt-16 pb-24 px-5 bg-white w-[300px] flex flex-col items-center justify-center gap-6 rounded-3xl shadow-lg">
							<MonitorIcon />
							<h3 className="font-bold text-2xl">Monitoring</h3>
							<span className="font-medium text-lg text-center">
								Secure non-custodial staking with advanced
								monitroing and support
							</span>
						</div>
						<div className="pt-16 pb-24 px-5 bg-white w-[300px] flex flex-col items-center justify-center gap-6 rounded-3xl shadow-lg">
							<EnterpriseIcon />
							<h3 className="font-bold text-2xl">Enterprise</h3>
							<span className="font-medium text-lg text-center">
								Enterprise grade security infrastrucutre to
								support institutional staking
							</span>
						</div>
					</div>
				</div>
				<div className="mt-40 mb-40 flex flex-col justify-center items-center gap-24 max-w-[800px] w-full mx-auto z-10">
					<h2 className="font-bold text-4xl">FAQs</h2>
					<div className="w-full flex justify-center gap-20">
						<dl className="w-full space-y-6 divide-y divide-dashed divide-black">
							{faqs.map((faq) => (
								<Disclosure
									as="div"
									key={faq.question}
									className="pt-6"
								>
									{({ open }) => {
										console.log(open);
										return (
											<>
												<dt className="text-lg">
													<Disclosure.Button className="text-left w-full flex justify-between items-start">
														<span className="font-semibold text-3xl">
															{faq.question}
														</span>
														<span className="ml-10 flex items-center">
															{open ? (
																<CrossIcon />
															) : (
																<PlusIcon />
															)}
														</span>
													</Disclosure.Button>
												</dt>
												<Disclosure.Panel
													as="dd"
													className="mt-6 pr-12"
												>
													<p className="text-2xl">
														{faq.answer}
													</p>
												</Disclosure.Panel>
											</>
										);
									}}
								</Disclosure>
							))}
						</dl>
					</div>
					<Link href="#">
						<a>
							<Button filled>More FAQs</Button>
						</a>
					</Link>
				</div>
				<div className="relative mt-40 mb-60 pl-10 flex items-center justify-around gap-10 max-w-[800px] w-full mx-auto">
					<h2 className="text-white font-bold text-4xl w-1/4 leading-snug z-10">
						Stake with us to earn upto 8.0% a year on your AVAX
					</h2>
					<Link href="how-to-stake-avax">
						<a className="h-[400px] w-[400px] flex flex-col justify-center gap-4 px-10 text-left bg-white border-2 hover:border-accent transition-all z-10">
							<h3 className="font-extrabold text-4xl">
								STAKE WITH US
							</h3>
							<span className="text-2xl">
								Follow step by step tutorials
							</span>
							<RightArrowIcon />
						</a>
					</Link>
					<div className="w-[500px] h-[calc(100%+200px)] absolute top-1/2 left-0 -translate-y-1/2 bg-accent rounded-3xl" />
				</div>
			</main>
			<footer className="pt-10 pb-16 flex justify-between items-start max-w-[800px] w-full mx-auto border-t border-gray-300">
				<div className="flex flex-col gap-4">
					<Link href="/">
						<a className="text-2xl font-semibold text-accent">
							ARVERSE
						</a>
					</Link>
					<span className="-mt-4">
						&copy; {new Date().getFullYear()} Arverse
					</span>
					<PoweredIcon />
				</div>
				<div className="flex flex-col gap-1 text-right text-gray-600">
					<h3 className="font-semibold text-xl">Company</h3>
					<a href="#">Follow us on Twitter</a>
					<a href="#">Help center</a>
					<a href="#">Node details</a>
					<a href="#">Staking guide</a>
				</div>
			</footer>
		</div>
	);
};

export default Home;
