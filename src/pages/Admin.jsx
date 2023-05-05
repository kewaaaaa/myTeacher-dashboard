import React from "react";

import Overview from "../components/Overview";

const Admin = () => {
  return (
    <div>
      <Overview props={{ page: "Admin", url: "/users" }} />
    </div>
  );
};

export default Admin;
