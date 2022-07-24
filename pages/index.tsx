import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-2">
			<Head>
				<title>Arverse</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
				<h1 className="text-6xl font-bold">
					Welcome to{" "}
					<a
						className="text-blue-600"
						href="http://dashboard.arverse.gg:3000/d/kBQpRdWnk/avalanche-main-dashboard?orgId=1&refresh=10s"
					>
						Arverse.gg!
					</a>
				</h1>
			</main>
		</div>
	);
};

export default Home;
