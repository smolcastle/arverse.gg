import { useRouter } from 'next/router'

const getBasePath = () => {
  const { pathname } = useRouter()
  return '/' + pathname.split('/')[1]
}

export default getBasePath
