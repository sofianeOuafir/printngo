import React from "react";
import { withRouter } from "react-router-dom";

import PartnerLayout from "./PartnerLayout";
import PartnerSearchBar from "./PartnerSearchBar";
import { startSetPartnerOrder, setPartnerOrder } from "./../actions/orders";
import { connect } from "react-redux";

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
    startSetPartnerOrder(this.state.secretCode).catch(() => {
      this.setState(() => ({ displayError: true }));
      setPartnerOrder({});
    });
  };

  onSecretCodeChange = e => {
    if (this.state.displayError === true) {
      this.setState(() => ({ displayError: false }));
    }
    const secretCode = e.target.value;
    this.setState(() => ({ secretCode }));
  };

  onPrintClick = (e) => {
    e.preventDefault()
    // do something

  }

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
    const { user, deliverables } = order;
    return (
      <PartnerLayout>
        <div className="content-container flex flex-direction--column fullscreen align-items--center justify-content--center">
          <div className="halfwidth">
            <PartnerSearchBar
              secretCode={secretCode}
              onChange={this.onSecretCodeChange}
              onSubmit={this.onSubmit}
            />

            {order.id && !displayError && <div>
              <div className="border">
                <span>{ user.fullname} - Order #{ order.id }</span>
              </div>
              { deliverables.map((deliverable) => (
                <div className="flex align-items--center justify-content--between border">
                  <div>
                    <span>{deliverable.product.name} - Number of Page {deliverable.number_of_page}</span>
                  </div>
                  <div>
                    <button onClick={this.onPrintClick} className="button button--navy">Print</button>
                  </div>
                </div>
              )) }

            </div>}
            {displayError && (
              <div className="text-pink h5">
                <p>
                  We couldn't find any order corresponding order with the
                  following secret code: <strong>{secretCode}</strong>. <br />
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
      </PartnerLayout>
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
