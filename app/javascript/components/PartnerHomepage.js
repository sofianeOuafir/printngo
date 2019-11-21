import React from "react";
import { withRouter } from "react-router-dom";

import PartnerSeachBar from "./PartnerSearchBar";

class PartnerHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secretCode: ""
    };
  }

  onSecretCodeChange = e => {
    const secretCode = e.target.value;
    this.setState(() => ({ secretCode }));
  };

  onSubmit = e => {
    e.preventDefault();
    const { secretCode } = this.state;
    const { history } = this.props;
    if (secretCode) {
      history.push(`/partner/order/${secretCode}`);
    }
  };

  render() {
    const { secretCode } = this.state;
    return (
      <div className="content-container flex flex-direction--column fullscreen align-items--center justify-content--center">
        <div className="fullwidth">
          <PartnerSeachBar
            secretCode={secretCode}
            onSubmit={this.onSubmit}
            onChange={this.onSecretCodeChange}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(PartnerHomePage);
