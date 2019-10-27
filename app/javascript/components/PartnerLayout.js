import React, { Fragment } from "react"
import ScrollUpButton from "react-scroll-up-button";

import PartnerNavBar from './PartnerNavBar';

class PartnerLayout extends React.Component {
  render () {
    return (
      <Fragment>
        <PartnerNavBar />
        { this.props.children }
        <ScrollUpButton />
      </Fragment>
    );
  }
}

export default PartnerLayout
