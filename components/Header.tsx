import Link from 'next/link'

const Header = () => {
  return (
    <header className="px-[30px] flex justify-between items-center pt-[50px] max-w-[700px] w-full mx-auto z-50">
      <div className='flex sm:gap-2'>
        <img src='/beetroot.png' alt='Logo' style={{ width: '48px', height: '48px'}}/>
        <Link href="/">
          <a className="text-[2rem] font-semibold text-broot">Beetroot</a>
        </Link>
      </div>
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
