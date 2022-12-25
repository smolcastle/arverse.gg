import { NextPage } from 'next'
import Header from 'components/Header'
import FAQsList from 'components/FAQsList'
import Footer from 'components/Footer'
import Head from 'next/head'

const FAQs: NextPage = () => {
  return (
    <div className="bg-light">
      <Head>
        <title>Beetroot | Avalanche Validator, Frequently Asked Questions</title>
        <meta
          name="description"
          content="Answers to most of your questions related to Beetroot staking solution for Avalanche. If you have any other question, feel free to DM us on Twitter."
        />
        <meta
          property="og:title"
          content="Beetroot | Avalanche Validator, Frequently Asked Questions"
        />
        <meta
          property="og:og:description"
          content="Answers to most of your questions related to Beetroot staking solution for Avalanche. If you have any other question, feel free to DM us on Twitter."
        />
        <meta property="og:url" content="https://beetroot.ai/faqs" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://beetroot.ai/cover.jpg" />
      </Head>

      <Header />
      <FAQsList />
      <Footer />
    </div>
  )
}

export default FAQs
