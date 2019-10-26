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
  console.log(
    "activeUserName:",
    activeUserName,
    "uid: ",
    uid,
    "pointsValue: ",
    pointsValue,
    "rid: ",
    rid,
    "rewardName: ",
    rewardName
  );

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users/${uid}`)
      .on("value", snapshot => {
        // set values for updating the child from the snapshot
        console.log("earned points: ", snapshot.val().earnedPoints);
        totalPoints =
          parseInt(snapshot.val().earnedPoints) - parseInt(pointsValue);
        email = snapshot.val().email;
        name = snapshot.val().name;
        password = snapshot.val().password;
        phone = snapshot.val().phone;
        status = snapshot.val().status;
      });
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users/${uid}`)
      .set({
        email: email,
        name: name,
        password: password,
        phone: phone,
        status: status,
        earnedPoints: totalPoints
      });
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/rewardRequests/${rid}`)
      .set({
        childName: activeUserName,
        uid: uid,
        pointsValue: pointsValue,
        rewardName: rewardName,
        status: "Submitted",
        rejectionReason: ""
      })
      .then(() => {
        dispatch({ type: CHORE_SAVE_SUCCESS });
        Actions.childRewardStore({ type: "reset" });
      });
  };
};

export const earnedRewardsFetch = activeUser => {
  const { currentUser } = firebase.auth();
  const childName = activeUser;
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/rewardsEarned`)
      .orderByChild("childName")
      .equalTo(childName)
      .on("value", snapshot => {
        dispatch({
          type: EARNED_REWARD_FETCH_SUCCESS,
          payload: snapshot.val()
        });
      });
  };
};

export const earnedRewardSpend = rewardId => {
  const { currentUser } = firebase.auth();

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
