import { expect } from "chai";
import { ethers } from "hardhat";
import {
  loadFixture,
  time,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Staking", function () {
  // Reusable deployment fixture to create a fresh contract instance for each test

  async function deployProjectSubmission() {
    const [deployer] = await ethers.getSigners();

    const contractFactory = await ethers.getContractFactory(
      "ProjectSubmission"
    );
    const contract = await contractFactory.deploy({ from: deployer });

    return { contract, deployer };
  }

  async function deployStakingContract() {
    const [deployer] = await ethers.getSigners();
    const contractFactory = await ethers.getContractFactory("Staking");

    const mockToken = await ethers.getContractFactory("MockERC20Token");
    const initialBalance = ethers.parseEther("1000"); // Initial balance of 1000 tokens
    const token = await mockToken.deploy(
      "Mock Token",
      "MOCK",
      deployer.address,
      initialBalance
    );

    expect(await token.balanceOf(deployer.address)).to.equal(initialBalance);

    const { contract: _contract, deployer: _deployer } = await loadFixture(
      deployProjectSubmission
    );

    const contract = await contractFactory.deploy(
      token.getAddress(),
      _contract.getAddress(),
      {
        from: deployer,
      }
    );
    return { contract, deployer, token };
  }

  describe("stakeOnProject", function () {
    it("should allow staking on a project", async function () {
      const { contract, deployer, token } = await loadFixture(deployStakingContract); // Replace with a real ERC-20 token address

      const projectId = 1;
      const stakeAmount = ethers.parseEther("100");

      const userWallet = ethers.Wallet.createRandom().connect(ethers.provider);

      // const mockToken = await ethers.getContractFactory("MockERC20Token");
      // const initialBalance = ethers.parseEther("1000"); // Initial balance of 1000 tokens
      // const token = await mockToken.deploy(
      //   "Mock Token",
      //   "MOCK",
      //   deployer.address,
      //   initialBalance
      // );

      deployer.sendTransaction({
        to: userWallet.address,
        value: ethers.parseEther("1"),
      });

      // Increase the balance of userWallet
      await token.transfer(
        userWallet.address,
        stakeAmount + ethers.parseEther("1")
      ); // Adding extra 1 ETH worth of tokens

      expect(await token.balanceOf(userWallet.address)).to.equal(
        stakeAmount + ethers.parseEther("1")
      );


      await token
        .connect(userWallet)
        .approve(contract.getAddress(), stakeAmount);


      expect(await token.allowance(userWallet.address, contract.getAddress())).to.equal(stakeAmount);

      await expect(
        contract.connect(userWallet).stakeOnProject(projectId, stakeAmount)
      )
        .to.emit(contract, "ProjectStaked")
        .withArgs(userWallet.address, projectId, stakeAmount);
    });

    // Add more tests for edge cases, insufficient allowance, etc.
  });
  // Add tests for other functions in the Staking contract (e.g., yield distribution)
});
