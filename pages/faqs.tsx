import { NextPage } from 'next'
import Header from '../components/Header'
import FAQsList from '../components/FAQsList'
import Footer from '../components/Footer'
import Head from 'next/head'

const FAQs: NextPage = () => {
  return (
    <div className="bg-light">
      <Head>
        <title>Arverse</title>
      </Head>

      <Header />
      <FAQsList />
      <Footer />
    </div>
  )
}

export default FAQs
