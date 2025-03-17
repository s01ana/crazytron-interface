import { useEffect, useState } from 'react';
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { tronWeb } from '@/tronweb';
import { USDT_ADDRESS, CRAZYTRON_ADDRESS } from '../config/constants';
import useRefresh from './useRefresh';
import crazyAbi from '../abi/crazytron.json'
import trc20Abi from '../abi/trc20.json'
import BigNumber from 'bignumber.js';
import { convertToRealNumber } from '../utils/common';
import toast, { Toaster } from "react-hot-toast";
import { useReferrerAtom } from '@/utils/referral';

export function useUserInfo() {
    const { address } = useWallet();
    const { fastRefresh } = useRefresh()
		const [userPackIds, setUserPackIds] = useState([]);
		const [userLastPaymentTime, setUserLastPaymentTime] = useState(0);
		const [userPacks, setUserPacks] = useState([]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const crazyContract = await tronWeb.contract(crazyAbi, CRAZYTRON_ADDRESS)
								const _userPackIds = await crazyContract.getUserPackIds(address).call({ from: address })
								const _lastPaymentTime = await crazyContract.getLastPaymentTime(address).call({ from: address })

								const ids = _userPackIds.ids.map((i) => Number(i))

								let packs = [];

								for (let index = 0; index < ids.length; index ++) {
									const pack = await crazyContract.packs(ids[index]).call({ from: address })
									packs.push({
										id: Number(pack.id),
										level: Number(pack.level),
										owner: tronWeb.address.fromHex(pack.owner),
										amount: Number(pack.initialAmount),
										totalPaid: Number(pack.totalPaid),
										lastPayoutTime: Number(pack.lastPayoutTime)
									})
								}

								packs = packs.sort((a, b) => a.level - b.level)
								setUserPackIds(_userPackIds.ids)
								setUserLastPaymentTime(Number(_lastPaymentTime.time))
								setUserPacks(packs)
            } catch (error) {
                // console.log('debug fetch allowance error::', error)
            }
        }
        if (address) {
            fetchUserInfo()
        }

    }, [fastRefresh, address])

    return {
			userPackIds,
			userLastPaymentTime,
			userPacks
		};
}

export function useNetworkProfit() {
	const { address } = useWallet();
	const { fastRefresh } = useRefresh()

	const [earnings, setEarnings] = useState("0");
	const [networkEarnings, setNetworkEarnings] = useState("0");

	useEffect(() => {
		const fetchUserInfo = async () => {
				try {
					const crazyContract = await tronWeb.contract(crazyAbi, CRAZYTRON_ADDRESS)
					const _userTotalEarned = await  crazyContract.userTotalPaid(address).call({ from: address })
					const _userTotalNetworkEarned = await  crazyContract.userTotalNetworkEarned(address).call({ from: address })

					setEarnings(convertToRealNumber(_userTotalEarned, 6).toFixed(2))
          setNetworkEarnings(convertToRealNumber(_userTotalNetworkEarned, 6).toFixed(2))
					
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
		networkEarnings
	};
}

export function useBalances() {
	const { address } = useWallet();

	const [tronBalance, setTronBalance] = useState(0);
	const [usdtBalance, setUsdtBalance] = useState(0);
	const [allowance, setAllowance] = useState(0);

	const { fastRefresh } = useRefresh()

	useEffect(() => {
		const fetchBalanceInfo = async () => {
			try {
				const balanceInSun = await tronWeb.trx.getBalance(address);
				const balanceInTrx = tronWeb.fromSun(balanceInSun);

				setTronBalance(balanceInTrx);

				const tokenContract = await tronWeb.contract(trc20Abi, USDT_ADDRESS);

				const resBalance = await tokenContract.balanceOf(address).call({ from: address });

				const resAllowance = await tokenContract.allowance(address, CRAZYTRON_ADDRESS).call({ from: address });

				const nBalance = convertToRealNumber(resBalance, 6);
				const nAllowance = convertToRealNumber(resAllowance, 6);

				setUsdtBalance(nBalance.toNumber());
				setAllowance(nAllowance.toNumber());
			} catch (error) {
					// console.log('debug fetch balance error::', error)
			}
		}

		if (address) {
				fetchBalanceInfo()
		}

	}, [fastRefresh, address])

	return {tronBalance, usdtBalance, allowance};
}

export function useManage() {
	const { address, signTransaction } = useWallet();
	const [pending, setPending] = useState(false);
	const [referrer] = useReferrerAtom()

	const onBuyPack = async (level: number, amount: number) => {
		if (address && tronWeb) {
			try {
				setPending(true)
				
				const options = {
					feeLimit: 500000000,
					callValue: 0,
					shouldPollResponse: true,
					from: address
				}

				const tokenContract = await tronWeb.contract(trc20Abi, USDT_ADDRESS)
				const crazyContract = await tronWeb.contract(crazyAbi, CRAZYTRON_ADDRESS)

				const resAllowance = await tokenContract.allowance(address, CRAZYTRON_ADDRESS).call({ from: address })

				const nAllowance = convertToRealNumber(resAllowance, 6)

				if (nAllowance.isLessThan(amount)) {
					const params1 = [{ type: 'address', value: CRAZYTRON_ADDRESS }, { type: 'uint256', value: 50000000 }]

					const { transaction: tx1} = await tronWeb.transactionBuilder.triggerSmartContract(
						USDT_ADDRESS,
						'approve(address,uint256)',
						options,
						params1,
						address
					)

					const signedTx1= await signTransaction(tx1)

					await tronWeb.trx.sendRawTransaction(signedTx1)
				}

				const params2 = [{ type: 'uint8', value: level }, { type: 'address', value: referrer }]

				const { transaction: tx2 } = await tronWeb.transactionBuilder.triggerSmartContract(
					CRAZYTRON_ADDRESS,
					'buyPack(uint8,address)',
					options,
					params2,
					address
				)

				const signedTx2 = await signTransaction(tx2)

				const response = await tronWeb.trx.sendRawTransaction(signedTx2)

				setPending(false)
				return {result: response.result, tx: response.txid}
			} catch (error) {
				console.log(error.message)
				if (error.message !== 'Confirmation declined by user') {
					toast.error(error.message)
				}
			} finally {
				setPending(false)
			}
		} else {
			toast.error("Wallet is not connected")
		}
	}

	const onClaim = async (id: number) => {
		if (address && tronWeb) {
			try {
				setPending(true)
				
				const options = {
					feeLimit: 500000000,
					callValue: 0,
					shouldPollResponse: true,
					from: address
				}

				const params = [{ type: 'uint256', value: id }]

				const { transaction: tx } = await tronWeb.transactionBuilder.triggerSmartContract(
					CRAZYTRON_ADDRESS,
					'payoutPack(uint256)',
					options,
					params,
					address
				)

				const signedTx = await signTransaction(tx)

				const response = await tronWeb.trx.sendRawTransaction(signedTx)

				setPending(false)
				return {result: response.result, tx: response.txid}
			} catch (error) {
				console.log(error.message)
				if (error.message !== 'Confirmation declined by user') {
					toast.error(error.message)
				}
			} finally {
				setPending(false)
			}
		} else {
			toast.error("Wallet is not connected")
		}
	}

	const onPayFee = async () => {
		if (address && tronWeb) {
			try {
				setPending(true)
				
				const options = {
					feeLimit: 500000000,
					callValue: 0,
					shouldPollResponse: true,
					from: address
				}

				const tokenContract = await tronWeb.contract(trc20Abi, USDT_ADDRESS)

				const resAllowance = await tokenContract.allowance(address, CRAZYTRON_ADDRESS).call({ from: address })

				const nAllowance = convertToRealNumber(resAllowance, 6)

				if (nAllowance.isLessThan(50)) {
					const params1 = [{ type: 'address', value: CRAZYTRON_ADDRESS }, { type: 'uint256', value: 50000000 }]

					const { transaction: tx1} = await tronWeb.transactionBuilder.triggerSmartContract(
						USDT_ADDRESS,
						'approve(address,uint256)',
						options,
						params1,
						address
					)

					const signedTx1= await signTransaction(tx1)

					await tronWeb.trx.sendRawTransaction(signedTx1)
				}

				const { result, transaction: tx2 } = await tronWeb.transactionBuilder.triggerSmartContract(
					CRAZYTRON_ADDRESS,
					'payNetwork()',
					options,
					[],
					address
				)

				console.log(result)

				const signedTx2 = await signTransaction(tx2)

				const response = await tronWeb.trx.sendRawTransaction(signedTx2)

				setPending(false)
				return {result: response.result, tx: response.txid}
			} catch (error) {
				console.log(error.message)
				if (error.message !== 'Confirmation declined by user') {
					toast.error(error.message)
				}
			} finally {
				setPending(false)
			}
		} else {
			toast.error("Wallet is not connected")
		}
	}

	return {
		onBuyPack,
		onClaim,
		onPayFee,
		pending
	}
}