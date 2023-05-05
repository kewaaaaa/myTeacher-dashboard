import React from "react";

import Overview from "../components/Overview";

const Client = () => {
  return (
    <div>
      <Overview props={{ page: "Client", url: "/clients" }} />
    </div>
  );
};

export default Client;
