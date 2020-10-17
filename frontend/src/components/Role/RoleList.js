import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";

const RoleList = ({ roles, onDelete }) => {
  console.log("kiran roles =", roles);

  return !roles.length ? (
    <p className="alert alert-warning text-center">No Roles found.</p>
  ) : (
    <div className="ticket-container">
      <Table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role._id}>
              <td>{role.name}</td>
              <td>{role.description}</td>
              <td>
                <Link to={`/role/${role._id}`} className="btn btn-primary">
                  <span className="fa fa-pencil" aria-hidden="true"></span>
                </Link>
                &nbsp;&nbsp;
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onDelete(role._id)}
                >
                  <span className="fa fa-remove" aria-hidden="true"></span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
RoleList.propTypes = {
  _id: PropTypes.string,
  rolename: PropTypes.string,
  password: PropTypes.string,
  string: PropTypes.string,
  onDelete: PropTypes.func
};

export default RoleList;
