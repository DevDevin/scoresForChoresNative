import { REWARD_FETCH_SUCCESS } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  console.log("action type: ", action.type);
  switch (action.type) {
    case REWARD_FETCH_SUCCESS:
      console.log("entered reward fetch success");
      console.log("payload: ", action.payload);
      return action.payload;
    default:
      return state;
  }
};
