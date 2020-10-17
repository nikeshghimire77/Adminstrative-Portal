import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";

const LinkList = ({ links, onDelete }) => {
  return !links.length ? (
    <p className="alert alert-warning text-center">No Links found.</p>
  ) : (
    <div className="ticket-container">
      <Table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Url</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {links.map(link => (
            <tr key={link._id}>
              <td>{link.name}</td>
              <td>{link.url}</td>
              <td>
                <Link to={`/link/${link._id}`} className="btn btn-primary">
                  <span className="fa fa-pencil" aria-hidden="true"></span>
                </Link>
                &nbsp;&nbsp;
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onDelete(link._id)}
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
LinkList.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  roles: PropTypes.string,
  onDelete: PropTypes.func
};

export default LinkList;
