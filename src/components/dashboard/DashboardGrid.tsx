import { useNetworks } from "@/hooks/useNetworks";
import { useUser } from "@/hooks/useUser";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAccount } from "wagmi";

// Lazy load components
const PackagesCard = React.lazy(() => import("./PackagesCard"));
const NetworkStatusCard = React.lazy(() => import("./NetworkStatusCard"));
const QuickStatsCard = React.lazy(() => import("./QuickStatsCard"));
const BuyPackageSection = React.lazy(() => import("./BuyPackageSection"));
const AffiliateLink = React.lazy(() => import("./AffiliateLink"));
const SmartContractActivity = React.lazy(
  () => import("./SmartContractActivity"),
);
const EarningsCalculator = React.lazy(() => import("./EarningsCalculator"));
const PayoutHistory = React.lazy(() => import("./PayoutHistory"));

interface DashboardGridProps {
  packages?: Array<{
    id: string;
    amount: number;
    weeklyYield: number;
    nextPayout: Date;
    progress: number;
  }>;
  networkStatus?: {
    position: string;
    timeUntilRenewal: number;
    isRenewalNeeded: boolean;
  };
  stats?: {
    totalEarnings: number;
    activeReferrals: number;
    networkLevel: number;
  };
  onPackageSelect?: (amount: number) => void;
  onRenewNetwork?: () => void;
}

const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="p-4 bg-red-50 text-red-600 rounded-lg">
    <h2 className="text-lg font-semibold">Something went wrong</h2>
    <p className="text-sm">{error.message}</p>
  </div>
);

const LoadingFallback = () => (
  <div className="w-full h-32 animate-pulse bg-gray-200 rounded-lg" />
);

const DashboardGrid = React.memo(
  ({
    packages,
    networkStatus,
    stats,
    onPackageSelect = () => {},
    onRenewNetwork = () => {},
  }: DashboardGridProps) => {
    const {address} = useAccount()
    const {data} = useUser(address)
    const { data: userPaidData } = useNetworks(address)
    return (
      <div className="w-full min-h-screen p-2 sm:p-4 md:p-6">
        <div className="w-full max-w-[1312px] mx-auto space-y-4 md:space-y-6">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingFallback />}>
              <QuickStatsCard 
                packs={data?.packs}
                data={userPaidData}
              />
            </Suspense>
          </ErrorBoundary>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
            <div className="lg:col-span-2">
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<LoadingFallback />}>
                  <PackagesCard
                    lastPaymentTime={data?.lastPaymentTime}
                    packs={data?.packs}
                    data={userPaidData}
                  />
                </Suspense>
              </ErrorBoundary>
            </div>

            <div className="space-y-6 lg:col-span-1">
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<LoadingFallback />}>
                  <NetworkStatusCard
                    networkLevel={data?.networkLevel}
                    userLastPaymentTime={data?.lastPaymentTime}
                    totalNetworkPaid={data?.totalNetworkPaid}
                    onRenew={onRenewNetwork}
                  />
                </Suspense>
              </ErrorBoundary>

              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<LoadingFallback />}>
                  <AffiliateLink />
                </Suspense>
              </ErrorBoundary>

              {/* {!(data?.packs || data?.packs?.length || data?.packs?.length > 0) && (
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Suspense fallback={<LoadingFallback />}>
                    <BuyPackageSection onPackageSelect={onPackageSelect} />
                  </Suspense>
                </ErrorBoundary>
              )} */}
            </div>
          </div>

          <div className="space-y-6">
            {/* <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<LoadingFallback />}>
                <SmartContractActivity />
              </Suspense>
            </ErrorBoundary> */}


            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<LoadingFallback />}>
                <PayoutHistory />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<LoadingFallback />}>
                <EarningsCalculator />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    );
  },
);

DashboardGrid.displayName = "DashboardGrid";

export default DashboardGrid;
