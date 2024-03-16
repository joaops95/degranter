import { useReadContract } from "wagmi";

import TokenArtifact from "../../../backend/artifacts/contracts/ProjectSubmission.sol/ProjectSubmission.json";
import contractAddress from "../../../backend/ignition/deployments/chain-84532/deployed_addresses.json";
import { ProjectType } from "@pages/Startup";

export default function useReadProjects() {
  const result = useReadContract({
    address: contractAddress["ProjectSubmissionModule#ProjectSubmission"],
    abi: TokenArtifact.abi,
    functionName: "getProjects",
    args: [],
  });

  const { data, isLoading, refetch } = result;

  const processedData: ProjectType[] = data?.map((p) => {
    return {
      id: p.id,
      name: p.name,
      description: p.description,
      grantAmount: Number(p.grantTotal),
      apy: Number(p.monthlyYield) / 100,
      nInstallments: p.period,
      investedAmount: Number(p.grantTotal) * 0.2,
    };
  });

  return { projects: processedData, isLoading, refetch };
}
