const orderItemsReducerDefaultState = [];

const orderItemsReducer = (state = orderItemsReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_ORDER_ITEMS":
      return [
        ...action.orderItems
      ];
    default:
      return state;
  }
};

export default orderItemsReducer;
