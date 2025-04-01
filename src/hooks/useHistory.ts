import { useEffect, useState } from 'react';
import { BACKEND_URL, CRAZYTRON_ADDRESS } from '../config/constants';
import useRefresh from './useRefresh';
import axios from 'axios';
import { isAddress } from 'viem';

export function useHistory(address: string, page: number, sort: boolean, limit: number) {
	const { fastRefresh } = useRefresh()

	const [data, setData] = useState<any>();

	useEffect(() => {
		const fetchUserInfo = async () => {
				try {
					if (!isAddress(address))
						return
					const response = await axios.post(`${BACKEND_URL}user/getHistory`, {
						address: address,
						page: 0,
						sort: sort ? '-1': '1',
						limit
					}, {
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