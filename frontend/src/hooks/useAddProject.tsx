import { useWriteContract } from "wagmi";

import TokenArtifact from "../../../backend/artifacts/contracts/ProjectSubmission.sol/ProjectSubmission.json";
import contractAddress from "../../../backend/ignition/deployments/chain-84532/deployed_addresses.json";

export default function useAddProject() {
  const { writeContract } = useWriteContract();

  const addProject = ({
    name,
    description,
    grantAmount,
    apy,
    nInstallments,
    onSuccess,
    onError,
  }) => {
    writeContract({
      abi: TokenArtifact.abi,
      address: contractAddress["ProjectSubmissionModule#ProjectSubmission"],
      functionName: "submitProject",
      args: [name, description, apy, grantAmount, nInstallments],
    }, {onSuccess, onError});
  };

  return { addProject };
}
