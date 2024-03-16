import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const JAN_1ST_2030 = 1893456000;

const StakingModule = buildModule("StakingModule", (m) => {
  

  const projectSubmission = m.contract("ProjectSubmission", [], {
    
  });



  const staking = m.contract("Staking", [projectSubmission.getAddress()], {
    
  });

  return { staking };

});

export default StakingModule;