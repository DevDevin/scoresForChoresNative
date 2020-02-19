import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  PASSWORD2_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SET_ACTIVE_USER,
  PASSWORD_MISMATCH,
  CREATE_USER_SUCCESS,
  TURN_OFF_ERROR
} from "../actions/types";

const INITIAL_STATE = {
  email: "test@test.co",
  password: "password",
  password2: "password",
  user: null,
  error: "",
  loading: false,
  modalFlag: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return {
        ...state,
        email: action.payload
      };
    case PASSWORD_CHANGED:
      return {
        ...state,
        password: action.payload
      };
    case PASSWORD2_CHANGED:
      return {
        ...state,
        password2: action.payload
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: "",
        loading: false
      };
    case TURN_OFF_ERROR:
      return {
        ...state,
        error: ""
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: "true",
        loading: false
      };
    case PASSWORD_MISMATCH:
      return {
        ...state,
        error: "Passwords must match",
        loading: false
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        modalFlag: true,
        error: "",
        loading: false
      };
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
        error: ""
      };
    case SET_ACTIVE_USER:
      return {
        ...state,
        activeUser: action.payload
      };

    default:
      return state;
  }
};
