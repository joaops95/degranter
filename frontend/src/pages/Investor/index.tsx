import "./styles.css";

import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  List,
  Skeleton,
  Typography,
  Modal,
  Progress,
  Tooltip,
  notification,
} from "antd";
import InvestForm from "@components/InvestForm";
import { formatNumber, max } from "../../utils";
import { initialProjects } from "@data/projects";
import { config } from "@data/config";
import useReadProjects from "@hooks/useReadProjects";
import { useNotification } from "@hooks/NotificationContext";
import useInvestOnProject from "@hooks/useInvestOnProject";

const { currency } = config;

const { Title, Text } = Typography;

interface ProjectType {
  id: number;
  name: string;
  description: string;
  grantAmount: number;
  apy: number;
  nInstallments: number;
  logo?: string;
  investedAmount: number;
}

const investLabel = "Invest";

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
  const [showInvestForm, setShowInvestForm] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [investingOnProject, setInvestingOnProject] = useState(false);

  const { api: notificationApi } = useNotification();
  const { projects, isLoading, refetch: refreshProjects } = useReadProjects();
  const { investOnProject } = useInvestOnProject();

  const selectedStartup = projects?.[selectedIdx];

  const closeModal = () => {
    setSelectedIdx(null);
    setShowInvestForm(false);
  };

  const openModal = (idx) => {
    setSelectedIdx(idx);
    setShowInvestForm(true);
  };

  const invest = (startupIdx, amount) => {
    setInvestingOnProject(true);
    const startup = projects[startupIdx];

    investOnProject({
      projectId: startup.id,
      amount: amount,
      onSuccess: () => {
        console.log("Yeeeey");
        setInvestingOnProject(false);
        closeModal();
      },
      onError: (error) => {
        console.log("Error", error.details);
        if (!error) {
          notificationApi.error({
            message: "Something went wrong",
            description: "Could not invest on startup",
          });
        }
        setInvestingOnProject(false);
        closeModal();
      },
    });
  };

  return (
    <>
      <Title level={2}>Available Investments</Title>
      {selectedStartup && (
        <Modal
          title={`${investLabel} in ${selectedStartup?.name}`}
          open={showInvestForm}
          footer={<></>}
          onCancel={closeModal}
        >
          <InvestForm
            key={selectedStartup.id}
            startup={selectedStartup}
            onSubmit={(amount: number) => invest(selectedIdx, amount)}
            onCancel={closeModal}
          />
        </Modal>
      )}
      <List
        className="demo-loadmore-list"
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={projects}
        renderItem={(item, idx) => (
          <List.Item
            actions={[
              <Button onClick={() => openModal(idx)}>{investLabel}</Button>,
            ]}
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  minWidth: "400px",
                }}
              >
                <Detail
                  name="Grant Amount"
                  value={`${formatNumber(item.grantAmount)}${currency}`}
                />
                <Detail name="APY" value={`${(item.apy * 100).toFixed(2)}%`} />
                <Detail name="# Installments" value={item.nInstallments} />
                <Tooltip
                  title={`Received ${formatNumber(
                    item.investedAmount
                  )} ${currency} out of ${formatNumber(
                    item.grantAmount
                  )}${currency}`}
                >
                  <Progress
                    percent={(item.investedAmount / item.grantAmount) * 100}
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
