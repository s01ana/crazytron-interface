import { useEffect, useMemo, useState } from "react";
import { Abi, Address, erc20Abi, EstimateContractGasParameters, WriteContractParameters } from 'viem'
import { USDT_ADDRESS, CRAZYTRON_ADDRESS, ChainId } from "../config/constants";
import {crazyTronABI} from "../abi/crazytron";
import BigNumber from "bignumber.js";
import { config, sleep } from "../utils/common";
import toast, { Toaster } from "react-hot-toast";
import { useReferrerAtom } from "@/utils/referral";
import { useWalletClient } from "wagmi";
import { readContract } from "@wagmi/core";
import { publicClient } from "@/utils/viem";

export function useManage() {
  const { data: walletClient } = useWalletClient()
  const [pending, setPending] = useState(false);
  const [referrer] = useReferrerAtom();

  const onBuyPack = async (level: number, amount: number) => {
    if (walletClient) {
      try {
        setPending(true);

        const resAllowance = await publicClient({chainId: 97}).readContract({
          abi: erc20Abi,
          address: USDT_ADDRESS,
          functionName: 'allowance',
          args: [
            walletClient.account.address,
            CRAZYTRON_ADDRESS
          ]
        })

        const nAllowance = new BigNumber(resAllowance.toString()).div(1e18);

        if (nAllowance.isLessThan(amount)) {
          await walletClient.writeContract({
            abi: erc20Abi,
            address: USDT_ADDRESS,
            account: walletClient.account,
            functionName: 'approve',
            args: [
              CRAZYTRON_ADDRESS as Address,
              BigInt(amount * 1e18)
            ],
          } as unknown as WriteContractParameters)
          await sleep(3000)
        }

        const hash = await walletClient.writeContract({
          abi: crazyTronABI,
          address: CRAZYTRON_ADDRESS,
          functionName: 'buyPack',
          args: [
            level,
            referrer
          ],
        } as unknown as WriteContractParameters)

        setPending(false);
        return { result: hash };
      } catch (error) {
        console.log(error.message);
        if (!error.message.includes("User rejected the request")) {
          toast.error(error.message);
        }
      } finally {
        setPending(false);
      }
    } else {
      toast.error("Wallet is not connected");
    }
  };

	const onResetPack = async (id: number, amount: number) => {
    if (walletClient) {
      try {
        setPending(true);

        const resAllowance = await publicClient({chainId: 97}).readContract({
          abi: erc20Abi,
          address: USDT_ADDRESS,
          functionName: 'allowance',
          args: [
            walletClient.account.address,
            CRAZYTRON_ADDRESS
          ]
        })

        const nAllowance = new BigNumber(resAllowance.toString()).div(1e18);

        if (nAllowance.isLessThan(amount)) {
          await walletClient.writeContract({
            abi: erc20Abi,
            address: USDT_ADDRESS,
            account: walletClient.account,
            functionName: 'approve',
            args: [
              CRAZYTRON_ADDRESS as Address,
              BigInt(amount * 1e18)
            ],
          } as unknown as WriteContractParameters)
          await sleep(3000)
        }

        const hash = await walletClient.writeContract({
          abi: crazyTronABI,
          address: CRAZYTRON_ADDRESS,
          functionName: 'resetPack',
          args: [
            id
          ],
        } as unknown as WriteContractParameters)

        setPending(false);
        return { result: hash };
      } catch (error) {
        console.log(error.message);
        if (error.message !== "Confirmation declined by user") {
          toast.error(error.message);
        }
      } finally {
        setPending(false);
      }
    } else {
      toast.error("Wallet is not connected");
    }
  };

  const onPayFee = async () => {
    if (walletClient) {
      try {
        setPending(true);

        const resAllowance = await publicClient({chainId: 97}).readContract({
          abi: erc20Abi,
          address: USDT_ADDRESS,
          functionName: 'allowance',
          args: [
            walletClient.account.address,
            CRAZYTRON_ADDRESS
          ]
        })

        const nAllowance = new BigNumber(resAllowance.toString()).div(1e18);

        if (nAllowance.isLessThan(50)) {
          await walletClient.writeContract({
            abi: erc20Abi,
            address: USDT_ADDRESS,
            account: walletClient.account,
            functionName: 'approve',
            args: [
              CRAZYTRON_ADDRESS as Address,
              50000000000000000000n
            ],
          } as unknown as WriteContractParameters)
          await sleep(3000)
        }

        const hash = await walletClient.writeContract({
          abi: crazyTronABI,
          address: CRAZYTRON_ADDRESS,
          functionName: 'payNetwork'
        } as unknown as WriteContractParameters)

        setPending(false);
        return { result: hash };
      } catch (error) {
        console.log(error.message);
        if (error.message !== "Confirmation declined by user") {
          toast.error(error.message);
        }
      } finally {
        setPending(false);
      }
    } else {
      toast.error("Wallet is not connected");
    }
  };

  return {
    onBuyPack,
		onResetPack,
    onPayFee,
    pending,
  };
}
