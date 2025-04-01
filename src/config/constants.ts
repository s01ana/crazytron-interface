import { Chain, zeroAddress } from "viem"
import { bscTestnet } from "viem/chains"

export const USDT_ADDRESS = "0xc5557CB7761186937E7Cc3d0D492d8399476f662"
export const CRAZYTRON_ADDRESS = "0xfe4FceC0E7E8D11e9EBF68761D643B02206B500c"
export const ZERO_ADDRESS = zeroAddress
export const MASTER_ADDRESS = "0x32b63337baac9144a55a9fFe4d052C4fe4746955"

export const WEEK = 60*7 // 60*60*24*7
export const MONTH = 60*30 //60*60*24*30

export const TRONSCAN_URL = 'https://testnet.bscscan.com/'
export const MAIN_URL = "https://crazytron-interface.vercel.app/"

export const BACKEND_URL = 'https://crazy.isg.fi/'

export const INITIAL_AMOUNTS = [50e18, 100e18, 200e18, 500e18, 1000e18];

export const PUBLIC_NODES: Record<number, string[] | readonly string[]> = {
  97: [
    ...bscTestnet.rpcUrls.default.http,
  ],
}

export enum ChainId {
  MAINNET = 97,
}

export const CHAINS: [Chain, ...Chain[]] = [
  bscTestnet,
  // bitfinity_testnet
]