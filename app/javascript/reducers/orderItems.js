const orderItemsReducerDefaultState = [];

const orderItemsReducer = (state = orderItemsReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_ORDER_ITEMS":
      return [
        ...action.orderItems
      ];
    case "ADD_ORDER_ITEM":
      return [
        ...state,
        action.orderItem
      ]
    case "REMOVE_ORDER_ITEM":
    return [
      ...state.filter((orderItem) => {
        return orderItem.id !== action.orderItemId
      })
    ]
    case "UPDATE_ORDER_ITEM": 
    return [
      ...state.map((orderItem) => {
        if(orderItem.id === action.id) {
          return {
            ...orderItem,
            ...action.updates
          };
        } else {
          return orderItem;
        }
      })
    ]
    default:
      return state;
  }
};

export default orderItemsReducer;
