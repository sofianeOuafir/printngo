import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { getDateTimeFormat } from "../lib/date";
import { startAddOrderItem } from "../actions/orderItems";
import Document from "./Document";

class DocumentItem extends React.Component {
  onAddToBasket({ e, id: documentId }) {
    e.preventDefault();
    const { startAddOrderItem } = this.props;
    startAddOrderItem(documentId).then(() => {
      toast.success("Added to basket successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    });
  }

  render() {
    const { name, created_at, id, number_of_page } = this.props.document;

    return (
      <div className="document-item h5 flex align-items--center border border-color--grey p2 mb1">
        <div className="col-5">
          <Document name={name} numberOfPage={number_of_page} id={id} />
        </div>
        <div className="flex justify-content--between col-7 fullwidth align-items--center">
          <div className="created-at">
            <span>{getDateTimeFormat(created_at)}</span>
          </div>
          <div className="add-button">
            <a
              to="/"
              onClick={e => this.onAddToBasket({ e, id })}
              className="button button--navy"
            >
              Add <span>To Basket</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddOrderItem: document_id => dispatch(startAddOrderItem(document_id))
});

export default connect(null, mapDispatchToProps)(DocumentItem);
