import React, { useState, useEffect, createContext, FC } from "react";

import { connect, keyStores, Contract, WalletConnection } from "near-api-js";

const initialState: InitialState = {
  wallet: null,
  contract: null,
  currentAccount: {
    accountId: "",
    balance: "",
  },
  signIn: () => {},
  signOut: () => {},
  isSignedIn: false,
  // loadAccount: () => {},
};

// Hack with any type :) please don't use in prod.
interface ContractWithMint extends Contract {
  nft_mint?: any;
  nft_tokens_for_owner?: any;
}

type InitialState = {
  wallet: WalletConnection | null;
  contract: ContractWithMint | null;
  currentAccount?: any;
  signIn: any;
  signOut: any;
  isSignedIn: boolean;
};

export const WalletContext = createContext(initialState);

type Props = {
  config: any;
  children: JSX.Element;
};

const NearWalletProvider: FC<Props> = ({ config, children }) => {
  const [
    { wallet, currentAccount, contract, isSignedIn, signIn, signOut },
    setState,
  ] = useState(initialState);

  useEffect(() => {
    async function init() {
      const near = await connect({
        ...config,
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      });

      const wallet = new WalletConnection(near, "helloworld");

      let accountId = wallet.getAccountId();

      if (accountId) {
        const accountState = await wallet.account().state();

        // initial contract.
        const contract: Contract = await new Contract(
          wallet.account(),
          config.contractName,
          {
            viewMethods: ["nft_tokens_for_owner"],
            changeMethods: ["nft_mint"],
          }
        );

        setState({
          wallet,
          contract,
          currentAccount: {
            accountId,
            balance: accountState.amount,
          },
          signIn: () => {
            wallet.requestSignIn(config.contractName);
          },
          signOut: () => wallet.signOut(),
          isSignedIn: wallet.isSignedIn(),
        });
      } else {
        setState({
          ...initialState,
          signIn: () => {
            wallet.requestSignIn(config.contractName);
          },
        });
      }
    }

    init();
  }, [config]);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        contract,
        currentAccount,
        signIn,
        signOut,
        isSignedIn,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default NearWalletProvider;
