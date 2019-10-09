const documentsReducerDefaultState = [];

const documentsReducer = (state = documentsReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_DOCUMENTS":
      return [
        ...action.documents
      ]
    default:
      return state;
  }
};

export default documentsReducer;
