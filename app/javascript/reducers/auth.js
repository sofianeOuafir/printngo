const authReducerDefaultState = {};

const authReducer = (state = authReducerDefaultState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        authenticated: true,
        ...action.user
      };
    case "UPDATE_WALLET_BALANCE": {
      return {
        ...state,
        wallet_balance: action.walletBalance
      };
    }
    case "LOGOUT":
      return {
        authenticated: false
      };
    default:
      return state;
  }
};

export default authReducer;
