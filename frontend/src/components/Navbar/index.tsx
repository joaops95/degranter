import "./styles.css";
import { Menu } from "antd";
import { Link } from "react-router-dom";

export default function Navbar() {
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
        items={[]}
        selectedKeys={[]}
      />
    </div>
  );
}
