import { useEffect, useState } from "react";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { tronWeb } from "@/tronweb";
import { USDT_ADDRESS, CRAZYTRON_ADDRESS } from "../config/constants";
import useRefresh from "./useRefresh";
import crazyAbi from "../abi/crazytron.json";
import trc20Abi from "../abi/trc20.json";
import BigNumber from "bignumber.js";
import { convertToRealNumber } from "../utils/common";
import toast, { Toaster } from "react-hot-toast";
import { useReferrerAtom } from "@/utils/referral";

export function useBalances() {
  const { address } = useWallet();

  const [tronBalance, setTronBalance] = useState(0);
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [allowance, setAllowance] = useState(0);

  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const fetchBalanceInfo = async () => {
      try {
        const balanceInSun = await tronWeb.trx.getBalance(address);
        const balanceInTrx = tronWeb.fromSun(balanceInSun);

        setTronBalance(balanceInTrx);

        const tokenContract = await tronWeb.contract(trc20Abi, USDT_ADDRESS);

        const resBalance = await tokenContract
          .balanceOf(address)
          .call({ from: address });

        const resAllowance = await tokenContract
          .allowance(address, CRAZYTRON_ADDRESS)
          .call({ from: address });

        const nBalance = convertToRealNumber(resBalance, 6);
        const nAllowance = convertToRealNumber(resAllowance, 6);

        setUsdtBalance(nBalance.toNumber());
        setAllowance(nAllowance.toNumber());
      } catch (error) {
        // console.log('debug fetch balance error::', error)
      }
    };

    if (address) {
      fetchBalanceInfo();
    }
  }, [fastRefresh, address]);

  return { tronBalance, usdtBalance, allowance };
}

export function useManage() {
  const { address, signTransaction } = useWallet();
  const [pending, setPending] = useState(false);
  const [referrer] = useReferrerAtom();

  const onBuyPack = async (level: number, amount: number) => {
    if (address && tronWeb) {
      try {
        setPending(true);

        const options = {
          feeLimit: 500000000,
          callValue: 0,
          shouldPollResponse: true,
          from: address,
        };

        const tokenContract = await tronWeb.contract(trc20Abi, USDT_ADDRESS);

        const resAllowance = await tokenContract
          .allowance(address, CRAZYTRON_ADDRESS)
          .call({ from: address });

        const nAllowance = convertToRealNumber(resAllowance, 6);

        if (nAllowance.isLessThan(amount)) {
          const params1 = [
            { type: "address", value: CRAZYTRON_ADDRESS },
            { type: "uint256", value: 50000000 },
          ];

          const { transaction: tx1 } =
            await tronWeb.transactionBuilder.triggerSmartContract(
              USDT_ADDRESS,
              "approve(address,uint256)",
              options,
              params1,
              address
            );

          const signedTx1 = await signTransaction(tx1);

          await tronWeb.trx.sendRawTransaction(signedTx1);
        }

        const params2 = [
          { type: "uint8", value: level },
          { type: "address", value: referrer },
        ];

        const { transaction: tx2 } =
          await tronWeb.transactionBuilder.triggerSmartContract(
            CRAZYTRON_ADDRESS,
            "buyPack(uint8,address)",
            options,
            params2,
            address
          );

        const signedTx2 = await signTransaction(tx2);

        const response = await tronWeb.trx.sendRawTransaction(signedTx2);

        setPending(false);
        return { result: response.result, tx: response.txid };
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

	const onResetPack = async (level: number, amount: number) => {
    if (address && tronWeb) {
      try {
        setPending(true);

        const options = {
          feeLimit: 500000000,
          callValue: 0,
          shouldPollResponse: true,
          from: address,
        };

        const tokenContract = await tronWeb.contract(trc20Abi, USDT_ADDRESS);

        const resAllowance = await tokenContract
          .allowance(address, CRAZYTRON_ADDRESS)
          .call({ from: address });

        const nAllowance = convertToRealNumber(resAllowance, 6);

        if (nAllowance.isLessThan(amount)) {
          const params1 = [
            { type: "address", value: CRAZYTRON_ADDRESS },
            { type: "uint256", value: 50000000 },
          ];

          const { transaction: tx1 } =
            await tronWeb.transactionBuilder.triggerSmartContract(
              USDT_ADDRESS,
              "approve(address,uint256)",
              options,
              params1,
              address
            );

          const signedTx1 = await signTransaction(tx1);

          await tronWeb.trx.sendRawTransaction(signedTx1);
        }

        const params2 = [
          { type: "uint8", value: level }
        ];

        const { transaction: tx2 } =
          await tronWeb.transactionBuilder.triggerSmartContract(
            CRAZYTRON_ADDRESS,
            "resetPack(uint8)",
            options,
            params2,
            address
          );

        const signedTx2 = await signTransaction(tx2);

        const response = await tronWeb.trx.sendRawTransaction(signedTx2);

        setPending(false);
        return { result: response.result, tx: response.txid };
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
    if (address && tronWeb) {
      try {
        setPending(true);

        const options = {
          feeLimit: 500000000,
          callValue: 0,
          shouldPollResponse: true,
          from: address,
        };

        const tokenContract = await tronWeb.contract(trc20Abi, USDT_ADDRESS);

        const resAllowance = await tokenContract
          .allowance(address, CRAZYTRON_ADDRESS)
          .call({ from: address });

        const nAllowance = convertToRealNumber(resAllowance, 6);

        if (nAllowance.isLessThan(50)) {
          const params1 = [
            { type: "address", value: CRAZYTRON_ADDRESS },
            { type: "uint256", value: 50000000 },
          ];

          const { transaction: tx1 } =
            await tronWeb.transactionBuilder.triggerSmartContract(
              USDT_ADDRESS,
              "approve(address,uint256)",
              options,
              params1,
              address
            );

          const signedTx1 = await signTransaction(tx1);

          await tronWeb.trx.sendRawTransaction(signedTx1);
        }

        const { result, transaction: tx2 } =
          await tronWeb.transactionBuilder.triggerSmartContract(
            CRAZYTRON_ADDRESS,
            "payNetwork()",
            options,
            [],
            address
          );

        const signedTx2 = await signTransaction(tx2);

        const response = await tronWeb.trx.sendRawTransaction(signedTx2);

        setPending(false);
        return { result: response.result, tx: response.txid };
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
