CONTRACT_ID := nft01.0xchai.testnet

build:
	cd contract && cargo build --target wasm32-unknown-unknown --release
deploy:
	near deploy --wasmFile contract/target/wasm32-unknown-unknown/release/nearspring_nft.wasm --accountId ${CONTRACT_ID}
dev-deploy:
	near dev-deploy --wasmFile contract/target/wasm32-unknown-unknown/release/nearspring_nft.wasm
test:
	cd contract && cargo test
nft-init:
	near call ${CONTRACT_ID} new_default_meta '{"owner_id": "${CONTRACT_ID}"}' --accountId ${CONTRACT_ID}
nft-mint:
	near call ${CONTRACT_ID} nft_mint '{"token_id": "0xchai.testnet-token", "token_owner_id": "0xchai.testnet"}' --accountId 0xchai.testnet --deposit 0.1
nft-mint2:
	near call ${CONTRACT_ID} nft_mint '{"token_id": "0xchai.testnet-token-2", "token_owner_id": "0xchai.testnet"}' --accountId 0xchai.testnet --deposit 0.1