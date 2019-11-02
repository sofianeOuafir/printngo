import React from "react";
import pluralize from "pluralize";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import {
  startUpdatePartnerOrder,
  startSetPartnerOrders
} from "./../actions/orders";
import { startAddPrintingAttempt } from "./../actions/printingAttempts";

class PartnerOrder extends React.Component {
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
      order
    } = this.props;
    startUpdatePartnerOrder({ secretCode: order.secret_code })
      .then(() => {
        return startSetPartnerOrders();
      })
      .then(() => {
        toast.success("Thank you for confirming!", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      });
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
  render() {
    const { order, readOnly = false } = this.props;
    const { user, deliverables } = order;
    return (
      <div className="mb1">
        {this.allDeliverableWithPrintAttempts() && !order.printer_id && (
          <p className="h6 text-orange m0 mb1">
            <strong>
              IMPORTANT: Please remember to mark the order as printed once the
              documents get delivered to the client. It allows us to have
              confirmation that everything went well and help us making sure you
              get paid for the service provided.
            </strong>
          </p>
        )}
        <div className="flex px1 border border-color--navy align-items--center justify-content--between">
          <h2 className="h4 favourite-font-weight text-navy">
            {user.fullname} - Order #{order.id}
          </h2>

          {!order.printer_id ? (
            this.allDeliverableWithPrintAttempts() && (
              <button
                onClick={this.onMarkAsPrinted}
                className="button button--orange button--no-border-radius my1"
              >
                Mark as printed
              </button>
            )
          ) : (
            <button className="button button--navy button--no-border-radius">Printed</button>
          )}
        </div>
        {deliverables.map(deliverable => {
          const { id } = deliverable;
          return (
            <div
              key={id}
              className="p1 flex align-items--center justify-content--between border border-color--navy"
            >
              {!order.printer_id && !readOnly && (
                <iframe
                  className="hide"
                  id={`deliverable${id}`}
                  src={`/api/v1/partners/deliverables/${id}`}
                  name={`deliverable${id}`}
                ></iframe>
              )}
              <div>
                <span className="h5 text-navy mr1">
                  {deliverable.product.name} (
                  {pluralize(
                    `${deliverable.number_of_page} page`,
                    deliverable.number_of_page
                  )}
                  )
                </span>
                {order.printer_id ? (
                  <span>Printed!</span>
                ) : deliverable.printing_attempts.length > 0 ? (
                  <span>Print attempted</span>
                ) : (
                  <span>Ready to print</span>
                )}
              </div>
              <div>
                {!order.printer_id && !readOnly && (
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
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddPrintingAttempt: ({ secretCode, deliverableId }) =>
    dispatch(startAddPrintingAttempt({ secretCode, deliverableId })),
  startUpdatePartnerOrder: ({ secretCode, updates = {} }) =>
    dispatch(startUpdatePartnerOrder({ secretCode, updates })),
  startSetPartnerOrders: () => dispatch(startSetPartnerOrders())
});

export default connect(
  null,
  mapDispatchToProps
)(PartnerOrder);
