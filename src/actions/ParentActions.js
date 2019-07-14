import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import {
  CHORE_UPDATE,
  CHORE_FETCH_SUCCESS,
  REWARD_UPDATE,
  REWARD_FETCH_SUCCESS
} from "./types";

export const choreUpdate = ({ prop, value }) => {
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
      .ref(`/users/${currentUser.uid}/chores`)
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

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/chores`)
      .on("value", snapshot => {
        dispatch({ type: CHORE_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

//// REWARD STUFF //////////

export const rewardCreate = ({
  rewardName: rewardName,
  description: description,
  pointsValue: pointsValue
}) => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/rewards`)
      .push({
        rewardName: rewardName,
        description: description,
        pointsValue: pointsValue
      })
      .then(() => {
        Actions.parentRewardList();
      });
  };
};

export const rewardUpdate = ({ prop, value }) => {
  return {
    type: REWARD_UPDATE,
    payload: { prop, value }
  };
};

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
