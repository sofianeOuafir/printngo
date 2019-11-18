import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

import images from "./../images";
import { getDateTimeFormat } from "../lib/date";
import { startAddOrderItem } from "./../actions/orderItems";

class Document extends React.Component {
  onViewClick(id) {
    axios.get(`/api/v1/documents/${id}`).then(response => {
      var win = window.open(response.data.url, "_blank");
      win.focus();
    });
  }

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
    const { name, created_at, id } = this.props.document;

    return (
      <div className="document h5 flex align-items--center justify-content--between border border-color--grey p2 mb1">
        <div className="view-action center">
          <a onClick={() => this.onViewClick(id)} className="pointer">
            <img src={images.pdf} alt="Document Icon" width={40} />
            <span className="pointer mt1 block"> View </span>
          </a>
        </div>
        <div style={{ width: "100px" }} className="name word-wrap--break-word">
          <span title={name}>
            {name.length > 30 ? `${name.substring(0, 30)}...` : name}
          </span>
        </div>
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
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddOrderItem: document_id => dispatch(startAddOrderItem(document_id))
});

export default connect(null, mapDispatchToProps)(Document);
