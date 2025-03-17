import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Package, History } from "lucide-react";
import { useNetworkProfit } from "@/hooks/useNetworkProfit";
import { useUserInfo } from "@/hooks/useContract";
import { MONTH } from "@/config/constants";

interface Transaction {
  hash: string;
  type: "buy" | "payout" | "renewal";
  amount: number;
  timestamp: Date;
  status: "confirmed" | "pending";
}

const mockTransactions: Transaction[] = [
  {
    hash: "TRXa7c8...3f9d",
    type: "payout",
    amount: 25.5,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: "confirmed",
  },
  {
    hash: "TRX9b2d...1e4c",
    type: "buy",
    amount: 100,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    status: "confirmed",
  },
  {
    hash: "TRX1f3e...8a2b",
    type: "renewal",
    amount: 50,
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    status: "confirmed",
  },
  {
    hash: "TRX4d5c...7b9a",
    type: "payout",
    amount: 75.25,
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    status: "confirmed",
  },
];

interface PackageInfo {
  id: string;
  amount: number;
  levels: number;
  isActive?: boolean;
  totalEarned?: number;
  timesActivated?: number;
}

const allPackages: PackageInfo[] = [
  {
    id: "1",
    amount: 50,
    levels: 4,
    totalEarned: 75,
    isActive: true,
    timesActivated: 1,
  },
  {
    id: "2",
    amount: 100,
    levels: 5,
    totalEarned: 150,
    isActive: true,
    timesActivated: 1,
  },
  { id: "3", amount: 200, levels: 6, totalEarned: 0 },
  { id: "4", amount: 500, levels: 8, totalEarned: 0 },
  { id: "5", amount: 1000, levels: 10, totalEarned: 0 },
];

const PackagesCard = () => {
  const { t } = useLanguage();
  const { userPacks, userLastPaymentTime } = useUserInfo()

  const {networkEarnings} = useNetworkProfit()
  
  const userLevels = userPacks.map((p) => p.level)
  const totalProfit = userPacks.reduce((a, b) => a + b.amount * 3, 0)
  const paidProfit = userPacks.reduce((a, b) => a + b.totalPaid, 0)

  let remainingDays = Math.floor((MONTH - Date.now()/1000 + userLastPaymentTime) / 60)

  remainingDays = remainingDays > 0 ? remainingDays : 0

  return (
    <Card className="w-full bg-white border-[#FF0000]/20 shadow-lg hover:shadow-[#FF0000]/10 transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Package className="w-6 h-6 text-[#FF0000]" />
          {t("dashboard.investmentPackages")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                {t("dashboard.passiveUnrealizedProfits")}
              </span>
              <span className="text-[#FF0000]">${paidProfit / 1e6} / ${totalProfit / 1e6}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#FF0000]" style={{ width: `${paidProfit/totalProfit*100}%` }} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">
                  {t("dashboard.networkIncomeRenewal")}
                </span>
                <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                  {remainingDays} {t("dashboard.daysLeftShort").replace("days", 'minutes').replace("días", "minutos")}
                </span>
              </div>
              <span className="text-[#FF0000]">${networkEarnings}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#FF0000]" style={{ width: `${((remainingDays) / MONTH) * 100}%` }} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-3">
          {allPackages.map((pkg, i) => {
            const maxEarnings = pkg.amount * 3; // 300% max return
            const progress = (pkg.totalEarned / maxEarnings) * 100;

            return (
              <div
                key={pkg.id}
                className={`relative p-4 rounded-lg ${userLevels.includes(i) ? "border border-[#FF0000] bg-[#FF0000]/5" : "border border-gray-200"}`}
              >
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xl font-bold">{pkg.amount} USDT</div>
                      <div className="text-sm text-gray-500">
                        {pkg.levels}{" "}
                        {t("dashboard.packageFeatures.networkLevels")}
                      </div>
                    </div>
                    {userLevels.includes(i) && (
                      <div className="bg-[#FF0000] rounded-full p-1 w-5 h-5 flex items-center justify-center">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                            fill="white"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        {t("dashboard.progressTo300")}
                      </span>
                      <span className="text-[#FF0000]">
                        {Math.round((userPacks[i]?.totalPaid ?? 0) * 100 / (3 * pkg.amount * 1e6))}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FF0000]"
                        style={{ width: `${Math.round((userPacks[i]?.totalPaid ?? 0) * 100 / (3 * pkg.amount * 1e6))}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500">
                      ${Math.round((userPacks[i]?.totalPaid ?? 0) * 100 / 1e6)} / ${maxEarnings} USDT
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PackagesCard;
