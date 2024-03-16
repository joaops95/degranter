import { ProjectType } from "@pages/Startup";
import { calculateTotalInterest } from "@utils/index";
// import { calculateMonthlyYield } from "@utils/index";
import { Button, Form, Input, InputNumber, Typography } from "antd";
import { useState } from "react";
import { config } from "@data/config";

const { Text, Title } = Typography;
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
  // const monthlyYield = calculateMonthlyYield(
  //   amountToInvest,
  //   startup.apy,
  //   startup.nInstallments
  // );

  const maxAmount = startup.grantAmount - startup.investedAmount

  const apy = startup.apy;
  const totalInterest =
    amountToInvest === null
      ? null
      : calculateTotalInterest(
          amountToInvest,
          startup.apy,
          startup.nInstallments
        );
  const monthlyInterest = totalInterest / startup.nInstallments;
  const monthlyPayback =
    amountToInvest / startup.nInstallments + monthlyInterest;
  return (
    <>
      <Text>Invest up to {currency}{maxAmount}</Text>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={() => onSubmit(amountToInvest)}
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
                type: "number",
                min: 0,
                max: maxAmount,
              },
            ]}
          >
            <InputNumber
              placeholder={"Amount to invest"}
              addonAfter={currency}
              value={amountToInvest}
              onChange={(newValue) => setAmountToInvest(newValue || 0)}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <div>
            <Title level={4}>Your investment</Title>
            <Text>APY: {(startup.apy * 100).toFixed(2)}%</Text>
            <br />
            <Text>
              {
                // APY
                //
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
              }
            </Text>
          </div>
        </div>

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
