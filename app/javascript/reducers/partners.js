const partnersReducerDefaultState = [];

const partnersReducer = (state = partnersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_PARTNERS":
      return [
        ...action.partners
      ];
    default:
      return state;
  }
};

export default partnersReducer;
