import {
  CHORE_UPDATE,
  CHORE_CREATE,
  CHORE_SAVE_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
  choreName: "",
  description: "",
  day: "Daily",
  child: "",
  pointsValue: "",
  isRecurring: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHORE_UPDATE:
      console.log("inside chore_update choreform reducer");
      console.log("action.payload: ", action.payload);
      return { ...state, [action.payload.prop]: action.payload.value };
    case CHORE_CREATE:
      return INITIAL_STATE;
    case CHORE_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
