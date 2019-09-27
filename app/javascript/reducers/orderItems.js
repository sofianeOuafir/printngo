const orderItemsReducerDefaultState = [];

const orderItemsReducer = (state = orderItemsReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_ORDER_ITEMS":
      return [
        ...action.orderItems
      ];
    case "REMOVE_ORDER_ITEM":
    console.log(state);
    return [
      ...state.filter((orderItem) => {
        return orderItem.id !== action.orderItemId
      })
    ]
      console.log(action.orderItemId);
    default:
      return state;
  }
};

export default orderItemsReducer;
