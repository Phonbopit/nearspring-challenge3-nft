import "../styles/globals.css";
import type { AppProps } from "next/app";
import NearWalletProvider from "../components/NearWalletProvider";

// Testnet only
const config = {
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  contractName: "nft01.0xchai.testnet",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NearWalletProvider config={config}>
      <Component {...pageProps} />
    </NearWalletProvider>
  );
}

export default MyApp;
