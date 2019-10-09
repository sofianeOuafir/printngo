const clientOrdersReducerDefaultState = [];

const clientOrdersReducer = (state = clientOrdersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_CLIENT_ORDERS":
      return [
        ...action.clientOrders
      ]
    default:
      return state;
  }
};

export default clientOrdersReducer;
