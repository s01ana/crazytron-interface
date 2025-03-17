// @ts-ignore
import { TronWeb } from 'tronweb';
export const tronWeb: any = new TronWeb({
    fullHost: 'https://nile.trongrid.io/',
    // fullHost: 'https://api.trongrid.io',
    // headers: {"TRON-PRO-API-KEY": "927708a2-ad37-4fd3-9a54-356bc8083e07"}
});

if (typeof window !== 'undefined') {
    (window as any).tronWeb1 = tronWeb;
}