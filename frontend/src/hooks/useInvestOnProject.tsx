import { useWriteContract } from "wagmi";

import TokenArtifact from "../../../backend/artifacts/contracts/Staking.sol/Staking.json";
import contractAddress from "../../../backend/ignition/deployments/chain-84532/deployed_addresses.json";

export default function useInvestOnProject() {
  const { writeContract } = useWriteContract();

  const investOnProject = ({
    projectId, amount, onSuccess, onError
  }) => {
    writeContract({
      abi: TokenArtifact.abi,
      address: contractAddress["ProjectSubmissionModule#Staking"],
      functionName: "submitProject",
      args: [projectId, amount],
    }, {onSuccess, onError});
  };

  return { investOnProject };
}
