import { REWARD_FETCH_SUCCESS } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  console.log("payload reward reducer: ", action.payload);
  switch (action.type) {
    case REWARD_FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
