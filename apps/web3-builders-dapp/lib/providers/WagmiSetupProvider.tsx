'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider  } from "connectkit";
import { WagmiProvider } from 'wagmi'
import { config } from '../config';

const queryClient = new QueryClient()

export default function WagmiSetupProvider({children}: {children: React.ReactNode}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}