import "./styles.css";
import { Menu } from "antd";
import { LinkOutlined, RocketOutlined, StockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
// import logo from '@assets/full-logo.png'
import logo from "@assets/logo-no-background.png";

export default function Navbar() {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const loggedOutNavbar = [
    {
      key: "Connect Wallet",
      label: <span onClick={() => open()}>Connect your wallet!</span>,
      icon: <LinkOutlined />,
    },
  ];

  const loggedInNavbar = [
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
    {
      key: "Log Out",
      label: <span onClick={() => disconnect()}>Log out</span>,
      icon: <LinkOutlined />,
    },
  ];
  const items = isConnected ? loggedInNavbar : loggedOutNavbar;

  return (
    <div className="navbar">
      <Link to="/">
        <div className="home">
          <img src={logo} />
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
