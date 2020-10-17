import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Select from "react-select";

import { history } from "../../utils/history";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roles: [],
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
    this.setState(this.props.user);
  }
  UNSAFE_componentWillReceiveProps(ble) {
    let allRoles = ble.roles;
    let existinglinks = [];
    if (ble.user) {
      existinglinks = ble.user.roles;
    }

    let filtered = [];
    if (existinglinks) {
      console.log("Updated State allRoles", allRoles);
      existinglinks.map((newData, name) => {
        allRoles.filter(function(oldData) {
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
    this.setState(ble.user);
  }
  goBack() {
    history.push("/users");
  }
  handleSelectChange = roles => {
    console.log("kiran handleSelectChange  ", roles);
    console.log("kiran handleSelectChange  ", this.props.roles);
    this.setState(
      prevState => {
        return {
          ...prevState,
          selectedValue: roles
        };
      },
      () => console.log("Updated State ", this.state.selectedValue)
    );
    let existingLinks = this.props.roles;
    let filtered = [];
    if (roles) {
      roles.filter(function(newData) {
        return existingLinks.filter(function(oldData) {
          if (newData.value === oldData._id) {
            filtered.push(oldData);
          }
        });
      });
    }
    console.log("kiran handleSelectChange1  ", filtered);

    this.setState(
      prevState => {
        return {
          ...prevState,
          roles: filtered
        };
      },
      () => console.log("Updated State ", this.state.links)
    );
    console.log("kiran Updated State ", this.state);
  };

  render() {
    console.log("kiran  State ", this.state);

    let userTitle = "New user";
    if (this.state.username) {
      userTitle = "Edit User - " + this.state.firstName;
    }
    return (
      <Form className="ticket-container">
        <h5>{userTitle}</h5>

        <FormGroup className="col-12" row>
          <Label sm={4}>User Name</Label>
          <Col sm={6}>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-12" row>
          <Label sm={4}>First Name</Label>
          <Col sm={6}>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-12" row>
          <Label sm={4}>Last Name</Label>
          <Col sm={6}>
            <Input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-12" row>
          <Label sm={4}>Email</Label>
          <Col sm={6}>
            <Input
              type="text"
              className="form-control"
              id="email"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-12" row>
          <Label sm={4}>Email</Label>
          <Col sm={6}>
            <Input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              defaultValue={this.state.password}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-12" row>
          <Label sm={4}>roles</Label>
          <Col sm={6}>
            <Select
              isMulti
              value={this.state.selectedValue}
              onChange={this.handleSelectChange}
              options={this.props.roles.map((role, name) => ({
                value: role._id,
                label: role.name
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
          <Link to="/users" className="btn btn-primary">
            Back
          </Link>
        </div>
      </Form>
    );
  }
}

UserForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default UserForm;
