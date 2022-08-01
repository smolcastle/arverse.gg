import Link from 'next/link'

const Header = () => {
  return (
    <header className="px-4 flex justify-between items-center sm:pt-10 pt-5 md:max-w-[800px] w-full mx-auto z-50">
      <Link href="/">
        <a className="text-2xl font-semibold text-accent">ARVERSE</a>
      </Link>
      <div className="flex sm:gap-8 gap-3 font-medium">
        <Link href="faqs">
          <a>FAQs</a>
        </Link>
        <Link href="#">
          <a>Node ID</a>
        </Link>
        <Link href="#">
          <a>Stake with us</a>
        </Link>
      </div>
    </header>
  )
}

export default Header
