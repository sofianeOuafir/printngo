import axios from "axios";

import { setPartnerOrder } from "./../actions/orders";

const addPrintingAttempt = printingAttempt => dispatch => {
  dispatch({
    type: "ADD_PRINTING_ATTEMPT",
    printingAttempt
  });
};

export const startAddPrintingAttempt = ({
  secretCode,
  deliverableId
}) => dispatch => {
  return axios
    .post("/api/v1/partners/printing_attempts", {
      id: deliverableId,
      secret_code: secretCode
    })
    .then(response => {
      dispatch(addPrintingAttempt(response.data));
      dispatch(setPartnerOrder(response.data.print_order));
      return response;
    });
};
