import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import {
  CHORE_FETCH_SUCCESS,
  REWARD_FETCH_SUCCESS,
  CHORE_SAVE_SUCCESS,
  EARNED_REWARD_FETCH_SUCCESS,
  REWARD_REQUESTS_FETCH_SUCCESS
} from "./types";

export const childChoresFetch = activeUser => {
  const { currentUser } = firebase.auth();
  console.log("currentUser.uid: ", currentUser.uid);
  console.log("inside chore childChoresFetch");

  const child = activeUser;
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/chores`)
      .orderByChild("child")
      .equalTo(child)
      .on("value", snapshot => {
        console.log("payload: ", snapshot.val());
        dispatch({
          type: CHORE_FETCH_SUCCESS,
          payload: snapshot.val()
        });
      });
  };
};

export const childRewardRequestsFetch = activeUser => {
  const { currentUser } = firebase.auth();
  console.log("currentUser.uid: ", currentUser.uid);
  console.log("inside childRewardRequestsFetch");

  const child = activeUser;

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/rewardRequests`)
      .orderByChild("childName")
      .equalTo(child)
      .on("value", snapshot => {
        console.log("payload: ", snapshot.val());
        dispatch({
          type: REWARD_REQUESTS_FETCH_SUCCESS,
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

// undo completion rewquest
export const undoCompletionRequest = (
  cid,
  choreName,
  day,
  child,
  description,
  pointsValue
) => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/chores/${cid}`)
      .set({
        status: "In-Progress",
        choreName: choreName,
        day: day,
        child: child,
        description: description,
        pointsValue: pointsValue,
        rejectionReason: ""
      })
      .then(() => {
        dispatch({ type: CHORE_SAVE_SUCCESS });
      });
  };
};

// delete reward request
export const deleteRewardRequest = rrid => {
  console.log("inside delete reward request");
  const { currentUser } = firebase.auth();
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/rewardRequests/${rrid}`)
      .remove();
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

export const rewardRequestSend2 = (
  activeUsername,
  pointsValue,
  rid,
  rewardName,
  activeUserObject,
  currentPoints,
  uid,
  rewardDescription
) => {
  console.log("activeUserObject: ", activeUserObject);
  console.log("currentPoints: ", currentPoints);
  console.log("rewardDescription inside actions: ", rewardDescription);

  console.log("params: ", pointsValue, rid, rewardName, activeUserObject);
  const { currentUser } = firebase.auth();
  console.log("entered userCreate");
  return dispatch => {
    /// create reward Request
    console.log("create reward request");
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/rewardRequests`)
      .push({
        childName: activeUsername,
        pointsValue: pointsValue,
        rejectionReason: "",
        rewardName: rewardName,
        status: "Submitted",
        uid: uid,
        rid: rid,
        rewardDescription: rewardDescription
      });
    // edit the childs points value
    // console.log("edit childs points value. uid: ", uid);
    // i need to give the active user an id when it is first initialized
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users/${activeUserObject.uid}`)
      .set({
        earnedPoints: parseInt(currentPoints) - parseInt(pointsValue),
        email: activeUserObject.email,
        name: activeUserObject.name,
        password: activeUserObject.password,
        status: activeUserObject.status
      })
      .then(() => {
        //delete the old request
      });
  };
};

// resubmit reward request, then delete the old one
export const resubmitRewardRequest = (
  activeUsername,
  pointsValue,
  rid,
  rewardName,
  activeUserObject,
  currentPoints,
  uid,
  rewardDescription
) => {
  console.log("activeUserObject: ", activeUserObject);
  console.log("currentPoints: ", currentPoints);
  console.log("rewardDescription inside actions: ", rewardDescription);

  console.log("params: ", pointsValue, rid, rewardName, activeUserObject);
  const { currentUser } = firebase.auth();
  console.log("entered userCreate");
  return dispatch => {
    /// create reward Request
    console.log("create reward request");
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/rewardRequests/${rid}`)
      .set({
        childName: activeUsername,
        pointsValue: pointsValue,
        rejectionReason: "",
        rewardName: rewardName,
        status: "Submitted",
        uid: uid,
        rid: rid,
        rewardDescription: rewardDescription
      });
    // edit the childs points value
    // console.log("edit childs points value. uid: ", uid);
    // i need to give the active user an id when it is first initialized
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users/${activeUserObject.uid}`)
      .set({
        earnedPoints: parseInt(currentPoints) - parseInt(pointsValue),
        email: activeUserObject.email,
        name: activeUserObject.name,
        password: activeUserObject.password,
        phone: activeUserObject.phone,
        status: activeUserObject.status
      })
      .then(() => {
        //delete the old request
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
