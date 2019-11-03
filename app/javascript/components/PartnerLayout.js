import React, { Fragment } from "react";
import ScrollUpButton from "react-scroll-up-button";
import { Helmet } from "react-helmet";

import PartnerNavBar from "./PartnerNavBar";

class PartnerLayout extends React.Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Print N' Go - {this.props.title}</title>
        </Helmet>
        <PartnerNavBar />
        {this.props.children}
        <ScrollUpButton />
      </Fragment>
    );
  }
}

export default PartnerLayout;
