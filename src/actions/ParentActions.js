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

export const choreCreate = ({
  choreName: choreName,
  description: description,
  day: day,
  child: child
}) => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users/chores`)
      .push({
        choreName: choreName,
        description: description,
        day: day,
        child: child
      })
      .then(() => {
        Actions.parentChoreList();
      });
  };
};

export const choresFetch = () => {
  const { currentUser } = firebase.auth();
  console.log("currentUser: ", currentUser);

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users`)
      .on("value", snapshot => {
        dispatch({ type: USER_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
