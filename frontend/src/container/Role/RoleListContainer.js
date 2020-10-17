import React, { Component } from "react";
import RoleList from "./../../components/Role/RoleList";
import { connect } from "react-redux";
import * as actions from "./../../store/actions/index";
import withAuthorization from "./../../router/withAuthorization";
import { Link } from "react-router-dom";

class RoleListContainer extends Component {
  constructor(props) {
    super(props);
    this.deleteRole = this.deleteRole.bind(this);
    this.props.listRoles();
  }

  render() {
    const result = this.props.loading ? (
      <p className="text-center alert alert-info">Loading Roles...</p>
    ) : (
      <>
        <form>
          <div className="col-md-2">
            <Link to="/role" className="btn btn-primary">
              <span className="fa fa-plus" aria-hidden="true"></span>
            </Link>
          </div>
        </form>
        <RoleList roles={this.props.roles} onDelete={this.deleteRole} />
      </>
    );
    return <div className="roles">{result}</div>;
  }

  deleteRole(id) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      this.props.deleteRole(id);
    }
  }
}

const mapStateToProps = state => {
  const dd = {
    roles: state.roles.roles,
    loading: state.roles.loading,
    error: state.roles.error
  };
  console.log("roles kiran1 ", dd);
  return dd;
};
const mapDispatchToProps = dispatch => {
  const dd = {
    listRoles: () => dispatch(actions.fetchRoles()),
    deleteRole: id => dispatch(actions.deleteRole(id))
  };
  console.log("roles kiran2 ", dd);

  return dd;
}; /* 
export default withAuthorization(
  connect(mapStateToProps, mapDispatchToProps)(RoleListContainer)
); */
export default connect(mapStateToProps, mapDispatchToProps)(RoleListContainer);
