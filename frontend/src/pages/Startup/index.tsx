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
} from "antd";
import AddGrantForm from "@components/AddGrantForm";
import { formatNumber, max } from "../../utils";
import { initialProjects } from "@data/projects";
import { config } from "@data/config";

const { currency } = config

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
  const [data, setData] = useState<ProjectType[]>(initialProjects);
  const [showAddGrant, setShotAddGrant] = useState(false);

  const closeModal = () => setShotAddGrant(false);

  const addGrant = (d) => {
    setData((prev) => [
      ...prev,
      {
        id: (max<number>(data.map((p) => p.id)) || 0) + 1,
        name: d.name,
        description: d.description,
        grantAmount: d.grantAmount,
        apy: d.apy / 100,
        nInstallments: d.nInstallments,
        investedAmount: 0,
      },
    ]);
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
            <Button onClick={() => setShotAddGrant(true)}>
              {addGrantLabel}
            </Button>
          </div>
        }
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={data}
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
                  value={`${formatNumber(item.grantAmount)}${currency}`}
                />
                <Detail name="APY" value={`${(item.apy * 100).toFixed(2)}%`} />
                <Detail name="# Installments" value={item.nInstallments} />
                <Tooltip
                  title={`Received ${formatNumber(
                    item.investedAmount
                  )}${currency} out of ${formatNumber(item.grantAmount)}${currency}`}
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
