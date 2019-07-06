import { USER_UPDATE, USER_CREATE, USER_SAVE_SUCCESS } from "../actions/types";

const INITIAL_STATE = {
  name: "",
  phone: "",
  password1: "",
  password2: "",
  status: "",
  email: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_UPDATE:
      // action.payload === {prop: "name", value: "jane"}
      return { ...state, [action.payload.prop]: action.payload.value };
    case USER_CREATE:
      return INITIAL_STATE;
    case USER_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
