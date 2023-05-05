import Link from "antd/es/typography/Link";
import React from "react";

const NotFounded = () => {
  return (
    <div>
      Somthing went wrong! Page non fouded 404
      <div>
        <Link to="/home">Back to Home Page</Link>
      </div>
    </div>
  );
};

export default NotFounded;
