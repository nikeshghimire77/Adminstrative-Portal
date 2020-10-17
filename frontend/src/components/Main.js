import React from "react";
import { Jumbotron } from "reactstrap";
import { Container } from "react-bootstrap";

class Main extends React.Component {
  render() {
    return (
      <Jumbotron>
        <Container>This is Dashboard Component</Container>
      </Jumbotron>
    );
  }
}

export default Main;
