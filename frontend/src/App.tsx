import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./routes";
import Layout from "@pages/Layout";
import Navbar from "@components/Navbar";
import Web3ModalProvider from "@components/Web3ModalProvider";

export default function App() {
  return (
    <BrowserRouter>
      <Web3ModalProvider>
        <Layout navBar={<Navbar />} content={<AppRoutes />} />
      </Web3ModalProvider>
    </BrowserRouter>
  );
}
