const clientCurrentOrderReducerDefaultState = {};

const clientCurrentOrderReducer = (state = clientCurrentOrderReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_CLIENT_CURRENT_ORDER":
      return {
        ...action.order
      }
    case "UPDATE_CLIENT_CURRENT_ORDER": 
      return {
        ...state,
        ...action.updates
      }
    default:
      return state;
  }
};

export default clientCurrentOrderReducer;
