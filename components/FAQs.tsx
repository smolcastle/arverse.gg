import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import Button from "./Button";
import { CrossIcon, PlusIcon } from "./icons";

const faqs = [
  {
    question: "Why should you stake?",
    answer:
      "When you stake your AVAX with us, you help secure the network. The more you stake, the more secure it becomes. In return, the network rewards stakers in the form of newly created AVAX tokens.",
  },
  {
    question: "What does a validator do?",
    answer:
      "The validator validates transactions and mine new blocks on Avalanche network and its subnets.",
  },
  {
    question: "How much you can stake with us?",
    answer:
      "Minimum: 25 AVAX, Maximum: calculate on the go = 92,700 * 5 - platform.getMaxStakeAmount",
  },
];

const FAQs = () => {
  return (
    <div className="px-4 sm:my-40 my-20 flex flex-col justify-center items-center gap-24 max-w-[800px] w-full mx-auto z-10">
      <h2 className="font-bold text-4xl">FAQs</h2>
      <div className="w-full flex justify-center gap-20">
        <dl className="w-full space-y-6 divide-y divide-dashed divide-black">
          {faqs.map((faq) => (
            <Disclosure as="div" key={faq.question} className="pt-6">
              {({ open }) => {
                open;
                return (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start">
                        <span className="font-semibold text-3xl">
                          {faq.question}
                        </span>
                        <span className="ml-10 flex items-center">
                          {open ? <CrossIcon /> : <PlusIcon />}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-6 pr-12">
                      <p className="text-2xl">{faq.answer}</p>
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
  );
};

export default FAQs;
