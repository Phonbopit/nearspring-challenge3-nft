import { useState, useContext } from "react";
import { utils } from "near-api-js";

import type { NextPage } from "next";
import Head from "next/head";

import { WalletContext } from "../components/NearWalletProvider";
import Footer from "../components/Footer";

const ATTACHED_GAS = 300000000000000;
const ONE_NEAR = utils.format.parseNearAmount("1");

const Home: NextPage = () => {
  const { currentAccount, contract, signIn } = useContext(WalletContext);

  const accountId = currentAccount?.accountId;

  const connectWallet = () => {
    signIn();
  };
  const mintNFT = async () => {
    try {
      const args = {
        token_id: `${accountId}-chainft-token`,
        token_owner_id: accountId,
      };
      const res = await contract?.nft_mint?.(args, ATTACHED_GAS, ONE_NEAR);
      console.log("res", res);
    } catch (error) {
      console.error("Unable to mint", error);
    }
  };

  return (
    <div className="container is-max-desktop mt-4">
      <Head>
        <title>NEARSpring Hackathon - Submission Week #2</title>
        <meta
          name="description"
          content="NEARSpring Hackathon - Submission Week #2"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <section className="section hero mt-4">
          <h1 className="mt-4 title is-size-1 has-text-centered is-uppercase has-text-weight-bold">
            NFT on NEAR
          </h1>

          <p className="is-size-4">
            Hello! We are going to mint an NFT and have it appear in your
            wallet!
            <strong>Sign in</strong>, mint your nft and head over to{" "}
            <a
              href="https://wallet.testnet.near.org"
              target="_blank"
              rel="noreferrer noopener"
            >
              {`wallet.testnet.near.org`}
            </a>{" "}
            to see your new{" "}
            <span className="is-underlined">{`"CHAINFT"!`}</span>
          </p>
        </section>

        <section className="section is-flex is-justify-content-center">
          <button
            className="button is-dark is-large mr-4"
            onClick={connectWallet}
            disabled={!!accountId}
          >
            Connect Wallet
          </button>

          <button
            className="ml-4 button is-primary is-large"
            onClick={mintNFT}
            disabled={!accountId}
          >
            Mint NFT
          </button>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Home;
