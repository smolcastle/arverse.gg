import Link from "next/link";

const Header = () => {
	return (
		<header className="flex justify-between items-center pt-10 w-[800px] mx-auto z-50">
			<Link href="/">
				<a className="text-2xl font-semibold text-accent">ARVERSE</a>
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
	);
};

export default Header;
