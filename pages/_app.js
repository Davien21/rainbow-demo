import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, createClient, WagmiConfig } from "wagmi";

const { chains, provider } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    chain.polygonMumbai,
  ],
  [apiProvider.alchemy(process.env.ALCHEMY_ID), apiProvider.fallback()]
);

console.log(process.ALCHEMY_ID);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={midnightTheme()}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
