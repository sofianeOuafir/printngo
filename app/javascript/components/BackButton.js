import React from "react";
import { withRouter, Link } from "react-router-dom";

const BackButton = props => (
  <Link
    to="#"
    onClick={e => {
      e.preventDefault();
      props.history.goBack();
    }}
    className="button button--navy"
  >
    &larr; Back
  </Link>
);

export default withRouter(BackButton);
