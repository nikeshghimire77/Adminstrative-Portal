import React from "react";
import { Link } from "react-router-dom";
export default class FilterForm extends React.Component {
  onAdd() {
    this.props.history.push(`/user`);
  }

  handleFilterChange(e) {
    this.props.OnFilter(e.target.value);
  }

  render() {
    return (
      <form>
        <div className="col-md-2">
          <Link to="/user" className="btn btn-primary">
            <span className="fa fa-plus" aria-hidden="true"></span>
          </Link>
        </div>
      </form>
    );
  }
}
