import React from "react";
import { withRouter } from "react-router-dom";

import PartnerLayout from "./PartnerLayout";
import PartnerSearchBar from "./PartnerSearchBar";
import { startSetPartnerOrder } from "./../actions/orders";
import { connect } from "react-redux";

class PartnerOrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secretCode: props.match.params.secretCode
    };
  }

  componentDidMount() {
    this.startSearch();
  }

  startSearch = () => {
    const { startSetPartnerOrder } = this.props;
    startSetPartnerOrder(this.state.secretCode).then(response => {
      console.log(response);
    });
  };

  onSecretCodeChange = e => {
    const secretCode = e.target.value;
    this.setState(() => ({ secretCode }));
  };

  onSubmit = e => {
    e.preventDefault();
    const { secretCode } = this.state;
    const { history } = this.props;
    if (secretCode) {
      this.startSearch();
      history.push(`/partner/order/${secretCode}`);
    }
  };
  render() {
    const { secretCode } = this.state;
    const { partnerOrder } = this.props;
    return (
      <PartnerLayout>
        <PartnerSearchBar
          secretCode={secretCode}
          onChange={this.onSecretCodeChange}
          onSubmit={this.onSubmit}
        />
        { partnerOrder.id ? (
          <p>display infos</p>
        ) : (
          <p>error</p>
        ) }
      </PartnerLayout>
    );
  }
}

const mapStateToProps = ({ partnerOrder }) => ({
  partnerOrder
});

const mapDispatchToProps = dispatch => ({
  startSetPartnerOrder: secretCode => dispatch(startSetPartnerOrder(secretCode))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PartnerOrderPage));
