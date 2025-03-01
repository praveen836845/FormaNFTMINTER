import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider,  } from 'wagmi'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { defineChain } from "viem";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { sepolia } from 'viem/chains';


const queryClient = new QueryClient();
const crossfi = defineChain({
  id: 4157,
  name: "CrossFi Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "XFI",
    symbol: "XFI",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.ms"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://scan.testnet.ms" },
  },
  testnet: true,
});

export const config = getDefaultConfig({
  appName: "CrowdFunding",
  projectId: "7b5df1bf45a2dda047645331015f1cc1",
  chains: [sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider >
        <ConnectButton />
          <App/>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);

