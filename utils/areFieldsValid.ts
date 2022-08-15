import { Data } from 'pages/api/avax'

const areFieldsValid = (data: Data) => {
  if (
    Boolean(data.price) &&
    Boolean(data.marketCap) &&
    Boolean(data.totalStake) &&
    Boolean(data.stake) &&
    Boolean(data.uptime) &&
    Boolean(data.rewardRate) &&
    Boolean(data.delegationFee) &&
    Boolean(data.startTime) &&
    Boolean(data.endTime) &&
    Boolean(data.remainingCapacity) &&
    Boolean(data.version)
  )
    return true
  return false
}

export default areFieldsValid
