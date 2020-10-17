import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {
  state = {
    error: ""
  };

  // TODO: remove event listeners
  componentDidMount() {}

  render() {
    let errorMessage = null;
    if (this.state.error.length) {
      errorMessage = <div>{this.state.error}</div>;
    }
    return (
      <div className="header">
        This is dashboard
        {errorMessage}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    user: state.auth.user,
    error: state.error,
    links: state.links.links,
    roles: state.roles.roles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    listRoles: () => dispatch(actions.fetchRoles()),
    listLinks: () => dispatch(actions.fetchLinks())
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
