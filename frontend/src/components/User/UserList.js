import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";

const UserList = ({ users, roles, onDelete }) => {
  return !users.length ? (
    <p className="alert alert-warning text-center">No Users found.</p>
  ) : (
    <div className="ticket-container">
      <Table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Roles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.username}</td>
              <td>
                {roles.map((item, i) => {
                  if (user.roles.includes(item._id)) {
                    return item.name;
                  }
                })}
              </td>

              <td>
                <Link to={`/user/${user._id}`} className="btn btn-primary">
                  <span className="fa fa-pencil" aria-hidden="true"></span>
                </Link>
                &nbsp;&nbsp;
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onDelete(user._id)}
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
UserList.propTypes = {
  _id: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  string: PropTypes.string,
  onDelete: PropTypes.func
};

export default UserList;
