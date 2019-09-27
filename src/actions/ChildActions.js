import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import {
  CHORE_FETCH_SUCCESS,
  REWARD_FETCH_SUCCESS,
  CHORE_SAVE_SUCCESS,
  EARNED_REWARD_FETCH_SUCCESS
} from "./types";

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
  day,
  description,
  pointsValue,
  cid,
  child,
  uid
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
        pointsValue: pointsValue,
        uid: uid
      })
      .then(() => {
        dispatch({ type: CHORE_SAVE_SUCCESS });
        Actions.childChoreList({ type: "reset" });
      });
  };
};

// grab the reward requests for that child
export const rewardRequestsFetch = () => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/rewardRequests`)
      .on("value", snapshot => {
        dispatch({
          type: REWARD_REQUESTS_FETCH_SUCCESS,
          payload: snapshot.val()
        });
      });
  };
};

// the childs total points will be deleted when they submit the reward request. It the reward request is accepted
// nothing will need to happen. If the request is rejected then the points will be given back.
export const rewardRequestSend = (
  activeUserName,
  uid,
  pointsValue,
  rid,
  rewardName
) => {
  const { currentUser } = firebase.auth();
  console.log("inside reward request send");
  console.log("activeUserName: ", activeUserName);
  console.log("uid: ", uid);
  console.log("pointsValue: ", pointsValue);

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/rewardRequests/${rid + uid}`)
      .set({
        childName: activeUserName,
        uid: uid,
        pointsValue: pointsValue,
        rewardName: rewardName
      })
      .then(() => {
        dispatch({ type: CHORE_SAVE_SUCCESS });
        Actions.childRewardStore({ type: "reset" });
      });
  };
};

export const earnedRewardsFetch = activeUser => {
  console.log("inside earned rewards fetch");
  const { currentUser } = firebase.auth();
  const childName = activeUser;
  console.log("child: ", childName);
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/rewardsEarned`)
      .orderByChild("childName")
      .equalTo(childName)
      .on("value", snapshot => {
        console.log(snapshot.val());
        dispatch({
          type: EARNED_REWARD_FETCH_SUCCESS,
          payload: snapshot.val()
        });
      });
  };
};

export const earnedRewardSpend = rewardId => {
  const { currentUser } = firebase.auth();
  console.log("inside earnedRewardSpend");
  console.log("rewardId: ", rewardId);

  return () => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/rewardsEarned/${rewardId}`)
      .remove()
      .then(() => {
        Actions.earnedRewards({ type: "reset" });
      });
  };
};
