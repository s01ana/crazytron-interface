import { useContext } from 'react'
import { RefreshContext } from '../contexts/RefreshContext'

const useRefresh = () => {
  const { fast, slow, second } = useContext(RefreshContext)
  return { fastRefresh: fast, slowRefresh: slow, secondRefresh: second }
}

export default useRefresh
