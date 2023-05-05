import React from "react";
import { NavLink } from "react-router-dom";
import s from "./style.module.scss";

const Navbar = () => {
  return (
    <div className={s.navbar}>
      <div className={`container ${s.navbar__box}`}>
        <NavLink className={s.navbar__link} to="/client">
          Client
        </NavLink>
        <NavLink className={s.navbar__link} to="/">
          Home
        </NavLink>
        <NavLink className={s.navbar__link} to="/admin">
          Admin
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
