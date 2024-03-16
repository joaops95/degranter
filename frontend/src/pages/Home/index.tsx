import React from "react";
import { Card, Col, Row, Typography } from "antd";
import { Line } from "@ant-design/charts";
const { Title } = Typography;


const startupData = [
  { name: "Startup A", amounts: [2000, 3000, 4000, 3500, 5000, 6000] },
  { name: "Startup B", amounts: [1500, 2500, 3200, 4000, 4200, 5500] },
  { name: "Startup C", amounts: [1800, 2800, 3500, 3800, 4500, 5800] },
];


const Home = () => {
  const startupCount = startupData.length;
  const totalGrants = startupData.reduce((acc, startup) => {
    return acc + startup.amounts.reduce((acc, amount) => acc + amount, 0);
  }, 0);
  const mediumYield = totalGrants / startupCount;
  
  const lineData = startupData.flatMap((startup) =>
    startup.amounts.map((amount, index) => ({
      month: `Month ${index + 1}`,
      startup: startup.name,
      amount,
    }))
  );

  const lineConfig = {
    data: lineData,
    xField: "month",
    yField: "amount",
    seriesField: "startup",
    height: 300,
  };

  return (
    <div style={{ padding: "20px" }}>
            <Title>Welcome to FastGrant</Title>
      <Title level={4} style={{ marginTop: "20px" }}
      
      >Helping startups to retrieve money from secure grants.</Title>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title="Startups on Platform">
            <h2>{startupCount}</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Medium Yield for Investors">
            <h2>${mediumYield}</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Grants Money">
            <h2>${totalGrants}</h2>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Card title="Payouts by Startup">
            <Line {...lineConfig} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
