import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { withRouter } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

class Header extends Component {
  constructor(props, context) {
    super(props, context);
    this.logout = this.logout.bind(this);
    this.props.listLinks();
    this.props.listRoles();

    this.state = {
      accessedlinks: [
        { name: "Manage Users", url: "/users" },
        { name: "Manage Roles", url: "/roles" },
        { name: "Manage Links", url: "/Links" }
      ]
    };
  }

  logout = event => {
    this.props.logout();
  };
  componentDidMount() {}
  logout(event) {
    event.preventDefault();
    this.props.actions.logout();
    this.props.history.push("/auth");
  }

  render() {
    let linksObj = localStorage.getItem("links");
    let rolesObj = localStorage.getItem("roles");
    let userObj = localStorage.getItem("user");
    const user = JSON.parse(userObj);
    const links = JSON.parse(linksObj);
    const roles = JSON.parse(rolesObj);

    console.log("kiran headerlinks user", user);
    console.log("kiran headerlinks links ", links);
    console.log("kiran headerlinks roles ", roles);

    const currentUser = this.props.currentUser ? this.props.currentUser : null;
    let link;
    let role = [];
    if (currentUser) role = currentUser.roles;
    let currentLinks = [];
    let currentRoles = [];
    let currentLinks1 = [];
    const guestLinks = (
      <Nav className="nav navbar-nav navbar-right">
        <Nav.Link href="auth">Login</Nav.Link>
        <Nav.Link href="sighup">Signup</Nav.Link>
      </Nav>
    );
    if (this.props.isAuthenticated) {
      role.map((item, i) => {
        roles.filter(function(oldData) {
          if (item === oldData._id) {
            currentRoles.push(oldData);
            currentLinks.push(oldData.links);
          }
        });
      });
      const flattened = [].concat.apply([], currentLinks);

      console.log("kiran headerlinks currentRoles ", currentRoles);
      console.log("kiran headerlinks currentLinks1 ", currentLinks);
      console.log("kiran headerlinks currentLinks2 ", flattened);

      const isSuperAdmin = currentRoles.find(b => {
        return b.name == "SUPER_ADMIN";
      });

      console.log("kiran role found ", isSuperAdmin);

      if (isSuperAdmin) {
        currentLinks1 = [...links];
      } else {
        console.log("kiran role found ", currentLinks1);

        flattened.map((item, i) => {
          /*   const isSuperAdmin = this.props.links.find(b => {
            return b._id == "id;
          }); */
          let oldId = item;
          links.filter(function(oldData) {
            if (oldId == oldData._id) {
              currentLinks1.push(oldData);
            }
          });
        });
      }

      console.log("kiran role ", currentLinks1);

      console.log("Kiran autho is SUPER_ADMIN", currentLinks1);

      let result = currentLinks1.map((item, i) => {
        return (
          <Nav.Link href={item.url} key={i}>
            {item.name}
          </Nav.Link>
        );
      });
      console.log("Kiran autho is result", result);

      const userLinks = (
        <>
          <Nav className="mr-auto">{result}</Nav>
          <Nav className="nav navbar-nav navbar-right">
            <Nav.Link href="/logout">Logout</Nav.Link>
            <Nav.Link href="/myaccount">{currentUser.username}</Nav.Link>
          </Nav>
        </>
      );
      link = userLinks;
    } else {
      link = guestLinks;
    }
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">ERP</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">{link}</Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout()),
    listRoles: () => dispatch(actions.fetchRoles()),
    listLinks: () => dispatch(actions.fetchLinks())
  };
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    currentUser: state.auth.user,
    auth: state.auth,
    links: state.links.links,
    roles: state.roles.roles
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
