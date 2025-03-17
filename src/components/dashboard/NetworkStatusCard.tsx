import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Network, Timer } from "lucide-react";
import { useUserInfo } from "@/hooks/useContract";
import { useNetworkProfit } from "@/hooks/useNetworkProfit";
import { MONTH } from "@/config/constants";

interface NetworkStatusCardProps {
  position?: string;
  timeUntilRenewal?: number; // in seconds
  isRenewalNeeded?: boolean;
  onRenew?: () => void;
}

const NetworkStatusCard = ({
  position = "Level 4",
  timeUntilRenewal = 432000, // 5 days in seconds
  isRenewalNeeded = false,
  onRenew = () => console.log("Renewal clicked"),
}: NetworkStatusCardProps) => {
  const { t, language } = useLanguage();

  const { userPacks, userLastPaymentTime } = useUserInfo()
  
  const {networkEarnings} = useNetworkProfit()

  let remainingDays = Math.floor((MONTH - Date.now()/1000 + userLastPaymentTime) / 60)
  
  remainingDays = remainingDays > 0 ? remainingDays : 0

  const userLevel = `Level ${userPacks.length > 0 ? userPacks.length * 2 + (3 - userPacks.length > 0 ? 3 - userPacks.length : 0) : 0}`

  // Convert seconds to days/hours for display
  const days = Math.floor(timeUntilRenewal / (24 * 60 * 60));
  const hours = Math.floor((timeUntilRenewal % (24 * 60 * 60)) / (60 * 60));

  return (
    <Card className="w-full h-[200px] bg-white border-[#FF0000]/20 shadow-lg hover:shadow-[#FF0000]/10 transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Network className="w-6 h-6 text-[#FF0000]" />
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
              <p className="text-[#FF0000] text-2xl font-bold mt-1">
                {language === "es"
                  ? userLevel.replace("Level", "Nivel")
                  : userLevel}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm">
                {t("dashboard.timeUntilRenewal")}
              </p>
              <div className="flex items-center gap-2 justify-end mt-1">
                <Timer className="w-5 h-5 text-[#FF0000]" />
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
              <span className="text-[#FF0000]">${networkEarnings}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#FF0000]" style={{ width: `${((remainingDays) / MONTH) * 100}%` }} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkStatusCard;
