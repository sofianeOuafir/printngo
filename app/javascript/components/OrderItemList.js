import React from "react"
import pluralize from 'pluralize';
import OrderItem from './OrderItem';

import UploadAndPrintButton from './UploadAndPrintButton';
import { fromCentsToDollars } from './../utils/money';

class OrderItemList extends React.Component {
  render () {
    const { order, orderItems, readOnly = false } = this.props;
    let { sub_total, tax_amount, total, number_of_items } = order;
    sub_total = fromCentsToDollars(sub_total);
    tax_amount = fromCentsToDollars(tax_amount);
    total = fromCentsToDollars(total);

    return (
      <React.Fragment>
        { orderItems.length ? orderItems.map((orderItem, index) => (
          <OrderItem key={index} orderItem={orderItem} readOnly={readOnly} />
        )) : (
          <p className="h5">You basket is currently empty.</p>
        ) }
        <div className={`flex ${readOnly ? 'justify-content--end' : 'justify-content--between' }  h5`}>
          {!readOnly && <div>
            <UploadAndPrintButton className="button button--navy" text="Upload Documents" />
          </div>}
          <div className={`flex flex-direction--column`}>
            <div className="flex justify-content--between">
              <span className="mr1">Subtotal ({number_of_items} {`${pluralize('Item', number_of_items)}`})</span>
              <span> { `${sub_total}` }</span>
            </div>
            <div className="flex justify-content--between">
              <span className="mr1">Taxes</span>
              <span>{ `${tax_amount}`}</span>
            </div>
            <div className="flex justify-content--between">
              <span>Total</span>
              <span>{ `${total}`}</span>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default OrderItemList;
