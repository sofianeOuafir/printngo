import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import ReactHtmlParser from "react-html-parser";

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
    const { order, t } = this.props;
    return (
      <div className="content-container flex flex-direction--column fullscreen align-items--center justify-content--center">
        <div className="fullwidth">
          <div className="mb1">
            <PartnerSearchBar
              secretCode={secretCode}
              onChange={this.onSecretCodeChange}
              onSubmit={this.onSubmit}
            />
          </div>

          {order.id && !displayError && <PartnerOrder order={order} />}
          {displayError && (
            <div className="text-leaf h5 ">
              {ReactHtmlParser(
                t("partnerOrderPage.orderNotFound", { secretCode })
              )}
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
)(withRouter(withTranslation()(PartnerOrderPage)));
