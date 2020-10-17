import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../../store/actions/index";

import { Redirect } from "react-router-dom";
import UserForm from "../../components/User/UserForm";

class UserContainer extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.props.listRoles();
  }

  render() {
    if (this.props.saved) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        {this.props.loading && (
          <p className="text-center alert alert-info">Loading ...</p>
        )}
        <UserForm
          user={this.props.user}
          roles={this.props.roles}
          onSave={this.save}
        />
      </div>
    );
  }

  save(user) {
    if (!this.props.match.params.id) {
      this.props.saveUser(user);
    } else {
      this.props.updateUser(user);
    }
  }

  componentDidMount = () => {
    console.log("kiran1 component did mount", this.props.match.params.id);
    if (this.props.match.params.id) {
      this.props.getUserById(this.props.match.params.id);
      console.log("kiran1 component did mount", this.props.match.params.id);
    }
  };
}

const mapDispatchToProps = dispatch => ({
  saveUser: user => dispatch(actions.createUser(user)),
  updateUser: user => dispatch(actions.updateUser(user)),
  newUser: () => dispatch(actions.newUser()),
  getUserById: id => dispatch(actions.fetchUser(id)),
  listRoles: () => dispatch(actions.fetchRoles())
});

const mapStateToProps = state => {
  const res = {
    loading: state.users.loading,
    saved: state.users.saved,
    error: state.users.error,
    roles: state.roles.roles,
    user: state.users.newInsertedUsers,
    loggedUser: state.auth.user
  };
  return res;
};

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
