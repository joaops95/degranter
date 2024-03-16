import "./styles.css";

import { useEffect, useState, useMemo } from "react";
import {
  Avatar,
  Button,
  List,
  Skeleton,
  Typography,
  Modal,
  Progress,
  Tooltip,
} from "antd";
import AddGrantForm from "@components/AddGrantForm";
import { formatNumber, max } from "../../utils";
import { useReadContract, useWriteContract } from "wagmi";
import { ethers } from "ethers";
import { WagmiProvider } from "wagmi";

import TokenArtifact from "../../../../backend/artifacts/contracts/ProjectSubmission.sol/ProjectSubmission.json";
import contractAddress from "../../../../backend/ignition/deployments/chain-84532/deployed_addresses.json";

import { initialProjects } from "@data/projects";
import { config } from "@data/config";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";

const { currency } = config;

const { Title, Text } = Typography;

export interface ProjectType {
  id: number;
  name: string;
  description: string;
  grantAmount: number;
  apy: number;
  nInstallments: number;
  logo?: string;
  investedAmount: number;
}

const addGrantLabel = "Add Grant";

function Detail({ name, value }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: "100px",
      }}
    >
      <Text type="secondary">{name}</Text>
      <Text>{value}</Text>
    </div>
  );
}

export default function Home() {
  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState<ProjectType[]>(initialProjects);
  const [showAddGrant, setShotAddGrant] = useState(false);
  const { writeContract } = useWriteContract();

  // const provider = useReadContract(TokenArtifact, contractAddress["ProjectSubmissionModule#ProjectSubmission"], "getProjects", []);
  // console.log(provider)
  const projects = useReadContract({
    address: contractAddress["ProjectSubmissionModule#ProjectSubmission"],
    abi: TokenArtifact.abi,
    functionName: "getProjects",
    args: [],
  });
  console.log(projects.data);

  const closeModal = () => setShotAddGrant(false);

  const addGrant = (formData) => {
    const { name, description, grantAmount, apy, nInstallments } = formData;

    writeContract({
      abi: TokenArtifact.abi,
      address: contractAddress["ProjectSubmissionModule#ProjectSubmission"],
      functionName: "submitProject",
      args: [name, description, grantAmount, apy, nInstallments],
    });

    closeModal();
  };

  const verifyProof = async (proof) => {
    console.log("proof", proof);
    const response = await fetch(
      "https://poltapi.bitnata.com/api/world_coin/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...proof, action: "create-project" }),
      }
    );
    if (response.ok) {
      const { verified } = await response.json();
      return verified;
    } else {
      const { code, detail } = await response.json();
      throw new Error(`Error Code ${code}: ${detail}`);
    }
  };

  // TODO: Functionality after verifying
  const onSuccess = () => {
    console.log("Success");
    setShotAddGrant(true);
  };

  return (
    <>
      <Title level={2}>Your grants</Title>
      <Modal
        title={`addGrantLabel`}
        open={showAddGrant}
        footer={<></>}
        onCancel={closeModal}
      >
        <AddGrantForm onSubmit={addGrant} onCancel={closeModal} />
      </Modal>
      {projects.data && projects.data.length > 0 && (
        <List
          className="demo-loadmore-list"
          header={
            <IDKitWidget
              app_id="app_staging_85617918652fbe5cc6550acb27a14e2c"
              action="create-project"
              false
              style={{ width: "100%", zIndex: 1000 }}
              verification_level={VerificationLevel.Device}
              handleVerify={verifyProof}
              onSuccess={onSuccess}
            >
              {({ open }) => (
                <Button onClick={open}>
                  Verify in WorldCoin to add a grant
                </Button>
              )}
            </IDKitWidget>

            // <div className="d-flex">
            //   <Button onClick={() => setShotAddGrant(true)}>
            //     {addGrantLabel}
            //   </Button>
            // </div>
          }
          loading={initLoading}
          itemLayout="horizontal"
          dataSource={projects.data}
          renderItem={(item) => (
            <List.Item
              actions={
                [
                  // <a key="list-loadmore-edit">edit</a>,
                  // <a key="list-loadmore-more">more</a>,
                ]
              }
            >
              <Skeleton avatar title={false} loading={false} active>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={
                        item.logo ||
                        `https://api.dicebear.com/7.x/identicon/svg?seed=${item.id}`
                      }
                    />
                  }
                  title={item.name}
                  description={item.description}
                />
                {/* <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    minWidth: "400px",
                  }}
                >
                  <Detail
                    name="Grant Amount"
                    value={`${formatNumber(item.grantAmount)}£`}
                  />
                  <Detail name="APY" value={`${item.apy * 100}%`} />
                  <Detail
                    name="Limit"
                    value={`${item.nInstallments} months`}
                  />
                  <Tooltip
                    title={`Received ${formatNumber(
                      item.investedAmount
                    )}£ out of ${formatNumber(item.grantAmount)}£`}
                  >
                    <Progress
                      percent={
                        (item.investedAmount / item.grantAmount) * 100
                      }
                      // format={(percent) =>

                      // }
                      showInfo={false}
                      status="active"
                    />
                  </Tooltip>
                </div> */}
              </Skeleton>
            </List.Item>
          )}
        />
      )}
    </>
  );
}
