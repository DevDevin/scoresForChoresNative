import { LOADING_USERS_START, LOADING_USERS_END } from "../actions/types";

const INITIAL_STATE = { loading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING_USERS_START:
      return { loading: true };
    case LOADING_USERS_END:
      return { loading: false };
    default:
      return state;
  }
};
