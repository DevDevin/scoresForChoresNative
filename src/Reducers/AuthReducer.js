import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SET_ACTIVE_USER
} from "../actions/types";

const INITIAL_STATE = {
  email: "test@test.com",
  password: "password",
  user: null,
  error: "",
  loading: false
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
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: "",
        loading: false
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: "Authentication Failed.",
        loading: false
      };
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
        error: ""
      };
    case SET_ACTIVE_USER:
      console.log("setActiveUser Payload", action.payload);
      return {
        ...state,
        activeUser: action.payload
      };

    default:
      return state;
  }
};
