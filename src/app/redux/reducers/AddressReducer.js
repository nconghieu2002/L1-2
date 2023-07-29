import provincesActions from "../actions/AddressActions";

const AddressReducer = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_PRODUCT":
      return action.payload;
    default:
      return state;
  }
};

export default AddressReducer;
