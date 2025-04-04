import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Network, Timer } from "lucide-react";
import { MONTH } from "@/config/constants";
import BigNumber from "bignumber.js";

interface NetworkStatusCardProps {
  networkLevel: number;
  userLastPaymentTime: number; // in seconds
  totalNetworkPaid: number;
  onRenew?: () => void;
}

const NetworkStatusCard = ({
  networkLevel,
  userLastPaymentTime = 0,
  totalNetworkPaid = 0,
  onRenew = () => console.log("Renewal clicked"),
}: NetworkStatusCardProps) => {
  const { t, language } = useLanguage();

  let remainingDays = Math.floor((MONTH - Date.now()/1000 + userLastPaymentTime) / 60)
  
  remainingDays = remainingDays > 0 ? remainingDays : 0

  return (
    <Card className="w-full h-[200px] bg-white border-[#EBBA07]/20 shadow-lg hover:shadow-[#EBBA07]/10 transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Network className="w-6 h-6 text-[#EBBA07]" />
          {language === "es" ? "Red" : "Network"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">
                {t("dashboard.currentPosition")}
              </p>
              <p className="text-[#EBBA07] text-2xl font-bold mt-1">
                {language === "es" ? "Nivel" : "Level"} {networkLevel}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm">
                {t("dashboard.timeUntilRenewal")}
              </p>
              <div className="flex items-center gap-2 justify-end mt-1">
                <Timer className="w-5 h-5 text-[#EBBA07]" />
                <p className="text-xl font-semibold">
                  {remainingDays} minutes
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                {t("dashboard.networkIncome")}
              </span>
              <span className="text-[#EBBA07]">${new BigNumber(totalNetworkPaid).div(1e18).toNumber().toFixed(2)}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#EBBA07]" style={{ width: `${((MONTH/60 - remainingDays) / MONTH * 60) * 100}%` }} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkStatusCard;
