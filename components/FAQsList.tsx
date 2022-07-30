import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import Button from "./Button";
import { CrossIcon, PlusIcon } from "./icons";
import faqs from "../assets/faqs-qna";
import getBasePath from "../utils/getBasePath";
import Input from "./Input";

type Props = {
  limit?: number;
};

const FAQsList = (props: Props) => {
  const currentPath = getBasePath();

  return (
    <div className="px-4 sm:py-40 py-20 flex flex-col justify-center items-center gap-24 max-w-[800px] w-full mx-auto z-10">
      <h2 className="font-bold text-4xl">
        {currentPath === "/" ? "FAQs" : "Help Center"}
      </h2>
      {currentPath === "/faqs" && (
        <Input
          placeholder="Search your question here..."
          className="text-2xl py-6 px-6"
        />
      )}
      <div className="w-full flex justify-center gap-20">
        <dl className="w-full space-y-6 divide-y divide-dashed divide-black">
          {faqs.map((faq, index) => {
            if (props.limit && index >= props.limit) return;
            return (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
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
                )}
              </Disclosure>
            );
          })}
        </dl>
      </div>
      {currentPath === "/" && (
        <Link href="/faqs">
          <a>
            <Button filled>More FAQs</Button>
          </a>
        </Link>
      )}
    </div>
  );
};

export default FAQsList;
