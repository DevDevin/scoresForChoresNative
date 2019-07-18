import {
  CHORE_UPDATE,
  CHORE_CREATE,
  CHORE_SAVE_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
  choreName: "",
  description: "",
  day: "",
  child: "",
  pointsValue: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHORE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case CHORE_CREATE:
      return INITIAL_STATE;
    case CHORE_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
