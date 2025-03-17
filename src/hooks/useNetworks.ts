import { useEffect, useState } from 'react';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { tronWeb } from '@/tronweb';
import { CRAZYTRON_ADDRESS } from '../config/constants';
import useRefresh from './useRefresh';
import crazyAbi from '../abi/crazytron.json'
import { convertToRealNumber } from '../utils/common';

export function useNetworks() {
	const { address } = useWallet();
	const { fastRefresh } = useRefresh()

	const [networkEarnings, setNetworkEarnings] = useState("0");
	const [referrals, setReferrals] = useState(0);
	const [networkLevel, setNetworkLevel] = useState(0);

	const [network, setNetwork] = useState([])

	useEffect(() => {
		const fetchUserInfo = async () => {
				try {
					const crazyContract = await tronWeb.contract(crazyAbi, CRAZYTRON_ADDRESS)
					const _userTotalNetworkEarned = await  crazyContract.userTotalNetworkEarned(address).call({ from: address })
					const _userReferrals = await crazyContract.getUserReferrals(address).call({ from: address })
					const _userPackIds = await crazyContract.getUserPackIds(address).call({ from: address })

					const ids = _userPackIds.ids.map((i) => Number(i))

					const userLevel = ids.length > 0 ? ids.length * 2 + (3 - ids.length > 0 ? 3 - ids.length : 0) : 0

					let _network = []

					for (let index = 0; index < _userReferrals.referral; index ++) {
						const userAddress = tronWeb.address.fromHex(_userReferrals.referral)
						const referrals = await crazyContract.getUserReferrals(userAddress).call({ from: address })
						const packIds = await crazyContract.getUserPackIds(address).call({ from: address })
						_network.push({
							address: userAddress,
							package: packIds.ids.length,
							referrals: referrals.referrals
						})
					}

					setNetwork(_network)

          setNetworkEarnings(convertToRealNumber(_userTotalNetworkEarned, 6).toFixed(2))
					setReferrals(_userReferrals.referrals.length)
					setNetworkLevel(userLevel)
					
				} catch (error) {
						// console.log('debug fetch allowance error::', error)
				}
			}
			if (address) {
				fetchUserInfo()
			}

	}, [fastRefresh, address])

	return {
		referrals,
		networkEarnings,
		networkLevel,
		network
	};
}