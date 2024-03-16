import "./styles.css";
import { Link } from "react-router-dom";
import { Layout, theme } from "antd";
import { GithubOutlined } from "@ant-design/icons";
const { Header, Footer, Content } = Layout;

export default function MyLayout({ navBar, content }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Header className="header">{navBar}</Header>
      <Content className="content">
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {content}
        </div>
      </Content>
    </Layout>
  );
}
