import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  price: number
  marketCap: number
  TVL: number
  stake: number
}

let data: Data = {
  price: 0,
  marketCap: 0,
  TVL: 0,
  stake: 0
}

async function getStakedAmount() {
  let start = Math.floor(Date.now() / 1000)
  let end = Math.floor(
    new Date(new Date().setFullYear(new Date().getFullYear() + 1)).getTime() /
      1000
  )
  await axios
    .post(process.env.RPC_ENDPOINT ?? '', {
      jsonrpc: '2.0',
      id: 1,
      method: 'platform.getMaxStakeAmount',
      params: {
        nodeID: process.env.NEXT_PUBLIC_NODE_ID,
        startTime: start,
        endTime: end
      }
    })
    .then((res) => (data.stake = res.data?.result?.amount / 1e9))
    .catch((err) => console.log('ERROR:', err))
}

async function getPriceAndMarketCap() {
  const config = {
    headers: {
      'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY ?? ''
    }
  }
  await axios
    .get(process.env.CMC_ENDPOINT ?? '', config)
    .then((res) => {
      let fetchedData = res.data?.data?.filter(
        (curr: any) => curr.symbol === 'AVAX'
      )[0]
      data.price = Math.round(fetchedData.quote.USD.price * 100) / 100
      data.marketCap =
        Math.round(
          (fetchedData.quote.USD.fully_diluted_market_cap / 1e9) * 10
        ) / 10
    })
    .catch((err) => console.log('ERROR:', err))
}

async function getTVL() {
  data.TVL = 2.8
}

function getAVAX() {
  getStakedAmount()
  getPriceAndMarketCap()
  getTVL()
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  getAVAX()
  res.status(200).json(data)
}
