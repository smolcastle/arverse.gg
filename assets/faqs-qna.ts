import withCommas from 'utils/withCommas'

const faqs = (rewardRate: any, remainingCapacity: any) => [
  {
    question: 'Why should you stake?',
    answer:
      'When you stake your AVAX to us, you help secure the network. The more you stake, the more secure it becomes. In return, the network rewards stakers in the form of newly created AVAX tokens.'
  },
  {
    question: 'What is the minimum amount I can stake to Beetroot?',
    answer: '25 AVAX.'
  },
  {
    question: 'What is delegation fee?',
    answer:
      'Delegation fee is the portion of the rewards that are paid to Beetroot validator. Currently it is 10%. Note that this fee is deducted from your rewards. Example: you earn 90 AVAX from staking. 9 AVAX (10% fee) goes to Beetroot validator. Your effective earning becomes 81 AVAX.'
  },
  {
    question: 'Are staking rewards taxable?',
    answer:
      'Depending on your jurisdiction, staking reward taxation may vary. We recommend consulting a tax advisor to ensure you stay compliant while minimizing your tax burden.'
  },
  {
    question: 'What is the maximum AVAX amount I can stake to Beetroot?',
    answer: `You can stake up to ${withCommas(
      Number(remainingCapacity)
    )} AVAX to Beetroot validator.`
  },
  {
    question: 'When can I unstake my AVAX?',
    answer:
      'At the end of your staking period, your AVAX will automatically be returned to you along with rewards earned. You must wait until your staking period ends.'
  },
  {
    question: 'What is Avalanche?',
    answer:
      'Avalanche is a blockchain platform that focusses on scalability, security and decentralization. Thanks to its Avalanche Consensus Protocol, it can process up to 4,500 transactions per second.'
  },
  {
    question: 'What consensus mechanism does Avalanche use?',
    answer:
      'Avalanche uses Proof-of-Stake (PoS) mechanism to achieve consensus among validators.'
  },
  {
    question: 'What is AVAX?',
    answer:
      'AVAX is the native currency of Avalanche blockchain. It is used to pay for transactions in Avalanche ecosystem.'
  },
  {
    question: 'What does a validator do?',
    answer:
      'The validator validates transactions and mine new blocks on Avalanche network and its subnets.'
  },
  {
    question: 'Are your funds safe with Beetroot?',
    answer:
      'Beetroot is a non-custodial staking provider which means that Beetroot can never access your staked AVAX. Unlike custodial staking providers such as Kraken, Binance, Coinbase, where your funds are controlled by the exchanges, with Beetroot, your funds are 100% in your control.'
  },
  {
    question: 'What is the staking APY for AVAX?',
    answer: `APY is how much interest you can earn by staking over a period of one year. Currently it is approximately ${
      rewardRate ?? 0
    }%.`
  },
  {
    question: 'Is Beetroot secure?',
    answer:
      'Beetroot is a highly secure validator infrastructure developed by a team of top security engineers.'
  }
]

export default faqs
