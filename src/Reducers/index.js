import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import UserFormReducer from "./UserFormReducer";
import UserReducer from "./UserReducer";
import ChoreReducer from "./ChoreReducer";
import ChoreFormReducer from "./ChoreFormReducer";

export default combineReducers({
  auth: AuthReducer,
  userForm: UserFormReducer,
  users: UserReducer,
  choreForm: ChoreFormReducer,
  chores: ChoreReducer
});
