import axios from 'axios'
import { avax } from 'helpers/avax-data'
import type { NextApiRequest, NextApiResponse } from 'next'
import areFieldsValid from 'utils/areFieldsValid'
import { getMinutesElapsed } from 'utils/elapsedTime'

export type Data = {
  price: number
  marketCap: number
  totalStake: number
  stake: number
  uptime: number
  rewardRate: number
  delegationFee: number
  startTime: number
  endTime: number
  remainingCapacity: number
  version: string
}

let data: Data = {
  price: 0,
  marketCap: 0,
  totalStake: 0,
  stake: 0,
  uptime: 0,
  rewardRate: 0,
  delegationFee: 0,
  version: '',
  startTime: 0,
  remainingCapacity: 0,
  endTime: 0
}

async function getAVAX() {
  await axios
    .get(`${process.env.API_ENDPOINT}/v/api/validators`)
    .then((res) => {
      let validator = res.data.validators?.filter(
        (v: any) => v.nodeID === process.env.NEXT_PUBLIC_NODE_ID
      )[0]
      data.stake = validator?.totalStakeAmount / 1e9
      data.uptime = validator?.uptime * 100
      data.totalStake =
        Math.round(((res.data.allStake * 100) / 1e9 / (7.2 * 1e8)) * 100) / 100
      data.rewardRate =
        Math.round(
          ((validator?.potentialReward * 100 * 365 * 24 * 3600) /
            (validator?.stakeAmount *
              (validator?.endTime - validator?.startTime))) *
            100
        ) / 100
      data.delegationFee = Math.round(validator?.delegationFee * 100) / 100
      data.startTime = validator?.startTime
      data.endTime = validator?.endTime
      data.remainingCapacity =
        Math.round((validator?.remainingCapacity / 1e9) * 100) / 100
      data.version = `v${validator?.version?.substring(10)}`
    })
    .catch((err) => console.log(err.message))

  const config = {
    headers: {
      'X-CMC_PRO_API_KEY': `${process.env.CMC_API_KEY}`
    }
  }
  await axios
    .get(`${process.env.CMC_ENDPOINT}`, config)
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
    .catch((err) => console.log(err.message))
}

const fetchData = (resData?: Data) => {
  getAVAX()
  if (areFieldsValid(data)) {
    avax.update(data)
    resData = data // eslint-disable-line
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let resData = avax.data()

  if (areFieldsValid(resData)) {
    let minElapsed = getMinutesElapsed(new Date(resData.createdAt), new Date())
    if (minElapsed >= 5) fetchData(resData)
  } else fetchData(resData)

  res.status(200).json(resData)
}
