import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import { CHORE_UPDATE } from "./types";

export const choreUpdate = ({ prop, value }) => {
  console.log("value: ", value);
  return {
    type: CHORE_UPDATE,
    payload: { prop, value }
  };
};
