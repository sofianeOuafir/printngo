import React from "react";
import { connect } from "react-redux";

import DocumentShowPage from "./DocumentShowPage";

const PartnerContractPage = ({ contractUrl }) => (
  <DocumentShowPage url={contractUrl} />
);

const mapStateToProps = ({ auth }) => ({
  contractUrl: auth.contract_url
});

export default connect(mapStateToProps)(PartnerContractPage);
