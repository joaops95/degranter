import { ProjectType } from "@pages/Startup";
import { calculateTotalInterest, formatNumber } from "@utils/index";
// import { calculateMonthlyYield } from "@utils/index";
import { Button, Form, Input, InputNumber, Typography, Select } from "antd";
import { useState, useEffect } from "react";
import { config } from "@data/config";
import { LoadingOutlined } from "@ant-design/icons";

import { Networks } from "../../consts/chains";
import { config as dotenvConfig } from "dotenv";
import { ThirdwebSDK, SmartContract } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { ThunderboltOutlined } from "@ant-design/icons";

// dotenvConfig();

// Amount to transfer in USDC
// Source chain and destination chain, options are "sepolia", "avalanche-fuji", "arbitrum-sepolia", "op-sepolia-testnet" and "base-sepolia-testnet".


const { Text, Title } = Typography;
const { Option } = Select;
const currency = config.currency;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

type Props = {
  startup: ProjectType;
  onSubmit: (amount: number) => void;
  onCancel: () => void;
};
export default function InvestForm({ startup, onSubmit, onCancel }: Props) {
  const [amountToInvest, setAmountToInvest] = useState(0);
  const [ethToFiatRatio, setEthToFiatRatio] = useState(4071.5);
  const [sourceChain, setSourceChain] = useState("avalanche-fuji");
  const [destinationChain, setDestinationChain] = useState(
    "base-sepolia-testnet"
  );

  // const monthlyYield = calculateMonthlyYield(
  //   amountToInvest,
  //   startup.apy,
  //   startup.nInstallments
  // );



  const ccptTransfer = async () => {
    const privateKey = import.meta.env.VITE_PRIVATE_KEY as string;
    console.log("sourceChainObject", Networks);
    console.log("sourceChainObject", sourceChain);

    const sourceChainObject = Networks[sourceChain];
    const destinationChainObject = Networks[destinationChain];
    
  };


  const fiatToInvest =
    ethToFiatRatio !== null ? amountToInvest * ethToFiatRatio : null;

  useEffect(() => {
    // const fn = async () => {
    //   const response = await fetch(
    //     "https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/simple/price?ids=ethereum,tether&vs_currencies=usd"
    //   );
    //   const data = await response.json();
    //   const ethToUsdtRate = data.ethereum.usd / data.tether.usd;
    //   return ethToUsdtRate;
    // };
    // fn().then((rate) => setEthToFiatRatio(rate));
  }, []);

  const maxAmount = startup.grantAmount - startup.investedAmount;

  const apy = startup.apy;
  const totalInterest =
    fiatToInvest === null
      ? null
      : calculateTotalInterest(
          fiatToInvest,
          startup.apy,
          startup.nInstallments
        );
  const monthlyInterest = totalInterest / startup.nInstallments;
  const monthlyPayback =
    amountToInvest / startup.nInstallments + monthlyInterest;
  return (
    <>
      <Text>
        Invest up to {currency}
        {formatNumber(maxAmount)}
      </Text>
      <div style={{ marginBottom: "20px" }} />

      <Form.Item label="Source Chain" name="sourceChain">
        <Select
          onChange={(value) => setSourceChain(value)}
          suffixIcon={<ThunderboltOutlined />}
        >
          {Object.entries(Networks).map(([key, value]) => (
            <Option key={key} value={key}>
              <span>{value.name}</span>
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Destination Chain" name="destinationChain">
        <Select
          onChange={(value) => setDestinationChain(value)}
          suffixIcon={<ThunderboltOutlined />}
        >
          {Object.entries([
            Networks["base-sepolia-testnet"]
          ]).map(([key, value]) => (
            <Option key={key} value={key}>
              <span>{value.name}</span>
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form
        {...layout}
        name="nest-messages"
        onFinish={() => onSubmit(fiatToInvest)}
        onAbort={onCancel}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "30px",
          }}
        >
          <Form.Item
            name={["investmentAmount"]}
            rules={[
              {
                // type: "number",
                min: 0,
                max: maxAmount,
              },
            ]}
          >
            <div>
              <InputNumber
                placeholder={"Amount to invest"}
                addonAfter="ETH"
                value={amountToInvest}
                onChange={(newValue) => setAmountToInvest(newValue || 0)}
                style={{ width: "100%" }}
              />
              <div>
                {ethToFiatRatio ? (
                  <>
                    {currency}
                    {fiatToInvest.toFixed(2)}
                  </>
                ) : (
                  <>
                    <LoadingOutlined />
                    <span>Fetching conversion rates...</span>
                  </>
                )}
              </div>
            </div>
          </Form.Item>

          <div>
            <Title level={4}>Your investment</Title>
            <Text>APY: {(startup.apy * 100).toFixed(2)}%</Text>
            <br />
            <Text>
              {fiatToInvest && (
                <>
                  Interest: {currency}
                  {totalInterest.toFixed(2)} paid over {startup.nInstallments}{" "}
                  months
                  <br />
                  Monthly Interest: {currency}
                  {monthlyInterest.toFixed(2)}
                  <br />
                  Monthly Income: {currency}
                  {monthlyPayback.toFixed(2)}
                </>
              )}
            </Text>
          </div>
        </div>
        
        {sourceChain !== "sepolia" && (
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="default" onClick={ccptTransfer}>
              Confirm cross-chain transfer
            </Button>
          </Form.Item>
        )}



        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="default" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
