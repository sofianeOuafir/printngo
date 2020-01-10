import React from "react";
import pluralize from "pluralize";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import {
  startUpdatePartnerOrder,
  startSetPartnerOrders
} from "./../actions/orders";
import { startAddPrintingAttempt } from "./../actions/printingAttempts";
import ReportIssue from "./ReportIssue";
import OrderStatus from "./OrderStatus";

class PartnerOrder extends React.Component {
  onMarkAsPrinted = () => {
    const {
      startUpdatePartnerOrder,
      startSetPartnerOrders,
      order,
      t
    } = this.props;
    startUpdatePartnerOrder({ secretCode: order.secret_code })
      .then(() => {
        return startSetPartnerOrders();
      })
      .then(() => {
        toast.success(t("partnerOrder.confirmationSuccess"), {
          position: toast.POSITION.BOTTOM_LEFT
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
    const { order, readOnly = false, t } = this.props;
    const { user, deliverables } = order;
    return (
      <div className="mb1">
        {order.awaiting_confirmation && (
          <p className="h5 text-orange m0 mb1">
            <strong>{t("partnerOrder.important")}</strong>
          </p>
        )}
        <div className="px1 border border--thick border-color--grey">
          <div className="flex align-items--center justify-content--between">
            <h2 className="h4 m0 py1 favourite-font-weight text-navy">
              {user.fullname} - {t("partnerOrder.order")} #{order.id}
            </h2>

            <OrderStatus
              printable={order}
              onMarkAsPrinted={this.onMarkAsPrinted}
            />
          </div>
          <div className="mb1">
            <ReportIssue className="report-issue text-leaf" order={order} />
          </div>
        </div>

        {deliverables.map(deliverable => {
          const { id } = deliverable;
          return (
            <div
              key={id}
              className="p1 flex align-items--center justify-content--between border border-top--none border-color--grey"
            >
              {!order.printer_id && !readOnly && (
                <iframe
                  className="hide"
                  id={`deliverable${id}`}
                  src={`/api/v1/partners/deliverables/${id}`}
                  name={`deliverable${id}`}
                ></iframe>
              )}
              <div className="flex align-items--center">
                <span className="h5 text-navy mr1">
                  {t(`${deliverable.print_product.code}.name`)} (
                  {pluralize(
                    `${deliverable.number_of_page} page`,
                    deliverable.number_of_page
                  )}
                  )
                </span>
                <OrderStatus printable={deliverable} />
              </div>
              <div>
                {!order.printer_id && !readOnly && (
                  <button
                    onClick={() => this.onPrintClick(id)}
                    className="my1 button button--navy"
                  >
                    {t("partnerOrder.print")}
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
)(withTranslation()(PartnerOrder));
