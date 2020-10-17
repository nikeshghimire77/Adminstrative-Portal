import React from "react";
import { Link } from "react-router-dom";

const NotFound = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
      <br></br>
      <Link to="/">Return to Home Page</Link>
    </h3>
  </div>
);
export default NotFound;
