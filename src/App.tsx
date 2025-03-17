import React, { Suspense, useEffect } from "react";
import { useRoutes, Routes, Route, useParams, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import "@tronweb3/tronwallet-adapter-react-ui/style.css";
import TronWalletProvider from "./TronWalletProvider";
import { RefreshContextProvider } from "./contexts/RefreshContext";
import { useReferrerAtom } from "./utils/referral";

// Lazy load components
const Home = React.lazy(() => import("./components/home"));
const PackagesPage = React.lazy(
  () => import("./components/packages/PackagesPage"),
);
const NetworkPage = React.lazy(
  () => import("./components/network/NetworkPage"),
);
const CompensationPage = React.lazy(
  () => import("./components/compensation/CompensationPage"),
);
const SettingsPage = React.lazy(
  () => import("./components/settings/SettingsPage"),
);

const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FF0000]" />
  </div>
);

const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="p-4 m-4 bg-red-50 text-red-600 rounded-lg">
    <h2 className="text-lg font-semibold">Something went wrong</h2>
    <p className="text-sm">{error.message}</p>
  </div>
);

function App() {
  const [referrer, setReferrer] = useReferrerAtom()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const ref = queryParams.get('ref')
  
  if (!!ref && ref !== referrer) {
    setReferrer()
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <RefreshContextProvider>
          <TronWalletProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/packages" element={<PackagesPage />} />
              {/* <Route path="/network" element={<NetworkPage />} /> */}
              <Route path="/compensation" element={<CompensationPage />} />
              {/* <Route path="/settings" element={<SettingsPage />} /> */}
            </Routes>
          </TronWalletProvider>
        </RefreshContextProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
