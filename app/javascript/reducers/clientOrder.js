const clientOrderReducerDefaultState = {};

const clientOrderReducer = (state = clientOrderReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_CLIENT_ORDER":
      return {
        ...action.order
      }
    default:
      return state;
  }
};

export default clientOrderReducer;
