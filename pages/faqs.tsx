import { NextPage } from 'next'
import Header from '../components/Header'
import FAQsList from '../components/FAQsList'
import Footer from '../components/Footer'

const FAQs: NextPage = () => {
  return (
    <div className="bg-light">
      <Header />
      <FAQsList />
      <Footer />
    </div>
  )
}

export default FAQs
