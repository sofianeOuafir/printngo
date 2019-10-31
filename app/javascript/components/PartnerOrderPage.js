import React from "react";
import { withRouter } from "react-router-dom";
import pluralize from "pluralize";

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

  onPrintClick = deliverableId => {
    const id = `deliverable${deliverableId}`;
    window.frames[id].focus();
    window.frames[id].print();
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

            {order.id && !displayError && (
              <div className="mt1">
                <div className="flex pl1 bg-navy">
                  <h2 className="h4 favourite-font-weight text-white">
                    {user.fullname} - Order #{order.id}
                  </h2>
                </div>
                {deliverables.map((deliverable) => {
                  const { id } = deliverable;
                  return (
                    <div
                      key={id}
                      className="px1 flex align-items--center justify-content--between border border-color--grey"
                    >
                      <iframe
                        className="hide"
                        id={`deliverable${id}`}
                        src={`/api/v1/partners/deliverables/${id}`}
                        name={`deliverable${id}`}
                      ></iframe>
                      <div>
                        <span className="h5 text-navy">
                          {deliverable.product.name} (
                          {pluralize(
                            `${deliverable.number_of_page} page`,
                            deliverable.number_of_page
                          )}
                          )
                        </span>
                      </div>
                      <div>
                        <button
                          onClick={() => this.onPrintClick(id)}
                          className="my1 button button--navy"
                        >
                          Print
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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
