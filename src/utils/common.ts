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