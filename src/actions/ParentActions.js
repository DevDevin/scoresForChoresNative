import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import {
  CHORE_UPDATE,
  CHORE_FETCH_SUCCESS,
  REWARD_UPDATE,
  REWARD_FETCH_SUCCESS,
  COMPLETION_REQUESTS_FETCH_SUCCESS,
  CHORE_SAVE_SUCCESS
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
  child: child,
  pointsValue: pointsValue
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
        child: child,
        pointsValue: pointsValue,
        status: "In-Progress"
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
  console.log("currentUser: ", currentUser);

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

export const completionRequestsFetch2 = () => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/completionRequests`)
      .on("value", snapshot => {
        dispatch({
          type: COMPLETION_REQUESTS_FETCH_SUCCESS,
          payload: snapshot.val()
        });
      });
  };
};

export const choreSave = ({
  child,
  choreName,
  description,
  cid,
  pointsValue,
  day
}) => {
  const { currentUser } = firebase.auth();
  console.log("cid: ", cid);

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/chores/${cid}`)
      .set({ child, choreName, description, pointsValue, day })
      .then(() => {
        dispatch({ type: CHORE_SAVE_SUCCESS });
        Actions.parentChoreList({ type: "reset" });
      });
  };
};

export const choreDelete = ({ cid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/chores/${cid}`)
      .remove()
      .then(() => {
        Actions.employeeList({ type: "reset" });
      });
  };
};

// completion request handling

export const requestAccept = (
  cid,
  choreName,
  day,
  child,
  description,
  pointsValue
) => {
  const { currentUser } = firebase.auth();
  console.log("cid: ", cid);

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/chores/${cid}`)
      .set({
        status: "Complete",
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

export const requestReject = (
  cid,
  choreName,
  day,
  child,
  description,
  pointsValue
) => {
  const { currentUser } = firebase.auth();
  console.log("cid: ", cid);

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/chores/${cid}`)
      .set({
        status: "Rework",
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

// fOR THE COMPLETION request we will fetch by the status of the chore rather than creating a new request ojbect
export const completionRequestsFetch = () => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/chores`)
      .orderByChild("status")
      .equalTo("Submitted")
      .on("value", snapshot => {
        dispatch({
          type: COMPLETION_REQUESTS_FETCH_SUCCESS,
          payload: snapshot.val()
        });
      });
  };
};
