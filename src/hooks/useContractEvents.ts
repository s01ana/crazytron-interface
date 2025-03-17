import { useEffect, useState } from 'react';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { tronWeb } from '@/tronweb';
import { CRAZYTRON_ADDRESS } from '../config/constants';
import useRefresh from './useRefresh';

export function useContractEvents() {
	const { address } = useWallet();
	const { fastRefresh } = useRefresh()

	const [events, setEvents] = useState([]);

	useEffect(() => {
		const fetchUserInfo = async () => {
				try {
					const _events = await tronWeb.event.getEventsByContractAddress(CRAZYTRON_ADDRESS, {
						orderBy: 'block_timestamp,desc'
					})
					const data = _events?.data.map((event) => {
						return {
							blockNumber: event.block_number,
							blockTimestamp: event.block_timestamp / 1000,
							hash: event.transaction_id,
							eventName: event.event_name,
						}
					})
					setEvents(data)
					
				} catch (error) {
						// console.log('debug fetch allowance error::', error)
				}
			}
			if (address) {
				fetchUserInfo()
			}

	}, [fastRefresh, address])

	return {
		events
	};
}