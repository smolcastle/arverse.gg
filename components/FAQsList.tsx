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
import useSWR from 'swr'
import fetcher from 'utils/fetcher'

type Props = {
  limit?: number
}

const FAQsList = (props: Props) => {
  const currentPath = getBasePath()
  const [query, setQuery] = React.useState('')
  const [faqList, setFaqList] = React.useState<Array<any>>([])
  const [faqsCopy, setFaqsCopy] = React.useState<Array<any>>([])

  const { data } = useSWR('/api/avax', fetcher)
  React.useEffect(() => {
    setFaqsCopy(faqs(data?.rewardRate, data?.remainingCapacity))
  }, [data])

  React.useEffect(() => {
    if (query.length) {
      let newFaqs = faqsCopy.map((faq, index) => {
        let newFaq: object = {
          question: getSearchResults(faq.question, query),
          answer: getSearchResults(faq.answer, query)
        }
        if (!objEqual(newFaq, faqsCopy[index])) return newFaq
      })
      newFaqs = newFaqs.filter((faq) => Boolean(faq))
      setFaqList(newFaqs)
    } else setFaqList(faqsCopy)
  }, [query, setFaqList, faqsCopy])

  return (
    <div
      className={`${
        currentPath === '/' ? 'mt-[200px]' : 'mt-[140px] mb-[250px]'
      } px-[30px] flex flex-col justify-center items-center max-w-[700px] w-full mx-auto z-10`}
    >
      {currentPath === '/' ? (
        <h2 className="font-bold text-[48px] mb-[120px]">F.A.Qs</h2>
      ) : (
        <h1 className="font-bold text-[48px] mb-[32px]">Help Center</h1>
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
              <span
                className="cursor-pointer text-accent inline-flex items-center gap-[4px] font-semibold"
                onClick={() => {
                  setQuery('')
                }}
              >
                <span>Show all</span>
                <SmallArrowRight />
              </span>
            </div>
          ) : (
            ''
          )}
        </div>
      )}
      <div className="w-full flex justify-center border-b border-dashed border-black pb-[24px]">
        <dl className="w-full space-y-[24px] divide-y divide-dashed divide-black">
          {faqList.map((faq: any, index: number) => {
            if (props.limit && index >= props.limit) return
            return (
              <Disclosure
                as="div"
                key={index}
                className={index ? 'pt-[24px]' : ''}
              >
                {({ open }) => (
                  <>
                    <dt className="">
                      <Disclosure.Button className="text-left w-full flex justify-between items-center">
                        <span
                          className="font-semibold text-[32px] leading-snug"
                          dangerouslySetInnerHTML={{
                            __html: faq.question
                          }}
                        />
                        <span className="ml-10 flex items-center">
                          {open ? <CrossIcon /> : <PlusIcon />}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-[16px] pr-12">
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
          <a className="mt-[80px] w-full">
            <Button filled full>
              Visit help center
            </Button>
          </a>
        </Link>
      )}
    </div>
  )
}

export default FAQsList
