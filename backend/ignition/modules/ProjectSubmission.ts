import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const ProjectSubmissionModule = buildModule("ProjectSubmissionModule", (m) => {
  const projectSubmission = m.contract("ProjectSubmission", [], {});

  // const mockToken = m.contract(
  //   "MockERC20Token",
  //   ["Mock Token", "MOCK", m.getAccount(0), ethers.parseEther("1000")],
  //   {}
  // );

  const baseToken = "0x399f56cd72ca88f3873b3698a395083a44a9a641"

  // const address = m.readEventArgument(

  const staking = m.contract("Staking", [baseToken, projectSubmission], {});

  return { projectSubmission, staking };
});

export default ProjectSubmissionModule;
