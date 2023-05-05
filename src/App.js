import "./App.css";
import Layout from "./components/Layout/Layout";
import Admin from "./pages/Admin";
import Client from "./pages/Client";
import Home from "./pages/Home";
import NotFounded from "./pages/NotFounded";
import Page1 from "./pages/Page1";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="page1" element={<Page1 />} />
        <Route path="admin" element={<Admin />} />
        <Route path="client" element={<Client />} />
        <Route path="*" element={<NotFounded />} />
      </Route>
    </Routes>
  );
}

export default App;
