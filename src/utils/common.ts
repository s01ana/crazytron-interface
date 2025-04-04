import BigNumber from "bignumber.js"
import { bscTestnet } from "viem/chains"
import { createConfig, http } from "wagmi"

export const isClient = () => typeof window !== 'undefined'

export const convertToRealNumber = (number: string | number | BigNumber, decimals: string | number | any) => {
    if (typeof number == "object") return new BigNumber(number.toString()).dividedBy(new BigNumber(10).pow(decimals))
    return new BigNumber(number).dividedBy(new BigNumber(10).pow(decimals))
}

export const addressElipse = (address: string | undefined) => {
    if (!address)
        return ''
    return address.slice(0, 4).concat('...').concat(address.slice(address.length - 4, address.length))
}

export const config = createConfig({
    chains: [bscTestnet],
    transports: {
      [bscTestnet.id]: http(),
    },
  })

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function formatNumber(n) {
    if (n < 1000) return n.toString();
    if (n < 1_000_000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    if (n < 1_000_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n < 1_000_000_000_000) return (n / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    return (n / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'T';
}