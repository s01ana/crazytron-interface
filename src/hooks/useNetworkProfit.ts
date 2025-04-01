import { useEffect, useState } from 'react';
import { CRAZYTRON_ADDRESS } from '../config/constants';
import useRefresh from './useRefresh';
import { publicClient } from '@/utils/viem';
import { parseAbi } from 'viem';
import { useAccount } from 'wagmi';

export function useNetworkProfit() {
	const { address } = useAccount()
	const { fastRefresh } = useRefresh()

	const [packEarnings, setPackEarnings] = useState("0");
	const [networkEarnings, setNetworkEarnings] = useState("0");

	useEffect(() => {
		const fetchUserInfo = async () => {
				try {
					const _userTotalPackEarned = await publicClient({chainId: 97}).readContract({
						abi: parseAbi(['function userTotalPackPaid(address) public view returns (uint256)']),
						address: CRAZYTRON_ADDRESS,
						functionName: 'userTotalPackPaid',
						args: [
							address
						]
					})

					const _userTotalNetworkEarned = await publicClient({chainId: 97}).readContract({
						abi: parseAbi(['function userTotalNetworkPaid(address) public view returns (uint256)']),
						address: CRAZYTRON_ADDRESS,
						functionName: 'userTotalNetworkPaid',
						args: [
							address
						]
					})

					setPackEarnings((_userTotalPackEarned / 1000000000000000000n).toString())
          setNetworkEarnings((_userTotalNetworkEarned / 1000000000000000000n).toString())
					
				} catch (error) {
						// console.log('debug fetch allowance error::', error)
				}
			}
			if (address) {
				fetchUserInfo()
			}

	}, [fastRefresh, address])

	return {
		packEarnings,
		networkEarnings
	};
}