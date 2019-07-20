import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import { CHORE_FETCH_SUCCESS, REWARD_FETCH_SUCCESS } from "./types";

export const childChoresFetch = activeUser => {
  const { currentUser } = firebase.auth();
  const child = activeUser;
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/chores`)
      .orderByChild("child")
      .equalTo(child)
      .on("value", snapshot => {
        dispatch({
          type: CHORE_FETCH_SUCCESS,
          payload: snapshot.val()
        });
      });
  };
};

/// child rewards fetch ///
export const rewardsFetch = () => {
  console.log("inside rewards fetch in parent actions");
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/rewards`)
      .on("value", snapshot => {
        dispatch({ type: REWARD_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const completionRequestSend = (
  choreName,
  child,
  day,
  description,
  pointsValue,
  cid
) => {
  const { currentUser } = firebase.auth();
  console.log("cid: ", cid);

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/chores/${cid}`)
      .set({
        status: "Submitted",
        choreName: choreName,
        day: day,
        child: child,
        description: description,
        pointsValue: pointsValue
      })
      .then(() => {
        dispatch({ type: CHORE_SAVE_SUCCESS });
        Actions.completionRequestList({ type: "reset" });
      });
  };
};
