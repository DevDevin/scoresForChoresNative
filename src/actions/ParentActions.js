import firebase from "firebase";
import _ from "lodash";
import { Actions } from "react-native-router-flux";
import {
  CHORE_UPDATE,
  CHORE_FETCH_SUCCESS,
  REWARD_UPDATE,
  REWARD_FETCH_SUCCESS,
  COMPLETION_REQUESTS_FETCH_SUCCESS,
  CHORE_SAVE_SUCCESS,
  REWARD_REQUESTS_FETCH_SUCCESS,
  REWARD_REQUEST_SAVE_SUCCESS,
  REJECTION_REASON_CHANGED
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
  pointsValue: pointsValue,
  isRecurring: isRecurring
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
        status: "In-Progress",
        isRecurring: isRecurring
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

export const userEditParent = () => {
  Actions.userEdit();
};

export const rewardUpdate = ({ prop, value }) => {
  return {
    type: REWARD_UPDATE,
    payload: { prop, value }
  };
};

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
  day,
  isRecurring,
  status
}) => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/chores/${cid}`)
      .set({
        child,
        choreName,
        description,
        pointsValue,
        day,
        isRecurring,
        status
      })
      .then(() => {
        dispatch({ type: CHORE_SAVE_SUCCESS });
      });
  };
};

export const rewardSave = ({ rewardName, description, rid, pointsValue }) => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/rewards/${rid}`)
      .set({
        rewardName: rewardName,
        description: description,
        pointsValue: pointsValue
      });
  };
};

export const choreDelete = cid => {
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

// reward delete
export const rewardDelete = rid => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/rewards/${rid}`)
      .remove()
      .then(() => {
        Actions.parentRewardList({ type: "reset" });
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
  pointsValue,
  uid
) => {
  const { currentUser } = firebase.auth();
  let totalPoints;
  let email, name, password, status;

  // use the database to grab the earned points of the current user
  // then use a variable to add the old and the new together for the new total
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users/${uid}`)
      .on("value", snapshot => {
        // set values for updating the child from the snapshot
        totalPoints =
          parseInt(snapshot.val().earnedPoints) + parseInt(pointsValue);
        email = snapshot.val().email;
        name = snapshot.val().name;
        password = snapshot.val().password;
        status = snapshot.val().status;
      });
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
      });
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users/${uid}`)
      .set({
        email: email,
        name: name,
        password: password,
        status: status,
        earnedPoints: totalPoints
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
  pointsValue,
  reason
) => {
  const { currentUser } = firebase.auth();

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
        pointsValue: pointsValue,
        rejectionReason: reason
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

// fetch the reward requests sent by children
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

// completion request handling

export const rewardRequestAccept = (
  childName,
  uid,
  pointsValue,
  rid,
  rewardName,
  rewardDescription
) => {
  const { currentUser } = firebase.auth();

  // use the database to grab the earned points of the current user
  // then use a variable to add the old and the new together for the new total
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users/${uid}`)
      .on("value", snapshot => {
        // set values for updating the child from the snapshot
        totalPoints = parseInt(snapshot.val().earnedPoints);
        email = snapshot.val().email;
        name = snapshot.val().name;
        password = snapshot.val().password;
        status = snapshot.val().status;
      });
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/rewardRequests/${rid}`)
      .set({
        rewardName: rewardName,
        uid: uid,
        childName: childName,
        rewardName: rewardName,
        pointsValue: pointsValue,
        status: "Accepted",
        rewardDescription: rewardDescription
      });
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users/${uid}`)
      .set({
        email: email,
        name: name,
        password: password,
        status: status,
        earnedPoints: totalPoints
      });
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/rewardsEarned/${rid}`)
      .set({
        rewardName: rewardName,
        uid: uid,
        childName: childName,
        rewardName: rewardName,
        pointsValue: pointsValue,
        status: "Accepted"
      })
      .then(() => {
        // dispatch({ type: REWARD_REQUEST_SAVE_SUCCESS });
        // Actions.parentHome({ type: "reset" });
      });
  };
};

export const rewardRequestReject = (
  childName,
  uid,
  pointsValue,
  rid,
  rewardName,
  rejectionReason,
  rewardDescription
) => {
  const { currentUser } = firebase.auth();

  // use the database to grab the earned points of the current user
  // then use a variable to add the old and the new together for the new total
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users/${uid}`)
      .on("value", snapshot => {
        // set values for updating the child from the snapshot
        totalPoints =
          parseInt(snapshot.val().earnedPoints) + parseInt(pointsValue);
        email = snapshot.val().email;
        name = snapshot.val().name;
        password = snapshot.val().password;
        status = snapshot.val().status;
      });
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users/${uid}`)
      .set({
        email: email,
        name: name,
        password: password,
        status: status,
        earnedPoints: totalPoints
      });
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/rewardRequests/${rid}`)
      .set({
        rewardName: rewardName,
        uid: uid,
        childName: childName,
        rewardName: rewardName,
        pointsValue: pointsValue,
        status: "Rejected",
        rejectionReason: rejectionReason,
        rewardDescription: rewardDescription
      })
      .then(() => {
        // dispatch({ type: REWARD_REQUEST_SAVE_SUCCESS });
        // Actions.rewardRequestList({ type: "reset" });
      });
  };
};

export const choreReset = filteredChores => {
  const { currentUser } = firebase.auth();

  // non-recurring chores
  const nonrecurringChores = _.filter(filteredChores, function(item) {
    return item.isRecurring === false;
  });

  return () => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/chores`)
      .remove();

    //filter the chores
    const recurringChores = _.filter(filteredChores, function(item) {
      return item.isRecurring === true;
    });

    _.map(recurringChores, chore => {
      firebase
        .database()
        .ref(`/users/${currentUser.uid}/chores`)
        .push({
          child: chore.child,
          choreName: chore.choreName,
          day: chore.day,
          description: chore.description,
          pointsValue: chore.pointsValue,
          isRecurring: true,
          status: "In-Progress"
        })
        .then(() => {
          Actions.parentChoreList();
        });
    });
  };
};

export const rejectionReasonChange = text => {
  return {
    type: REJECTION_REASON_CHANGED,
    payload: text
  };
};
