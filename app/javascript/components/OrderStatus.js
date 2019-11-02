import React from 'react';

import PrintedElement from './PrintedElement';
import PrintingAttemptedElement from './PrintingAttemptedElement';
import ReadyToPrintElement from './ReadyToPrintElement';

const OrderStatus = ({order}) => {
  if (order.printer_id) {
    return <PrintedElement />;
  } else {
    return order.awaiting_confirmation ? (
      <PrintingAttemptedElement />
    ) : (
      <ReadyToPrintElement />
    );
  }
}

export default OrderStatus