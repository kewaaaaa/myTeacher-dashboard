import React from "react";
import { Button } from "antd";
import s from "./style.module.scss";
import { Link } from "react-router-dom";

const Home = () => {


  return (
    <div className={s.home}>
      <Link to="/client">
        <Button type="primary" size="large">
          Client
        </Button>
      </Link>
      <Link to="/admin">
        <Button type="primary" size="large">
          Admin
        </Button>
      </Link>
    </div>
  );
};

export default Home;
