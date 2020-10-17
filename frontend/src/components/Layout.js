import React, { PropTypes } from "react";
import Header from "./common/Header";
// import Footer from './common/Footer';

/**
 *
 *
 * @class Layout
 * @extends {React.Component}
 */
export class Layout extends React.Component {
  /**
   *
   *
   * @returns  contains JSX code
   *
   * @memberof Layout
   */
  render() {
    return (
      <>
        <Header />
        Kiran{this.props.children}Babu
        {/* <Footer />*/}
      <>
    );
  }
}

export default Layout;
