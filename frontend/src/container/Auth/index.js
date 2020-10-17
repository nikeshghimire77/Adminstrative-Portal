import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../components/spinner";
import toastr from "toastr";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  FormFeedback,
  Jumbotron,
  Alert
} from "reactstrap";
import * as actions from "../../store/actions/index";

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      submitted: false,
      loading: false,
      error: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });

    const { username, password } = this.state;
    if (!(username && password)) return;

    this.props.onAuth(username, password);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.push("/admin");
    } else if (nextProps.error) {
      toastr.error(nextProps.error);
    }
  }

  render() {
    const { username, password, submitted } = this.state;
    let spinnerIcon = null;
    if (this.props.loading) {
      spinnerIcon = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <Alert color="danger" isOpen={true} fade={false}>
          {this.props.error}
        </Alert>
      );
    }
    return (
      <Jumbotron>
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      {spinnerIcon}
                      <h3>Login</h3>

                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          invalid={submitted && !username}
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          name="username"
                          value={username}
                          onChange={this.handleChange}
                        />
                        {submitted && !username && (
                          <FormFeedback>Username is required</FormFeedback>
                        )}
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          invalid={submitted && !password}
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          name="password"
                          value={password}
                          onChange={this.handleChange}
                        />
                        {submitted && !password && (
                          <FormFeedback>Password is required</FormFeedback>
                        )}
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">
                            Login
                          </Button>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>{errorMessage}</Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
