import React from "react";
import CustomerNavbar from "./CustomerNavbar";
import ScrollUpButton from "react-scroll-up-button";
import { Helmet } from "react-helmet";

class Layout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Print and Go - {this.props.title}</title>
        </Helmet>
        <CustomerNavbar />
        {this.props.children}
        <ScrollUpButton ToggledStyle={{ left: 30 }} />
      </React.Fragment>
    );
  }
}

export default Layout;
