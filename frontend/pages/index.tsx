import { useState, useContext, useEffect } from "react";

import Head from "next/head";

import type { NextPage } from "next";
import { useRouter } from "next/router";
import { utils } from "near-api-js";

import { WalletContext } from "../components/NearWalletProvider";
import Footer from "../components/Footer";

const ATTACHED_GAS = 300000000000000;
const ONE_NEAR = utils.format.parseNearAmount("1");

const Home: NextPage = () => {
  const [tokens, setTokens] = useState([]);
  const router = useRouter();

  const { currentAccount, contract, signIn, signOut } =
    useContext(WalletContext);

  const accountId = currentAccount?.accountId;

  const connectWallet = () => {
    signIn();
  };

  const handleSignOut = () => {
    signOut();
    router.push(router.basePath);
  };

  const getTokensForOnwers = async () => {
    try {
      const tokens = await contract?.nft_tokens_for_owner?.({
        account_id: accountId,
      });
      setTokens(tokens);
    } catch (error) {
      console.error("Unable to view nft_tokens_for_owners()", error);
    }
  };

  const mintNFT = async () => {
    try {
      const randomId = new Date().getTime();

      // No limited per account, you can mint as you need.
      const args = {
        token_id: `${accountId}-${randomId}`,
        token_owner_id: accountId,
      };

      await contract?.nft_mint?.(args, ATTACHED_GAS, ONE_NEAR);
      router.push(router.basePath);
    } catch (error) {
      console.error("Unable to mint", error);
    }
  };

  useEffect(() => {
    getTokensForOnwers();
  }, [accountId]);

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
            NEAR SPRING #3
          </h1>

          <p className="is-size-4">
            Hello! We are going to mint an NFT and have it appear in your
            wallet!
          </p>
          <p className="is-size-4 mt-2">
            <strong>Sign in</strong>, <mark>mint your nft</mark> and head over
            to{" "}
            <a
              href="https://wallet.testnet.near.org"
              target="_blank"
              rel="noreferrer noopener"
              className="is-underlined"
            >
              {`wallet.testnet.near.org`}
            </a>{" "}
            to see your new <span className="is-underlined">{`"NFT"!`}</span>{" "}
            (Unlimited)
          </p>
        </section>

        <section className="section is-flex is-justify-content-center">
          {!!accountId ? (
            <button
              className="button is-danger is-large mr-4"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          ) : (
            <button
              className="button is-dark is-large mr-4"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          )}

          <button
            className="ml-4 button is-primary is-large"
            onClick={mintNFT}
            disabled={!accountId}
          >
            Mint NFT
          </button>
        </section>

        <section className="section tokens">
          <h2 className="is-size-4">Your collectibles</h2>

          <div className="columns is-multiline is-mobile">
            {tokens ? (
              tokens?.map((token: any) => {
                return (
                  <div className="column is-one-third" key={token.token_id}>
                    <div className="box">
                      <figure className="image mb-2">
                        <img src={token.metadata.media} alt={token.token_id} />
                      </figure>

                      <p>{token.metadata.title}</p>
                      <p className="is-size-7">{token.token_id}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="mt-4 ml-4 has-text-grey-light">
                Please mint your nft to see them here :)
              </p>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Home;
