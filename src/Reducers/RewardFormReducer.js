import {
  REWARD_UPDATE,
  REWARD_CREATE,
  REWARD_SAVE_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
  rewardName: "",
  description: "",
  pointsValue: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REWARD_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case REWARD_CREATE:
      return INITIAL_STATE;
    case REWARD_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
