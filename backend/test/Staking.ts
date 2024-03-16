import { expect } from "chai";
import { ethers } from "hardhat";
import {
  loadFixture,
  time,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Staking", function () {
  // Reusable deployment fixture to create a fresh contract instance for each test
  async function deployStakingContract() {
    const [deployer] = await ethers.getSigners();
    const contractFactory = await ethers.getContractFactory("Staking");

    const testTokenAddress = "0x0000000000000000000000000000000000000000"; // Replace with any address

    const contract = await contractFactory.deploy(testTokenAddress, {
      from: deployer,
    });
    return { contract, deployer };
  }

  describe("stakeOnProject", function () {
    it("should allow staking on a project", async function () {
      const { contract, deployer } = await loadFixture(
        deployStakingContract
        // "0x4D6DEEE55785f033d00005Ade08D035B1537A5d9" <- eth faucet address
      ); // Replace with a real ERC-20 token address

      const projectId = 1;
      const stakeAmount = 100;

      // await expect(contract.stakeOnProject(projectId, stakeAmount))
      //   .to.emit(contract, "ProjectStaked")
      //   .withArgs(deployer, projectId, stakeAmount);

      // const userStakes = await contract.userStakes(deployer);
      
      // expect(userStakes[projectId]).to.equal(stakeAmount);

      // const contractBalance = await contract.stakingToken.balanceOf(
      //   contract.address
      // );
      // expect(contractBalance).to.equal(stakeAmount);
    });

    it("should revert if the stake amount is zero", async function () {
      const { contract } = await loadFixture(deployStakingContract);

      const projectId = 1;
      const zeroStakeAmount = 0;

      await expect(
        contract.stakeOnProject(projectId, zeroStakeAmount)
      ).to.be.revertedWith("Stake amount cannot be zero");
    });

    // Add more tests for edge cases, insufficient allowance, etc.
  });

  // Add tests for other functions in the Staking contract (e.g., yield distribution)
});
