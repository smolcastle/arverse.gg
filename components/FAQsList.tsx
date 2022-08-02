import { Disclosure } from '@headlessui/react'
import Link from 'next/link'
import Button from './Button'
import { CrossIcon, PlusIcon } from './icons'
import faqs from '../assets/faqs-qna'
import getBasePath from '../utils/getBasePath'
import Input from './Input'
import React from 'react'
import SmallArrowRight from './icons/svgs/SmallArrowRight'
import getSearchResults from '../utils/getSearchResults'
import objEqual from '../utils/objEqual'

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
    <div className="px-4 sm:py-40 py-20 flex flex-col justify-center items-center max-w-[640px] w-full mx-auto z-10">
      <h2 className="font-bold text-4xl mb-16">
        {currentPath === '/' ? 'FAQs' : 'Help Center'}
      </h2>
      {currentPath === '/faqs' && (
        <div className="mb-16 w-full">
          <Input
            placeholder="Search your question here..."
            className="text-2xl py-6 px-6"
            value={query}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setQuery(e.currentTarget.value)
            }}
          />
          {query.length ? (
            <div className="mt-4">
              {faqList.length} matches found{' '}
              <a
                href="#faqs"
                className="text-accent inline-flex items-center gap-2 font-medium"
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
      <div className="w-full flex justify-center gap-20">
        <dl className="w-full space-y-6 divide-y divide-dashed divide-black">
          {faqList.map((faq: any, index: number) => {
            if (props.limit && index >= props.limit) return
            return (
              <Disclosure as="div" key={index} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start">
                        <span
                          className="font-semibold text-3xl"
                          dangerouslySetInnerHTML={{
                            __html: faq.question
                          }}
                        />
                        <span className="ml-10 flex items-center">
                          {open ? <CrossIcon /> : <PlusIcon />}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-6 pr-12">
                      <p
                        className="text-2xl"
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
          <a className="mt-20">
            <Button filled>More FAQs</Button>
          </a>
        </Link>
      )}
    </div>
  )
}

export default FAQsList
