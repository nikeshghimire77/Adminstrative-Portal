import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { history } from "../../utils/history";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";

class LinkForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      name: "",
      url: ""
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState(
      prevState => {
        return {
          ...prevState,
          [name]: value
        };
      },
      () => console.log("Updated State ", this.state)
    );
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSave(this.state);
  }
  componentDidMount() {
    this.setState(this.props.link);
  }
  UNSAFE_componentWillReceiveProps(ble) {
    console.log("Kiranwill receive props", ble);
    this.setState(ble.link);
  }
  goBack() {
    history.push("/links");
  }
  handleLinksChange = links => {
    let value = links.target.value;
    let name = links.target.name;
    this.setState(
      prevState => {
        return {
          ...prevState,
          [name]: value
        };
      },
      () => console.log("Updated State ", this.state)
    );
  };

  render() {
    let linkTitle = "New link";
    if (this.state.linkname) {
      linkTitle = "Edit Link - " + this.state.firstName;
    }
    return (
      <Form className="ticket-container">
        <h5>{linkTitle}</h5>

        <FormGroup className="col-6" row>
          <Label sm={4}>Link Name</Label>
          <Col sm={6}>
            <Input
              type="text"
              name="name"
              placeholder="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-6" row>
          <Label sm={4}>Url</Label>
          <Col sm={6}>
            <Input
              type="text"
              id="url"
              name="url"
              placeholder="Url"
              value={this.state.url}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>

        {/* <FormGroup className="col-6" row>
          <Label sm={4}>links</Label>
          <Col sm={6}>
            <Input
              type="select"
              className="form-control"
              onChange={this.handleLinksChange}
              name="links"
              id="links"
            >
              <option id="standard">Standard</option>
              <option id="admin">Admin</option>
            </Input>
          </Col>
        </FormGroup> */}
        <div className="col-12 text-center">
          <Button
            className="center-block btn-success"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
          <Link to="/links" className="btn btn-primary">
            Back
          </Link>
        </div>
      </Form>
    );
  }
}

LinkForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  link: PropTypes.object
};

export default LinkForm;
