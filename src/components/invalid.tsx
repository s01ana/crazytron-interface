import { useBalances } from "@/hooks/useContract";
import { useContractEvents } from "@/hooks/useContractEvents";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Lazy load main components
const DashboardGrid = React.lazy(() => import("./dashboard/DashboardGrid"));
const Header = React.lazy(() => import("./dashboard/Header"));

interface HomeProps {
  isLoading?: boolean;
}

const Home = React.memo(({ isLoading = false }: HomeProps) => {
  const { t } = useLanguage();
  const { tronBalance, usdtBalance, allowance } = useBalances()
  // Memoize mock data to prevent unnecessary re-renders
  const mockData = React.useMemo(
    () => ({
      packages: [
        {
          id: "1",
          amount: 100,
          weeklyYield: 5,
          nextPayout: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          progress: 57,
        },
        {
          id: "2",
          amount: 500,
          weeklyYield: 25,
          nextPayout: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          progress: 28,
        },
      ],
      networkStatus: {
        position: "Level 4",
        timeUntilRenewal: 432000,
        isRenewalNeeded: false,
      },
      stats: {
        totalEarnings: 2500,
        activeReferrals: 1000,
        networkLevel: 4,
      },
    }),
    [],
  );

  // Memoize handlers
  const handlePackageSelect = React.useCallback((amount: number) => {
    console.log("Selected package amount:", amount);
  }, []);

  const handleNetworkRenewal = React.useCallback(() => {
    console.log("Network renewal requested");
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* <Header /> */}
      <main className="pt-16">
        <Card className="w-full bg-white shadow-lg hover:shadow-[#FF0000]/10 transition-all duration-300 border-[#FF0000]/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">
            Invalid Referral
          </CardTitle>
        </CardHeader>
        <CardContent>
        </CardContent>
        </Card>
      </main>
    </div>
  );
});

Home.displayName = "Home";

export default Home;
