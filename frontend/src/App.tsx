import { BrowserRouter } from "react-router-dom";

import { notification } from "antd";
import { AppRoutes } from "./routes";
import Layout from "@pages/Layout";
import Navbar from "@components/Navbar";
import Web3ModalProvider from "@components/Web3ModalProvider";
import NotificationProvider from "@hooks/NotificationContext";

export default function App() {
  const [api, contextHolder] = notification.useNotification();
  
  return (
    <BrowserRouter>
      <NotificationProvider api={api}>
        {contextHolder}
        <Web3ModalProvider>
          <Layout navBar={<Navbar />} content={<AppRoutes />} />
        </Web3ModalProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}
