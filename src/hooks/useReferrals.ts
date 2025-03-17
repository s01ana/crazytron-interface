import { useEffect, useState } from 'react';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { tronWeb } from '@/tronweb';
import { CRAZYTRON_ADDRESS } from '../config/constants';
import useRefresh from './useRefresh';
import crazyAbi from '../abi/crazytron.json'

export function useReferrals(address: string) {
	// const { address } = useWallet();
	const { fastRefresh } = useRefresh()

	const [referrals, setReferrals] = useState([]);

	useEffect(() => {
		const fetchUserInfo = async () => {
				try {
					const crazyContract = await tronWeb.contract(crazyAbi, CRAZYTRON_ADDRESS)
          const _userReferrals = await crazyContract.getUserReferrals(address).call({ from: address })
          setReferrals(_userReferrals.referrals)
          console.log('referrals::', _userReferrals.referrals)
				} catch (error) {
						// console.log('debug fetch allowance error::', error)
				}
			}
			if (address) {
				fetchUserInfo()
			}

	}, [fastRefresh, address])

	return {
    referrals
	};
}