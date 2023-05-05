import React from "react";
import { Outlet } from "react-router-dom";
import s from "./style.module.scss";
import Navbar from "../navbar/Navbar";

const Layout = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <header className={s.header}>
          <Navbar />
        </header>
        <div className="container">
          <Outlet />
        </div>
      </div>
      <footer className={s.footer}>
        <div className="conainer">&copy; 2023</div>
      </footer>
    </div>
  );
};

export default Layout;
