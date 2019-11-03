import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import {
  CHORE_FETCH_SUCCESS,
  REWARD_FETCH_SUCCESS,
  CHORE_SAVE_SUCCESS,
  EARNED_REWARD_FETCH_SUCCESS,
  SET_ACTIVE_USER
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

export const rewardRequestSend2 = (
  activeUsername,
  pointsValue,
  rid,
  rewardName,
  activeUserObject,
  currentPoints,
  uid
) => {
  console.log("activeUserObject: ", activeUserObject);
  console.log("currentPoints: ", currentPoints);

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
        rewardName: "rewardName",
        status: "Submitted",
        uid: uid,
        rid: rid
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
        console.log("update active user information");
        // return dispatch => {
        //   firebase
        //     .database()
        //     .ref(`/users/${currentUser.uid}/users/${activeUser.uid}`)
        //     .on("value", snapshot => {
        //       console.log("snapshot: ", snapshot);
        //       dispatch({
        //         type: SET_ACTIVE_USER,
        //         payload: {
        //           earnedPoints:
        //             parseInt(snapshot.val().earnedPoints) -
        //             parseInt(pointsValue),
        //           email: snapshot.val().email,
        //           name: snapshot.val().name,
        //           password: snapshot.val().password,
        //           phone: snapshot.val().phone,
        //           uid: snapshot.val().uid
        //         }
        //       });
        //     });
        // };
      });
  };
};

// export const rewardRequestSend = (
//   activeUserName,
//   uid,
//   pointsValue,
//   rid,
//   rewardName
// ) => {
//   const { currentUser } = firebase.auth();
//   console.log(
//     "activeUserName:",
//     activeUserName,
//     "uid: ",
//     uid,
//     "pointsValue: ",
//     pointsValue,
//     "rid: ",
//     rid,
//     "rewardName: ",
//     rewardName
//   );

//   return dispatch => {
//     firebase
//       .database()
//       .ref(`/users/${currentUser.uid}/users/${uid}`)
//       .on("value", snapshot => {
//         // set values for updating the child from the snapshot
//         console.log("earned points11: ", snapshot.val().earnedPoints);
//         totalPoints =
//           parseInt(snapshot.val().earnedPoints) - parseInt(pointsValue);
//         console.log("totalPoints11", totalPoints);
//         email = snapshot.val().email;
//         name = snapshot.val().name;
//         password = snapshot.val().password;
//         phone = snapshot.val().phone;
//         status = snapshot.val().status;
//       });
//     // firebase
//     //   .database()
//     //   .ref(`/users/${currentUser.uid}/users/${uid}`)
//     //   .set({
//     //     earnedPoints: totalPoints,
//     //     email: email,
//     //     name: name,
//     //     password: password,
//     //     phone: phone,
//     //     status: status
//     //   });
//     firebase
//       .database()
//       .ref(`/users/${currentUser.uid}/users/${uid}`)
//       .on("value", snapshot => {
//         // set values for updating the child from the snapshot

//         dispatch({
//           type: SET_ACTIVE_USER,
//           payload: {
//             earnedPoints:
//               parseInt(snapshot.val().earnedPoints) - parseInt(pointsValue),
//             email: snapshot.val().email,
//             name: snapshot.val().name,
//             password: snapshot.val().password,
//             phone: snapshot.val().phone
//           }
//         });
//       });

//     //TODO:  when tyring to use the below function to update the state i had some issues with the uid.
//     // i think i just need to do the setActiveUser in the componentDidMount so I can update that value as
//     // soon as the component is refreshed. Also need to create new users.
//     // firebase
//     //   .database()
//     //   .ref(`/users/${currentUser.uid}/users/${uid}`)
//     //   .on("value", snapshot => {
//     //     console.log("snapshot: ", snapshot.val());
//     //     dispatch({ type: SET_ACTIVE_USER, payload: snapshot.val() });
//     //   });
//     firebase
//       .database()
//       .ref(`/users/${currentUser.uid}/rewardRequests/${rid}`)
//       .set({
//         childName: activeUserName,
//         uid: uid,
//         pointsValue: pointsValue,
//         rewardName: rewardName,
//         status: "Submitted",
//         rejectionReason: ""
//       })
//       .then(() => {
//         dispatch({ type: CHORE_SAVE_SUCCESS });
//         Actions.childRewardStore({ type: "reset" });
//       });
//   };
// };

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
