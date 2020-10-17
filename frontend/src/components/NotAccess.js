import React from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Container } from "react-bootstrap";

const NotAccess = ({ location }) => (
  <Jumbotron>
    <Container>
      <h3>
        You don't have admin permission to access this link, Please contact
        Administrator
        <br></br>
      </h3>
    </Container>
  </Jumbotron>
);
export default NotAccess;
