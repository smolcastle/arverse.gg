import { Disclosure } from '@headlessui/react'
import Link from 'next/link'
import Button from './Button'
import { CrossIcon, PlusIcon } from './icons'
import faqs from 'assets/faqs-qna'
import getBasePath from 'utils/getBasePath'
import Input from './Input'
import React from 'react'
import SmallArrowRight from './icons/svgs/SmallArrowRight'
import getSearchResults from 'utils/getSearchResults'
import objEqual from 'utils/objEqual'

type Props = {
  limit?: number
}

const FAQsList = (props: Props) => {
  const currentPath = getBasePath()
  const [query, setQuery] = React.useState('')
  const [faqList, setFaqList] = React.useState<Array<any>>(faqs)

  React.useEffect(() => {
    if (query.length) {
      let newFaqs = faqs.map((faq, index) => {
        let newFaq = {
          question: getSearchResults(faq.question, query),
          answer: getSearchResults(faq.answer, query)
        }
        if (!objEqual(newFaq, faqs[index])) return newFaq
      })
      newFaqs = newFaqs.filter((faq) => Boolean(faq))
      setFaqList(newFaqs)
    } else setFaqList(faqs)
  }, [query])

  return (
    <div
      className={`${
        currentPath === '/' ? 'mt-[200px]' : 'mt-[140px] mb-[250px]'
      } px-[30px] flex flex-col justify-center items-center max-w-[700px] w-full mx-auto z-10`}
    >
      {currentPath === '/' ? (
        <h2 className="font-bold text-[48px] mb-[120px]">FAQs</h2>
      ) : (
        <h2 className="font-bold text-[48px] mb-[32px]">Help Center</h2>
      )}
      {currentPath === '/faqs' && (
        <div className="mb-[80px] w-full">
          <Input
            placeholder="Search your question here..."
            className="text-[24px] py-6 px-6"
            value={query}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setQuery(e.currentTarget.value)
            }}
          />
          {query.length ? (
            <div className="mt-4 text-[16px]">
              {faqList.length} matches found.{' '}
              <a
                href="#faqs"
                className="text-accent inline-flex items-center gap-[4px] font-semibold"
              >
                <span>Show all</span>
                <SmallArrowRight />
              </a>
            </div>
          ) : (
            ''
          )}
        </div>
      )}
      <div className="w-full flex justify-center gap-20 border-b border-dashed border-black pb-[40px]">
        <dl className="w-full space-y-[40px] divide-y divide-dashed divide-black">
          {faqList.map((faq: any, index: number) => {
            if (props.limit && index >= props.limit) return
            return (
              <Disclosure
                as="div"
                key={index}
                className={index ? 'pt-[40px]' : ''}
              >
                {({ open }) => (
                  <>
                    <dt className="">
                      <Disclosure.Button className="text-left w-full flex justify-between items-center">
                        <span
                          className="font-semibold text-[40px] leading-snug"
                          dangerouslySetInnerHTML={{
                            __html: faq.question
                          }}
                        />
                        <span className="ml-10 flex items-center">
                          {open ? <CrossIcon /> : <PlusIcon />}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-[24px] pr-12">
                      <p
                        className="text-[24px] leading-snug"
                        dangerouslySetInnerHTML={{
                          __html: faq.answer
                        }}
                      />
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            )
          })}
        </dl>
      </div>
      {currentPath === '/' && (
        <Link href="/faqs">
          <a className="mt-[80px]">
            <Button filled>More FAQs</Button>
          </a>
        </Link>
      )}
    </div>
  )
}

export default FAQsList
