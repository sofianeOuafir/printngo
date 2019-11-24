import React from "react";
import Navbar from "./Navbar";
import ScrollUpButton from "react-scroll-up-button";
import { Helmet } from "react-helmet";

class Layout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Print N' Go - {this.props.title}</title>
        </Helmet>
        <Navbar />
        {this.props.children}
        <ScrollUpButton ToggledStyle={{ left: 30 }} />
      </React.Fragment>
    );
  }
}

export default Layout;
