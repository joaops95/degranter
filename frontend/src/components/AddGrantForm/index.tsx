import { Button, Form, Input, InputNumber } from "antd";
import { config } from "@data/config";

const currency = config.currency

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


export default function AddGrantForm({ onSubmit, onCancel }) {
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onSubmit}
      onAbort={onCancel}
    >
      <Form.Item name={["name"]} rules={[{ required: true }]}>
        <Input placeholder="Project Name" />
      </Form.Item>
      <Form.Item name={["description"]} rules={[{ required: true }]}>
        <Input.TextArea placeholder="Project description" />
      </Form.Item>
      <Form.Item
        name={["grantAmount"]}
        rules={[{ type: "number", min: 0, max: 1000000 }]}
      >
        <InputNumber
          placeholder={"Insert the granted amount"}
          addonAfter={currency}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Form.Item
          name="apy"
          rules={[{ type: "number", min: 0, max: 100 }]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <InputNumber
          placeholder={"APY"}
          addonAfter='%'
          style={{ width: "100%" }}
        />
        </Form.Item>
        <Form.Item
          name="nInstallments"
          rules={[{ type: "number", min: 1, max: 24 }]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 8px",
          }}
        >
          <InputNumber placeholder="No. Installments" />
        </Form.Item>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="default" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
