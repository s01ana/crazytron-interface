import { useEffect, useState } from 'react';
import { BACKEND_URL, CRAZYTRON_ADDRESS, ZERO_ADDRESS } from '../config/constants';
import useRefresh from './useRefresh';
import {crazyTronABI} from '../abi/crazytron'
import axios from 'axios';
import { useReadContract } from 'wagmi';
import { zeroAddress } from 'viem';

export function useNetworks(address: string) {
	// const { address } = useWallet();
	const { slowRefresh, fastRefresh } = useRefresh()

	const [data, setData] = useState<any>();

	const result = useReadContract({
    abi: crazyTronABI,
    address: CRAZYTRON_ADDRESS,
    functionName: "userReferrer",
		args: [address]
  });

	useEffect(() => {
		const fetchUserInfo = async () => {
				try {
					if (result.data === zeroAddress) {
						setData(null)
						return;
					}
						
					const response = await axios.post(`${BACKEND_URL}user/getNetwork`, {address: address}, {
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