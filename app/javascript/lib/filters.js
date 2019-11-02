export const awaitingConfirmationOrders = orders => {
  return orders.filter(order => order.awaiting_confirmation === true);
};

export const printedOrders = orders => {
  return orders.filter(order => order.printer_id !== null);
};
