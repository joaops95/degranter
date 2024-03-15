# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```


# Project Submission Contract:

Allows wallets to submit project details (name, description, etc.).

Tracks submitted projects and their creators.

Staking Contract:



# Enables investors to stake a specific amount of tokens (ERC-20) on a chosen project.

Tracks the total amount staked for each project.

Holds the staked tokens securely.

NFT Reward Contract:



# Mints unique NFTs for investors upon staking on a project.

Links each NFT to the specific project and investor.

(Optional) Defines any utility associated with the NFT (voting rights, access to project updates, etc.).

