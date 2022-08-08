import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  price: number
  marketCap: number
  totalStake: string
  stake: number
  uptime: number
}

let data: Data = {
  price: 0,
  marketCap: 0,
  totalStake: '',
  stake: 0,
  uptime: 0
}

async function getAVAX() {
  await axios
    .get(process.env.VSCOUT_ENDPOINT ?? '')
    .then((res) => {
      let validator = res.data.validators?.filter(
        (v: any) => v.nodeID === process.env.NEXT_PUBLIC_NODE_ID ?? ''
      )[0]
      data.stake = validator?.totalStakeAmount / 1e9 ?? 0
      data.uptime = validator?.uptime * 100 ?? 0
      data.totalStake = (
        Math.round(((res.data.allStake * 100) / 1e9 / (7.2 * 1e8)) * 100) /
          100 ?? 0
      ).toFixed(2)
      // console.log(data.totalStake)
    })
    .catch((err) => console.log('ERROR:', err.message))

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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  getAVAX()
  res.status(200).json(data)
}
