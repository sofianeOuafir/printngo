const partnerOrderReducerDefaultState = {};

const partnerOrderReducer = (state = partnerOrderReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_PARTNER_ORDER":
      return {
        ...action.order
      }
    default:
      return state;
  }
};

export default partnerOrderReducer;
