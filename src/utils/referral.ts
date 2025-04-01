import { ZERO_ADDRESS } from '@/config/constants'
import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useLocation } from 'react-router'
import { isAddress } from 'viem'

const referrerAtom = atomWithStorage<string>('crazytron:referrer', ZERO_ADDRESS)

const setReferrerAtom = atom(
  (get) => {
    return get(referrerAtom)
  },
  (_, set) => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const ref = queryParams.get('ref')
    if (isAddress(ref))
      set(referrerAtom, ref)
  }
)

export function useReferrerAtom() {
  return useAtom(setReferrerAtom)
}
