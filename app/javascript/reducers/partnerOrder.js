const partnerOrderReducerDefaultState = {};

const partnerOrderReducer = (
  state = partnerOrderReducerDefaultState,
  action
) => {
  switch (action.type) {
    case "SET_PARTNER_ORDER":
      return {
        ...action.order
      };
    case "UPDATE_PARTNER_ORDER":
      return {
        ...state,
        ...action.updates
      };
    case "ADD_PRINTING_ATTEMPT":
      return {
        ...state,
        deliverables: state.deliverables.map(deliverable => {
          if (deliverable.id === action.printingAttempt.deliverable_id) {
            deliverable.printing_attempts = [
              ...deliverable.printing_attempts,
              action.printingAttempt
            ];
          }

          return deliverable;
        })
      };
    default:
      return state;
  }
};

export default partnerOrderReducer;
