import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture, time } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("ProjectSubmission", function () {
  // Reusable deployment fixture to create a fresh contract instance for each test
  async function deployProjectSubmission() {
    const [deployer] = await ethers.getSigners();
    
    const contractFactory = await ethers.getContractFactory("ProjectSubmission");
    const contract = await contractFactory.deploy({ from: deployer });

    return { contract, deployer };
  }

  describe("submitProject", function () {
    it("should allow project submission with valid details", async function () {
      const { contract } = await loadFixture(deployProjectSubmission);

      const projectName = "My Awesome Project";
      const projectDescription = "A revolutionary new idea!";
      const monthlyYield = 100;
      const grantTotal = 1000;
      const period = 12;

      await expect(contract.submitProject(projectName, projectDescription, monthlyYield, grantTotal, period))
        .to.emit(contract, "ProjectSubmitted")
        // .withArgs(projectName, projectDescription, await contract.owner(), monthlyYield, grantTotal, period);

      const projects = await contract.getProjects();
      expect(projects.length).to.equal(1);
      expect(projects[0].name).to.equal(projectName);
      expect(projects[0].description).to.equal(projectDescription);
      expect(projects[0].creator).to.equal(await contract.owner()); // Assert creator address
      expect(projects[0].monthlyYield).to.equal(monthlyYield);
      expect(projects[0].grantTotal).to.equal(grantTotal);
      expect(projects[0].period).to.equal(period);
    });
  });

  describe("getProjects", function () {
    it("should return an empty array when no projects have been submitted", async function () {
      const { contract } = await loadFixture(deployProjectSubmission);

      const projects = await contract.getProjects();
      expect(projects.length).to.equal(0);
    });

    it("should return the submitted projects", async function () {
      const { contract } = await loadFixture(deployProjectSubmission);
      
      const monthlyYield = 100;
      const grantTotal = 1000;
      const period = 12;
      const projectName1 = "Project 1";
      const projectDescription1 = "Description 1";

      const projectName2 = "Project 2";
      const projectDescription2 = "Description 2";

      await contract.submitProject(projectName1, projectDescription1, monthlyYield, grantTotal, period);
      await contract.submitProject(projectName2, projectDescription2, monthlyYield, grantTotal, period);

      const projects = await contract.getProjects();
      expect(projects.length).to.equal(2);
      expect(projects[0].name).to.equal(projectName1);
      expect(projects[0].description).to.equal(projectDescription1);
      
      expect(projects[1].name).to.equal(projectName2);
      expect(projects[1].description).to.equal(projectDescription2);

    });
  });
});