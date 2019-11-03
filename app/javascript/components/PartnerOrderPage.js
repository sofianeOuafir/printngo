import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import PartnerSearchBar from "./PartnerSearchBar";
import { startSetPartnerOrder, setPartnerOrder } from "./../actions/orders";
import PartnerOrder from "./PartnerOrder";

class PartnerOrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secretCode: props.match.params.secretCode,
      displayError: false
    };
  }

  componentDidMount() {
    this.startSearch();
  }

  startSearch = () => {
    const { startSetPartnerOrder, setPartnerOrder } = this.props;
    this.setState({ displayError: false }, () => {
      startSetPartnerOrder(this.state.secretCode).catch(() => {
        this.setState(() => ({ displayError: true }));
        setPartnerOrder({});
      });
    });
  };

  onSecretCodeChange = e => {
    if (this.state.displayError === true) {
      this.setState(() => ({ displayError: false }));
    }
    let secretCode = e.target.value;
    if (secretCode) {
      secretCode = secretCode.toUpperCase().trim();
    }
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
    const { secretCode, displayError } = this.state;
    const { order } = this.props;
    return (
      <div className="content-container flex flex-direction--column fullscreen align-items--center justify-content--center">
        <div className="halfwidth">
          <div className="mb1">
            <PartnerSearchBar
              secretCode={secretCode}
              onChange={this.onSecretCodeChange}
              onSubmit={this.onSubmit}
            />
          </div>

          {order.id && !displayError && <PartnerOrder order={order} />}
          {displayError && (
            <div className="text-pink h5">
              <p>
                We couldn't find any order corresponding with the following
                secret code: <strong>{secretCode}</strong>. <br />
                Possible reasons:
              </p>
              <ul>
                <li>The spelling is wrong.</li>
                <li>The order has already been printed.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ partnerOrder }) => ({
  order: partnerOrder
});

const mapDispatchToProps = dispatch => ({
  startSetPartnerOrder: secretCode =>
    dispatch(startSetPartnerOrder(secretCode)),
  setPartnerOrder: order => dispatch(setPartnerOrder(order))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PartnerOrderPage));
