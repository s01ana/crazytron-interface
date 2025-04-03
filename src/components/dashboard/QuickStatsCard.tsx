import React, { useEffect, useState } from "react";
import BigNumber from "bignumber.js"
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ArrowUpRight,
  Users,
  Wallet,
  PiggyBank,
  Calculator,
} from "lucide-react";
import { useNetworks } from "@/hooks/useNetworks";
import { useAccount } from "wagmi";
import { INITIAL_AMOUNTS } from "@/config/constants";

interface QuickStatsCardProps {
  totalEarnings?: number;
  activeReferrals?: number;
}

const QuickStatsCard = ({packs}: {packs: any}) => {
  const { t } = useLanguage();

  const {address} = useAccount()

  const { data } = useNetworks(address)

  const totalProfit = packs?.reduce((a, b) => a + INITIAL_AMOUNTS[b.level] * 3 / 1e18, 0);
  const paidProfit = packs?.reduce((a, b) => a + new BigNumber(b.totalPaid).div(1e18).toNumber(), 0);
  const averageProfitByHour = (totalProfit ?? 0) / 140 / 60 / 3

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (data) {
      setCount(new BigNumber(data?.totalPackPaid ?? 0).plus(data?.totalNetworkPaid ?? 0).div(1e18).toNumber())
    }
    const interval = setInterval(() => {
        setCount(prevCount => prevCount + averageProfitByHour);
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [averageProfitByHour]);


  return (
    <Card className="w-full bg-white shadow-lg hover:shadow-[#EBBA07]/10 transition-all duration-300 border-[#EBBA07]/20">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">
          {t("dashboard.quickStats")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-gray-50 border border-[#EBBA07]/20 hover:bg-gray-100 transition-colors">
            <div className="p-3 rounded-full bg-[#EBBA07]/10">
              <Wallet className="h-6 w-6 text-[#EBBA07]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {/* {new BigNumber(data?.totalPackPaid ?? 0).plus(data?.totalNetworkPaid ?? 0).div(1e18).toFixed()} USDT */}
                {count.toLocaleString()} USDT
              </p>
              <p className="text-sm text-gray-500">
                {t("dashboard.totalEarnings")}
              </p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-[#EBBA07] ml-auto shrink-0" />
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-lg bg-gray-50 border border-[#EBBA07]/20 hover:bg-gray-100 transition-colors">
            <div className="p-3 rounded-full bg-[#EBBA07]/10">
              <PiggyBank className="h-6 w-6 text-[#EBBA07]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{(data?.totalNetworkPaid ?? 0) / 1e18} USDT</p>
              <p className="text-sm text-gray-500">
                {t("dashboard.totalPassiveIncome")}
              </p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-[#EBBA07] ml-auto shrink-0" />
          </div>

          {/* <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 border border-[#EBBA07]/20 hover:bg-gray-100 transition-colors">
            <div className="p-3 rounded-full bg-[#EBBA07]/10">
              <Calculator className="h-6 w-6 text-[#EBBA07]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">1 USDT</p>
              <p className="text-sm text-gray-500">
                {t("dashboard.estimatedDistribution")}
              </p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-[#EBBA07] ml-auto shrink-0" />
          </div> */}

          <div className="flex items-center space-x-3 p-4 rounded-lg bg-gray-50 border border-[#EBBA07]/20 hover:bg-gray-100 transition-colors">
            <div className="p-3 rounded-full bg-[#EBBA07]/10">
              <Users className="h-6 w-6 text-[#EBBA07]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {data?.networkSize ?? 0}
              </p>
              <p className="text-sm text-gray-500">
                {t("dashboard.activeReferrals")}
              </p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-[#EBBA07] ml-auto shrink-0" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickStatsCard;
