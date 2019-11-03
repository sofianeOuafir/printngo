import React from "react";
import { connect } from "react-redux";

import Partner from "./Partner";

const PartnerLocationPage = ({ auth }) => {
  return (
    <div className="content-container">
      <h1 className="h4 text-navy favourite-font-weight">My Location</h1>
      <Partner partner={auth} />
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps)(PartnerLocationPage);
