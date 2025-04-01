import { useEffect, useState } from 'react';import { CRAZYTRON_ADDRESS, ZERO_ADDRESS } from '../config/constants';
import useRefresh from './useRefresh';
import { Address, parseAbi } from 'viem';
import { publicClient } from '@/utils/viem';

export function useReferrer(address: string) {
	const { fastRefresh } = useRefresh()

	const [referrer, setReferrer] = useState<string>(ZERO_ADDRESS);

	useEffect(() => {
		const fetchUserInfo = async () => {
				try {
					const _userReferrer = await publicClient({chainId: 97}).readContract({
						abi: parseAbi(['function userReferrer(address) public view returns (address)']),
						address: CRAZYTRON_ADDRESS,
						functionName: 'userReferrer',
						args: [
							address as Address
						]
					})
          setReferrer(_userReferrer)
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