import { useBalances, useUserInfo } from "@/hooks/useContract";
import { useContractEvents } from "@/hooks/useContractEvents";
import React from "react";

// Lazy load main components
const DashboardGrid = React.lazy(() => import("./dashboard/DashboardGrid"));
const Header = React.lazy(() => import("./dashboard/Header"));

interface HomeProps {
  isLoading?: boolean;
}

const Home = React.memo(({ isLoading = false }: HomeProps) => {
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
      <Header />
      <main className="pt-16">
        <DashboardGrid
          packages={mockData.packages}
          networkStatus={mockData.networkStatus}
          stats={mockData.stats}
          onPackageSelect={handlePackageSelect}
          onRenewNetwork={handleNetworkRenewal}
        />
      </main>
    </div>
  );
});

Home.displayName = "Home";

export default Home;
