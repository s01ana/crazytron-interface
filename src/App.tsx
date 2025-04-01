import React, { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import { createAppKit } from '@reown/appkit/react'

import { WagmiProvider } from 'wagmi'
import { arbitrum, bscTestnet, mainnet } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

import { RefreshContextProvider } from "./contexts/RefreshContext";
import { useReferrerAtom } from "./utils/referral";
import { MASTER_ADDRESS, ZERO_ADDRESS } from "./config/constants";
import { useReferrer } from "./hooks/useReferrals";

// Lazy load components
const Home = React.lazy(() => import("./components/home"));
const InvalidPage = React.lazy(() => import("./components/invalid"));
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
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#EBBA07]" />
  </div>
);

const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="p-4 m-4 bg-red-50 text-red-600 rounded-lg">
    <h2 className="text-lg font-semibold">Something went wrong</h2>
    <p className="text-sm">{error.message}</p>
  </div>
);

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.reown.com
const projectId = '93f48d5647f269da06b4c2f798ada741'

// 2. Create a metadata object - optional
const metadata = {
  name: 'CrazyBSC',
  description: '',
  url: '', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// 3. Set the networks
const networks = [bscTestnet]

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: networks as any,
  projectId,
  allowUnsupportedChain: false,
  metadata,
  features: {
    analytics: false, // Optional - defaults to your Cloud configuration
    onramp: false,
    email: false,
    socials: false,
    emailShowWallets: false,
    swaps: false
  },
  themeMode: "dark",
  themeVariables: {
    '--w3m-color-mix': '#000000',
    '--w3m-color-mix-strength': 0,
    '--w3m-accent': '#EBBA07',
    '--w3m-border-radius-master': '1.5px'
  },
  chainImages: {
    97: "/56.png"
  }
})

function App() {
  const [referrer, setReferrer] = useReferrerAtom()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const ref = queryParams.get('ref')
  
  if (!!ref && ref !== referrer) {
    setReferrer()
  }

  const {referrer: ref_} = useReferrer(referrer)

  if (ref_ === ZERO_ADDRESS && referrer !== MASTER_ADDRESS)
    return <InvalidPage />

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <RefreshContextProvider>
          <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/packages" element={<PackagesPage />} />
                <Route path="/network" element={<NetworkPage />} />
                <Route path="/compensation" element={<CompensationPage />} />
                {/* <Route path="/settings" element={<SettingsPage />} /> */}
              </Routes>
            </QueryClientProvider>
          </WagmiProvider>
        </RefreshContextProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
