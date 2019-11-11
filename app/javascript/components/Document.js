import React from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

import images from './../images';
import { getDateTimeFormat } from '../lib/date';
import { startAddOrderItem } from './../actions/orderItems';


class Document extends React.Component {
  onViewClick(id) {
    axios.get(`/api/v1/documents/${id}`).then((response) => {
      var win = window.open(response.data.url, '_blank');
      win.focus();
    })
  }

  onAddToBasket({ e, id: documentId }) {
    e.preventDefault();
    const { startAddOrderItem } = this.props;
    startAddOrderItem(documentId).then(() => {
      toast.success("Added to basket successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    })
  }

  render () {
    const { name, created_at, id } = this.props.document;

    return (
      <div className="h5 flex align-items--center justify-content--between border border-color--grey p2 mb1">
        <div className="center">
          <div>
            <img src={images.aDocument} alt="Document Icon" width={40}/>
          </div>
          <div>
            <a onClick={() => this.onViewClick(id)} className="pointer">View</a>
          </div>
        </div>
        <div style={{ width: '100px'}} className="word-wrap--break-word">
          <span title={name}>{name.length > 30 ? `${name.substring(0, 30)}...` : name}</span>
        </div>
        <div>
          <span>{getDateTimeFormat(created_at)}</span>
        </div>
        <div>
          <a to="/" onClick={(e) => this.onAddToBasket({ e, id })} className="button button--navy">Add To Basket</a>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddOrderItem: (document_id) => dispatch(startAddOrderItem(document_id))
})

export default connect(null, mapDispatchToProps)(Document);
