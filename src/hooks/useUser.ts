import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config/constants';
import useRefresh from './useRefresh';
import axios from 'axios';

export function useUser(address: string) {
	const { slowRefresh } = useRefresh()

	const [data, setData] = useState<any>();

	useEffect(() => {
		const fetchUserInfo = async () => {
				try {
					const response = await axios.post(`${BACKEND_URL}user/getUser`, {address: address}, {
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