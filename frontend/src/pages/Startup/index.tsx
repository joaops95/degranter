import "./styles.css";

import { useState } from "react";
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
import { formatNumber } from "../../utils";

import { config } from "@data/config";
import useReadProjects from "@hooks/useReadProjects";
import useAddProject from "@hooks/useAddProject";
import { useNotification } from "@hooks/NotificationContext";
import { LoadingOutlined } from "@ant-design/icons";
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
  const [addingGrant, setAddingGrant] = useState(false);
  const { api: notificationApi } = useNotification();

  const [showAddGrant, setShotAddGrant] = useState(false);
  const { addProject } = useAddProject();

  const { projects, isLoading, refetch: refreshProjects } = useReadProjects();

  const closeModal = () => setShotAddGrant(false);
  const openModal = () => setShotAddGrant(true);

  const addGrant = (formData) => {
    setAddingGrant(true);
    const { name, description, grantAmount, apy, nInstallments } = formData;
    addProject({
      name,
      description,
      grantAmount,
      apy,
      nInstallments,
      onSuccess: (data, variables, context) => {
        console.log("Success!", data, variables, context);
        setAddingGrant(false);
        notificationApi.success({
          message: "Successfully created project on chain",
          description: "You should see the results in a brief moment",
        });
        refreshProjects();
      },
      onError: (error, variables, context) => {
        setAddingGrant(false);
        notificationApi.error({
          message: "Failed to add project on chain",
          description: error.details,
        });
      },
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
                <div className="d-flex">
                <Button onClick={open} disabled={addingGrant}>
                  {addGrantLabel}
                </Button>
                {addingGrant && (
                  <>
                    <LoadingOutlined />
                    <span>Tokenizing your grant...</span>
                  </>
                )}
              </div>
              )}
            </IDKitWidget>
          
        }
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={projects}
        renderItem={(item) => (
          <List.Item>
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  minWidth: "400px",
                }}
              >
                <Detail
                  name="Grant Amount"
                  value={`${currency}${formatNumber(item.grantAmount)}`}
                />
                <Detail name="APY" value={`${item.apy * 100}%`} />
                <Detail name="Limit" value={`${item.nInstallments} months`} />
                <Tooltip
                  title={`Received ${currency}${formatNumber(
                    item.investedAmount
                  )} out of ${currency}${formatNumber(item.grantAmount)}`}
                >
                  <Progress
                    percent={(item.investedAmount / item.grantAmount) * 100}
                    // format={(percent) =>

                    // }
                    showInfo={false}
                    status="active"
                  />
                </Tooltip>
              </div>
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
}
