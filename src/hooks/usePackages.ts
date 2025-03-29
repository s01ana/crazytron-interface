import { useEffect, useState } from 'react';
import { BACKEND_URL, CRAZYTRON_ADDRESS, ZERO_ADDRESS } from '../config/constants';
import useRefresh from './useRefresh';
import axios from 'axios';
import { tronWeb } from '@/tronweb';
import crazyAbi from '../abi/crazytron.json'

export function usePackages(address: string) {
	const { slowRefresh } = useRefresh()

	const [data, setData] = useState<any>();

	useEffect(() => {
		const fetchUserInfo = async () => {
				try {
					const crazyContract = await tronWeb.contract(crazyAbi, CRAZYTRON_ADDRESS)
          const _userReferrer = await crazyContract.userReferrer(address).call({ from: address })

					if (tronWeb.address.fromHex(_userReferrer) === ZERO_ADDRESS) {
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

	}, [slowRefresh, address])

	return {
		data
	};
}