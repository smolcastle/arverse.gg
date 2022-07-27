import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

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
							<i>
								<svg
									className="w-16 h-16"
									viewBox="0 0 16 16"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
								</svg>
							</i>
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
							<i>
								<svg
									className="w-16 h-16"
									viewBox="0 0 16 16"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
								</svg>
							</i>
						</a>
					</Link>
				</div>
				<h2 className="self-start my-40 leading-snug font-semibold text-6xl">
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
			</main>
		</div>
	);
};

export default Home;
