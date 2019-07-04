import { USER_FETCH_SUCCESS } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  console.log("entered user fetch success", action.payload);
  switch (action.type) {
    case USER_FETCH_SUCCESS:
      console.log("action type: ", action.type);

      return action.payload;
    default:
      return state;
  }
};
