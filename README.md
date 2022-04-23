NEAR Spring Hackathong Week #2
---

DEMO - https://nearspring-challenge3-nft.vercel.app/

---

Challenge #3 - https://discord.com/channels/490367152054992913/963097203050709032/965635603188305920

> This is a 2-step challenge for minting your first NFT on NEAR and creating a frontend for it. It can be as simple or complex as you like! 
>
> Step 1. Deploy an NFT smart contract on the testnet. Mint an NFT.
>
> Step 2. Build a frontend to connect with the NFT smart contract you deployed (GitHub pages is the most simple option). The frontend should allow a user to log in with NEAR and mint an NFT to their own wallet.


---

## Usage

- **contract** - NFT Contract.
- **frontend** - Frontend code (mint NFTs)

### contract.

```
make build
```

Deploy a contract.

```
make deploy
```

Initial NFT default metadata

```
make nft-init
```

Mint with NEAR CLI

```
make nft-mint
```

### Frontend

```
cd frontend
```

Using `npm` or `yarn`

Start with dev server.

```
yarn dev
```

Start production server

```
yarn build
yarn start
```

## References

- [NFT SDK](https://github.com/near/near-sdk-rs)
- [NFT Zero to Hero](https://docs.near.org/docs/tutorials/contracts/nfts/introduction)
- [NEAR Example - NFT](https://github.com/near-examples/NFT)
