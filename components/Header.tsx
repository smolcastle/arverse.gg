import Link from 'next/link'

const Header = () => {
  return (
    <header className="px-[30px] flex justify-between items-center pt-[50px] max-w-[700px] w-full mx-auto z-50">
      <Link href="/">
        <a className="text-[2rem] font-semibold text-accent">ARVERSE</a>
      </Link>
      <div className="flex sm:gap-8 gap-[40px] font-medium text-[1rem]">
        <Link href="faqs">
          <a>Help Center</a>
        </Link>
        <Link href="validator-node-id">
          <a>Node ID</a>
        </Link>
        <Link href="how-to-stake-avax">
          <a>Staking Guide</a>
        </Link>
      </div>
    </header>
  )
}

export default Header
