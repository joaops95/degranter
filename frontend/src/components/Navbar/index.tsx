import "./styles.css";
import { Menu } from "antd";
import { RocketOutlined, StockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function Navbar() {

  const commonNavbar = [
    {
      key: "startup",
      label: <Link to="/startup">Startup</Link>,
      icon: <RocketOutlined />,
    },
    {
      key: "investor",
      label: <Link to="/investor">Investor</Link>,
      icon: <StockOutlined />,
    },
  ];
  const items = commonNavbar;

  return (
    <div className="navbar">
      <Link to="/">
        <div className="home">
          <img src="logo.svg" />
        </div>
      </Link>
      <Menu
        className="menu"
        theme="dark"
        mode="horizontal"
        items={items}
        selectedKeys={[]}
      />
    </div>
  );
}
