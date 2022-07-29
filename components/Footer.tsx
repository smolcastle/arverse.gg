import Link from "next/link";
import { PoweredIcon } from "./icons";

const Footer = () => {
  return (
    <footer className="px-4 pt-10 pb-10 flex justify-between items-start max-w-[800px] w-full mx-auto border-t border-gray-300">
      <div className="flex flex-col gap-4">
        <Link href="/">
          <a className="text-2xl font-semibold text-accent">ARVERSE</a>
        </Link>
        <span className="-mt-4 text-gray-600">
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
  );
};

export default Footer;
