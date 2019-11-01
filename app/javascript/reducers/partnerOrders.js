const partnerOrdersReducerDefaultState = [];

const partnerOrdersReducer = (state = partnerOrdersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_PARTNER_ORDERS":
      return [
        ...action.partnerOrders
      ]
    default:
      return state;
  }
};

export default partnerOrdersReducer;
