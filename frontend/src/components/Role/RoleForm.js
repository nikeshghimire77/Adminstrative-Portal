import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { history } from "../../utils/history";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import Select from "react-select";

class RoleForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);

    this.state = {
      name: "",
      description: "",
      links: [],
      selectedValue: []
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSave(this.state);
  }
  componentDidMount() {
    let links = this.props;
    let filtered = [];
    console.log("Updated State links", links);
    /* links.map((link, name) =>
      filtered.push({
        value: link._id,
        label: link.name
      })
    );
    this.setState(
      prevState => {
        return {
          ...prevState,
          selectedValue: filtered
        };
      },
      () => console.log("Updated State ", this.state)
    ); */
    this.setState(this.props.role);
  }
  UNSAFE_componentWillReceiveProps(ble) {
    let links = ble.links;
    let existinglinks = [];
    if (ble.role) {
      existinglinks = ble.role.links;
    }

    let filtered = [];
    if (existinglinks) {
      console.log("Updated State links", links);
      existinglinks.map((newData, name) => {
        links.filter(function(oldData) {
          if (newData === oldData._id) {
            filtered.push({
              value: oldData._id,
              label: oldData.name
            });
          }
        });
      });
    } else {
      console.log("Updated State links", this.state.selectedValue);
      filtered = this.state.selectedValue;
    }

    this.setState(
      prevState => {
        return {
          ...prevState,
          selectedValue: filtered
        };
      },
      () => console.log("Updated State ", this.state)
    );

    this.setState(ble.role);
  }
  goBack() {
    history.push("/roles");
  }
  handleSelectChange = roles => {
    console.log("kiran handleSelectChange  ", roles);
    console.log("kiran handleSelectChange  ", this.props.links);
    this.setState(
      prevState => {
        return {
          ...prevState,
          selectedValue: roles
        };
      },
      () => console.log("Updated State ", this.state.selectedValue)
    );
    let existingLinks = this.props.links;
    let filtered = [];
    roles.filter(function(newData) {
      return existingLinks.filter(function(oldData) {
        if (newData.value === oldData._id) {
          filtered.push(oldData);
        }
      });
    });
    console.log("kiran handleSelectChange1  ", filtered);

    this.setState(
      prevState => {
        return {
          ...prevState,
          links: filtered
        };
      },
      () => console.log("Updated State ", this.state.links)
    );
    console.log("kiran Updated State ", this.state);
  };

  componentDidUpdate(prevProps, prevState) {
    console.log("Kiran componentDidUpdate  prevProps", prevProps);
    console.log("Kiran componentDidUpdate  prevState", prevState);
  }

  render() {
    let roleTitle = "New role";
    console.log("Kiran Links roles", this.state);
    console.log("Kiran Links props", this.props);

    if (this.state.name) {
      roleTitle = "Edit Role - " + this.state.name;
    }
    return (
      <Form className="ticket-container">
        <h5>{roleTitle}</h5>

        <FormGroup className="col-12" row>
          <Label sm={4}>Name</Label>
          <Col sm={6}>
            <Input
              type="text"
              name="name"
              placeholder="Role Name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-12" row>
          <Label sm={4}>Description</Label>
          <Col sm={6}>
            <Input
              type="text"
              id="description"
              name="description"
              placeholder="description"
              value={this.state.description}
              className="module-form-select"
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-12" row>
          <Label sm={4}>Select Links</Label>
          <Col sm={6}>
            <Select
              isMulti
              value={this.state.selectedValue}
              onChange={this.handleSelectChange}
              options={this.props.links.map((link, name) => ({
                value: link._id,
                label: link.name
              }))}
            />
          </Col>
        </FormGroup>
        <div className="col-12 text-center">
          <Button
            className="center-block btn-success"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
          <Link to="/roles" className="btn btn-primary">
            Back
          </Link>
        </div>
      </Form>
    );
  }
}

RoleForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  role: PropTypes.object
};

export default RoleForm;
