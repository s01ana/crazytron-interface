import { useEffect, useState } from 'react';
import { BACKEND_URL, CRAZYTRON_ADDRESS, ZERO_ADDRESS } from '../config/constants';
import useRefresh from './useRefresh';
import axios from 'axios';
import { Address, parseAbi, zeroAddress } from 'viem';
import { publicClient } from '@/utils/viem';

export function usePackages(address: string) {
	const { slowRefresh, fastRefresh } = useRefresh()

	const [data, setData] = useState<any>();

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

					if (_userReferrer === zeroAddress) {
						setData(null)
						return;
					}
					const response = await axios.post(`${BACKEND_URL}user/getUserPacks`, {address: address}, {
						headers: {
							"Content-Type": 'application/x-www-form-urlencoded'
						}
					})

					if (response.status === 200 && response.data.data)
						setData(response.data.data)
				} catch (error) {
						// console.log('debug fetch allowance error::', error)
				}
			}
			if (address) {
				fetchUserInfo()
			}

	}, [fastRefresh, address])

	return {
		data
	};
}