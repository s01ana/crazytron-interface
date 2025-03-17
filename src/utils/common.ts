import BigNumber from "bignumber.js"

export const isClient = () => typeof window !== 'undefined'

export const convertToRealNumber = (number: string | number | BigNumber, decimals: string | number | any) => {
    if (typeof number == "object") return new BigNumber(number.toString()).dividedBy(new BigNumber(10).pow(decimals))
    return new BigNumber(number).dividedBy(new BigNumber(10).pow(decimals))
}