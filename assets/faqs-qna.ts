import withCommas from 'utils/withCommas'

const faqs = (rewardRate: any, remainingCapacity: any) => [
  {
    question: 'Why should you stake?',
    answer:
      'When you stake your AVAX with us, you help secure the network. The more you stake, the more secure it becomes. In return, the network rewards stakers in the form of newly created AVAX tokens.'
  },
  {
    question: 'What does a validator do?',
    answer:
      'The validator validates transactions and mine new blocks on Avalanche network and its subnets.'
  },
  {
    question: 'What is the minimum amount I can stake with Arverse?',
    answer: '25 AVAX.'
  },
  {
    question: 'What is the maximum AVAX amount I can stake with Arverse?',
    answer: `You can stake upto ${withCommas(
      Number(remainingCapacity)
    )} AVAX with Arverse validator.`
  },
  {
    question: 'Are staking rewards taxable?',
    answer:
      'Depending on your jurisdiction, staking reward taxation may vary. We recommend consulting a tax advisor to ensure you stay compliant while minimizing your tax burden.'
  },
  {
    question: 'What is the staking APY for AVAX?',
    answer: `APY is how much interest you can earn by staking over a period of one year. Currently it is approximately ${
      rewardRate ?? 0
    }%.`
  },
  {
    question: 'What is delegation fee?',
    answer:
      'Delegation fee is the portion of the rewards that are paid to Arverse validator. Currently it is 10%. Note that this fee is deducted from your rewards. Example: you earn 90 AVAX from staking. 9 AVAX (10% fee) goes to Arverse validator. Your effective earning becomes 81 AVAX.'
  },
  {
    question: 'When can I unstake my AVAX?',
    answer:
      'At the end of your staking period, your AVAX will automatically be returned to you along with rewards earned. You must wait until your staking period ends.'
  },
  {
    question: 'Is Arverse secure?',
    answer:
      'Arverse is a highly secure validator infrastructure developed by a team of top security engineers.'
  }
]

export default faqs
