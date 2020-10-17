/*----------  Vendor Imports  ----------*/
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import * as actions from "./../store/actions";
import NotAcces from "../components/NotAccess";

/**
 * withAuthorization - HOC that renders components for authorized users only.
 * @param  {ReactNode} Component [The react component to protect]
 * @return {ReactNode}           [The protected react node]
 */
const withAuthorization = Component => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: null,
        roles: [],
        links: []
      };
      this.props.listLinks();
      this.props.listRoles();
      //this.isAuthorize();
    }

    componentDidMount() {
      console.log("kiran authorize  ");

      if (!this.isAuthorize()) this.props.history.push("/notaccess");
    }

    isAuthorize() {
      let linksObj = localStorage.getItem("links");
      let rolesObj = localStorage.getItem("roles");
      let roles = JSON.parse(rolesObj);
      let links = JSON.parse(linksObj);

      console.log("kiran authorize allroles ", roles);
      console.log("kiran authorize alllinks ", links);
      const path = this.props.location;
      console.log("kiran authorize pathname ", path);
      let link;
      let role = [];
      let currentUser = this.props.user;
      if (!currentUser) return false;

      if (currentUser) role = currentUser.roles;

      if (!role) return false;
      let currentLinks = [];
      let currentRoles = [];
      let currentLinks1 = [];
      role.map((item, i) => {
        roles.filter(function(oldData) {
          if (item === oldData._id) {
            currentRoles.push(oldData);
            currentLinks = oldData.links;
          }
        });
      });
      currentLinks.map((item, i) => {
        links.filter(function(oldData) {
          if (item === oldData._id) {
            currentLinks1.push(oldData);
          }
        });
      });
      console.log("kiran authorize alllinks ", currentLinks1);

      let linkaccess = currentLinks1.find(item => item.url === path.pathname);
      console.log("item linkaccess", typeof linkaccess);

      if (linkaccess) {
        return true;
      } else {
        return false;
      }
    }
    render() {
      return this.isAuthorize ? <Component /> : <NotAcces />;
    }
  }
  const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null,
      username: state.auth.user.username,
      user: state.auth.user,
      currentUser: state.auth.user,
      links: state.links.links,
      roles: state.roles.roles
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      listRoles: () => dispatch(actions.getRolesFromCache()),
      listLinks: () => dispatch(actions.fetchLinks())
    };
  };
  WithAuthorization.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  return withRouter(
    connect(mapStateToProps, mapDispatchToProps)(WithAuthorization)
  );
};
export default withAuthorization;
