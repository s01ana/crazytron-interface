import { useEffect, useState } from 'react';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { tronWeb } from '@/tronweb';
import { CRAZYTRON_ADDRESS } from '../config/constants';
import useRefresh from './useRefresh';
import crazyAbi from '../abi/crazytron.json'

export function useReferrer(address: string) {
	// const { address } = useWallet();
	const { fastRefresh } = useRefresh()

	const [referrer, setReferrer] = useState<string>('');

	useEffect(() => {
		const fetchUserInfo = async () => {
				try {
					const crazyContract = await tronWeb.contract(crazyAbi, CRAZYTRON_ADDRESS)
          const _userReferrer = await crazyContract.userReferrer(address).call({ from: address })
          setReferrer(tronWeb.address.fromHex(_userReferrer))
				} catch (error) {
						// console.log('debug fetch allowance error::', error)
				}
			}
			if (address) {
				fetchUserInfo()
			}

	}, [fastRefresh, address])

	return {
    referrer
	};
}