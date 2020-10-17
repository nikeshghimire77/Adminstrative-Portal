import React, { Component } from "react";
import UserList from "./../../components/User/UserList";
import { connect } from "react-redux";
import * as actions from "./../../store/actions/index";
import { Link } from "react-router-dom";

import withAuthorization from "./../../router/withAuthorization";
class UserListContainer extends Component {
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
    this.props.listUsers();
    this.props.listRoles();
  }

  render() {
    const result = this.props.loading ? (
      <p className="text-center alert alert-info">Loading Users...</p>
    ) : (
      <>
        <form>
          <div className="col-md-2">
            <Link to="/user" className="btn btn-primary">
              <span className="fa fa-plus" aria-hidden="true"></span>
            </Link>
          </div>
        </form>
        <UserList
          users={this.props.users}
          roles={this.props.roles}
          onDelete={this.deleteUser}
        />
      </>
    );
    return <div className="users">{result}</div>;
  }

  deleteUser(id) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      this.props.deleteUser(id);
    }
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    loading: state.users.loading,
    error: state.users.error,
    roles: state.roles.roles
  };
};
const mapDispatchToProps = dispatch => {
  const dd = {
    listUsers: () => dispatch(actions.fetchUsers()),
    listRoles: () => dispatch(actions.fetchRoles()),
    deleteUser: id => dispatch(actions.deleteUser(id))
  };
  return dd;
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer);
