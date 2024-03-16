import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./routes";
import Layout from "@pages/Layout";
import Navbar from "@components/Navbar";

export default function App() {

  return (
    <BrowserRouter>
      <Layout navBar={<Navbar />} content={<AppRoutes />} />
    </BrowserRouter>
  );
}
