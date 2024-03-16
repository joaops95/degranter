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
          <div className="d-flex">
            <Button onClick={openModal} disabled={addingGrant}>
              {addGrantLabel}
            </Button>
            {addingGrant && (
              <>
                <LoadingOutlined />
                <span>Tokenizing your grant...</span>
              </>
            )}
          </div>
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
