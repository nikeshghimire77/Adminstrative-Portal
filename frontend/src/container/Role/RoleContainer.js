import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../../store/actions/index";

import { Redirect } from "react-router-dom";
import RoleForm from "../../components/Role/RoleForm";

class RoleContainer extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.props.listLinks();
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
        <RoleForm
          role={this.props.role}
          onSave={this.save}
          links={this.props.links}
        />
      </div>
    );
  }

  save(role) {
    if (!this.props.match.params.id) {
      this.props.saveRole(role);
    } else {
      this.props.updateRole(role);
    }
  }

  componentDidMount = () => {
    if (this.props.match.params.id) {
      this.props.getRoleById(this.props.match.params.id);
    }
  };
}

const mapDispatchToProps = dispatch => ({
  saveRole: role => dispatch(actions.createRole(role)),
  updateRole: role => dispatch(actions.updateRole(role)),
  newRole: () => dispatch(actions.newRole()),
  getRoleById: id => dispatch(actions.fetchRole(id)),
  listLinks: () => dispatch(actions.fetchLinks())
});

const mapStateToProps = state => {
  const res = {
    loading: state.roles.loading,
    saved: state.roles.saved,
    error: state.roles.error,
    role: state.roles.newInsertedRoles,
    links: state.links.links,
    loggedRole: state.auth.role
  };
  return res;
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleContainer);
