import { useEffect, useState } from 'react';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { tronWeb } from '@/tronweb';
import { CRAZYTRON_ADDRESS } from '../config/constants';
import useRefresh from './useRefresh';
import crazyAbi from '../abi/crazytron.json'
import { convertToRealNumber } from '../utils/common';

export function useQuickStats() {
	const { address } = useWallet();
	const { fastRefresh } = useRefresh()

	const [earnings, setEarnings] = useState("0");
	const [networkEarnings, setNetworkEarnings] = useState("0");
	const [profit, setProfit] = useState("0");
	const [distribution, setDistribution] = useState("0");
	const [referrals, setReferrals] = useState(0);

	useEffect(() => {
		const fetchUserInfo = async () => {
				try {
					const crazyContract = await tronWeb.contract(crazyAbi, CRAZYTRON_ADDRESS)
					const _userTotalEarned = await  crazyContract.userTotalPaid(address).call({ from: address })
					const _userTotalNetworkEarned = await  crazyContract.userTotalNetworkEarned(address).call({ from: address })
          const _userMonthlyProfit = await crazyContract.userMonthlyNetworkProfit(address).call({ from: address })

          const _userReferrals = await crazyContract.getUserReferrals(address).call({ from: address })

          setEarnings(convertToRealNumber(_userTotalEarned, 6).toFixed(2))
          setNetworkEarnings(convertToRealNumber(_userTotalNetworkEarned, 6).toFixed(2))
          setProfit(convertToRealNumber(_userMonthlyProfit, 6).toFixed(2))
          setReferrals(_userReferrals.referrals.length)
					
				} catch (error) {
						// console.log('debug fetch allowance error::', error)
				}
			}
			if (address) {
				fetchUserInfo()
			}

	}, [fastRefresh, address])

	return {
    earnings,
		networkEarnings,
		profit,
    distribution,
    referrals
	};
}