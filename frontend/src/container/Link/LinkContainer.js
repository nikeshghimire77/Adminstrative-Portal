import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../../store/actions/index";

import { Redirect } from "react-router-dom";
import LinkForm from "../../components/Link/LinkForm";

class LinkContainer extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
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
        <LinkForm link={this.props.link} onSave={this.save} />
      </div>
    );
  }

  save(link) {
    if (!this.props.match.params.id) {
      this.props.saveLink(link);
    } else {
      this.props.updateLink(link);
    }
  }

  componentDidMount = () => {
    if (this.props.match.params.id) {
      this.props.getLinkById(this.props.match.params.id);
    }
  };
}

const mapDispatchToProps = dispatch => ({
  saveLink: link => dispatch(actions.createLink(link)),
  updateLink: link => dispatch(actions.updateLink(link)),
  newLink: () => dispatch(actions.newLink()),
  getLinkById: id => dispatch(actions.fetchLink(id))
});

const mapStateToProps = state => {
  const res = {
    loading: state.links.loading,
    saved: state.links.saved,
    error: state.links.error,
    link: state.links.newInsertedLinks,
    loggedLink: state.auth.link
  };
  return res;
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkContainer);
