import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import UserFormReducer from "./UserFormReducer";
import UserReducer from "./UserReducer";

export default combineReducers({
  auth: AuthReducer,
  userForm: UserFormReducer,
  users: UserReducer
});
