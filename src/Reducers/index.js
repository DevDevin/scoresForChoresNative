import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import UserFormReducer from "./UserFormReducer";

export default combineReducers({
  auth: AuthReducer,
  user: UserFormReducer
});
