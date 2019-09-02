import {
  REWARD_REQUESTS_FETCH_SUCCESS,
  REWARD_REQUEST_UPDATE,
  REWARD_REQUEST_CREATE,
  REWARD_REQUEST_SAVE_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REWARD_REQUESTS_FETCH_SUCCESS:
      return action.payload;
    case REWARD_REQUEST_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case REWARD_REQUEST_CREATE:
      return INITIAL_STATE;
    case REWARD_REQUEST_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
