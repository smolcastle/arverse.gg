import Link from "next/link";
import { PoweredIcon } from "./icons";

const Footer = () => {
  return (
    <footer className="px-4 pt-10 pb-10 flex flex-col max-w-[800px] w-full mx-auto border-t border-gray-300">
      <div className="flex justify-between items-start">
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
          <a href="https://twitter.com/sy100x">Follow us on Twitter</a>
          <Link href="faqs">
            <a>Help center</a>
          </Link>
          <Link href="#">
            <a>Node details</a>
          </Link>
          <Link href="#">
            <a>Staking guide</a>
          </Link>
        </div>
      </div>
      <div className="my-20">
        <h4 className="font-medium text-xl mb-5">Disclaimer</h4>
        <p>
          Arverse.gg (“the platform”) strives to provide the most reasonable and
          accurate information. Still all data and information presented on this
          platform may be wrong or does not reflect the current status. All
          information is subject to change and arverse.gg does not guarantee
          accuracy or completeness. The metrics arverse.gg has developed and
          presents on this platform are based on it´s own methodology and may be
          misinterpreted by the user. The annualized staking yields and annual
          issuance rates presented on the platform are mostly based on current
          conditions of the network and will effectively diverge. The calculator
          for staking rewards is simply an estimation of returns. Any output may
          effectively diverge. Proof of Stake in general is mostly based on
          randomness to select wallets for block producing rights. Therefore it
          is not possible to calculate accurate returns. Please consider all
          data and information presented on this platform simply as conservative
          estimate.
          <br />
          <br />
          Any data or information presented on this platform should not be
          considered investment advice, financial advice, trading advice or any
          other sort of advice. Arverse.gg never recommends or endorsed any
          investment decision such as buying, selling or holding a digital
          asset. Do not use any data or information presented on this platform
          as the only reference for your investment decision. The data may be
          wrong and is never sufficient to make investment decisions. Make your
          due dilligence and consult your financial advisory before investing in
          any digital asset. Only make investment decisions after evaluating
          many different sources, information provider and opinions. Digital
          Assets should be considered a very risky investment class. Do not
          invest anything that you can´t afford to loose. Arverse.gg will not be
          held responsible for any investment decision you make based on the
          information provided on the platform.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
