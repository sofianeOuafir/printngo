import React from "react";
import { withRouter } from "react-router-dom";
import pluralize from "pluralize";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import PartnerLayout from "./PartnerLayout";
import PartnerSearchBar from "./PartnerSearchBar";
import {
  startSetPartnerOrder,
  setPartnerOrder,
  startUpdatePartnerOrder,
  startSetPartnerOrders
} from "./../actions/orders";
import { startAddPrintingAttempt } from "./../actions/printingAttempts";

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

  onPrintClick = deliverableId => {
    const {
      startAddPrintingAttempt,
      order,
      startSetPartnerOrders
    } = this.props;
    startAddPrintingAttempt({
      secretCode: order.secret_code,
      deliverableId
    })
      .then(() => {
        return startSetPartnerOrders();
      })
      .then(() => {
        const id = `deliverable${deliverableId}`;
        window.frames[id].focus();
        window.frames[id].print();
      });
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

  allDeliverableWithPrintAttempts = () => {
    const { order } = this.props;
    return (
      order.deliverables.length ===
      order.deliverables.filter(
        deliverable => deliverable.printing_attempts.length > 0
      ).length
    );
  };

  onMarkAsPrinted = () => {
    const {
      startUpdatePartnerOrder,
      startSetPartnerOrders,
      order,
      history
    } = this.props;
    startUpdatePartnerOrder({ secretCode: order.secret_code })
      .then(() => {
        return startSetPartnerOrders();
      })
      .then(() => {
        history.push("/partner");
        toast.success("Thank you for confirming!", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      });
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
                {this.allDeliverableWithPrintAttempts() &&
                  !order.printer_id && (
                    <p className="text-orange">
                      IMPORTANT: Please remember to mark the order as printed
                      once the documents get delivered to the client. This
                      allows us to have confirmation that everything went well
                      and helps us making sure you get paid for the service
                      provided.
                    </p>
                  )}
                <div className="flex pl1 bg-navy">
                  <h2 className="h4 favourite-font-weight text-white">
                    {user.fullname} - Order #{order.id}
                  </h2>

                  {!order.printer_id ? (
                    this.allDeliverableWithPrintAttempts() && (
                      <button
                        onClick={this.onMarkAsPrinted}
                        className="button button--orange"
                      >
                        Mark as printed
                      </button>
                    )
                  ) : (
                    <button className="button button--navy">Printed</button>
                  )}
                </div>
                {deliverables.map(deliverable => {
                  const { id } = deliverable;
                  return (
                    <div
                      key={id}
                      className="px1 flex align-items--center justify-content--between border border-color--grey"
                    >
                      {!order.printer_id && (
                        <iframe
                          className="hide"
                          id={`deliverable${id}`}
                          src={`/api/v1/partners/deliverables/${id}`}
                          name={`deliverable${id}`}
                        ></iframe>
                      )}
                      <div>
                        <span className="h5 text-navy">
                          {deliverable.product.name} (
                          {pluralize(
                            `${deliverable.number_of_page} page`,
                            deliverable.number_of_page
                          )}
                          )
                        </span>
                        {order.printer_id ? (
                          <p>Printed!</p>
                        ) : deliverable.printing_attempts.length > 0 ? (
                          <p>Print attempted</p>
                        ) : (
                          <p>Ready to print</p>
                        )}
                      </div>
                      <div>
                        {!order.printer_id && (
                          <button
                            onClick={() => this.onPrintClick(id)}
                            className="my1 button button--navy"
                          >
                            Print
                          </button>
                        )}
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
  setPartnerOrder: order => dispatch(setPartnerOrder(order)),
  startAddPrintingAttempt: ({ secretCode, deliverableId }) =>
    dispatch(startAddPrintingAttempt({ secretCode, deliverableId })),
  startUpdatePartnerOrder: ({ secretCode, updates = {} }) =>
    dispatch(startUpdatePartnerOrder({ secretCode, updates })),
  startSetPartnerOrders: () => dispatch(startSetPartnerOrders())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PartnerOrderPage));
