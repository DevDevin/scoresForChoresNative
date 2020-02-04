import firebase from "firebase";
import _ from "lodash";
import { Actions } from "react-native-router-flux";
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  USER_UPDATE,
  USER_FETCH_SUCCESS,
  SET_ACTIVE_USER,
  PASSWORD2_CHANGED,
  PASSWORD_MISMATCH,
  CREATE_USER_SUCCESS,
  LOADING_USERS_START,
  LOADING_USERS_END,
  TURN_OFF_ERROR
} from "./types";
import { Alert } from "react-native";

export const passwordReset = (uid, newPassword) => {
  const { currentUser } = firebase.auth();

  let email, name, password, phone, status, earnedPoints;

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users/${uid}`)
      .on("value", snapshot => {
        earnedPoints = parseInt(snapshot.val().earnedPoints);
        email = snapshot.val().email;
        name = snapshot.val().name;
        password = newPassword;
        // phone = snapshot.val().phone;
        status = snapshot.val().status;
      });
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users/${uid}`)
      .set({
        earnedPoints: earnedPoints,
        email: email,
        name: name,
        password: password,
        // phone: phone,
        status: status
      })
      .then(() => {
        Actions.parentHome();
      });
  };
};

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

// forgotten password
export const forgotPassword = resetEmail => {
  return dispatch => {
    firebase.auth().sendPasswordResetEmail(resetEmail);
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const password2Changed = text => {
  return {
    type: PASSWORD2_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: LOADING_USERS_START });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(error => {
        loginUserFail(dispatch);
      });
  };
};

export const createAccount = ({ email, password, password2 }) => {
  console.log("inside createAccount");
  return dispatch => {
    if (password != password2) {
      passwordMismatch(dispatch);
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
              createUserSuccess(dispatch);
            });
        })
        .catch(err => {
          console.log("fail. Couldn't create user because: ", err);
          Alert.alert(
            "Username Already Exists",
            "Please choose another one.",
            [
              {
                text: "OK",
                onPress: () => {}
              }
            ],
            { cancelable: false }
          );
        });
    }
  };
};

const loginUserFail = dispatch => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const passwordMismatch = dispatch => {
  dispatch({ type: PASSWORD_MISMATCH });
};

const createUserSuccess = dispatch => {
  Alert.alert(
    "Account Successfully Created.",
    "Please create an admin user to manage the account.",
    [
      {
        text: "OK",
        onPress: () => {
          Actions.adminUserCreate();
        }
      }
    ],
    { cancelable: false }
  );

  dispatch({ type: CREATE_USER_SUCCESS });
};

export const turnOffAuthError = () => {
  return dispatch => {
    dispatch({ type: TURN_OFF_ERROR });
  };
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
  // Navigate to the choose user screen
  Actions.userList();
};

export const userCreate = ({ name, password1, status, email }, activeUser) => {
  console.log("activeUser in userCreate", activeUser);
  const { currentUser } = firebase.auth();
  console.log("entered userCreate");
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users`)
      .push({
        name: name,
        email: email,
        password: password1,
        status: status,
        earnedPoints: 0
      })
      .then(() => {
        console.log("should have gone to choose user");
        if (activeUser === "") {
          Actions.userList();
        } else {
          Actions.addDeleteUsers();
        }
      });
  };
};

export const userUpdate = ({ prop, value }) => {
  console.log("prop: ", prop, " value: ", value);
  return {
    type: USER_UPDATE,
    payload: { prop, value }
  };
};

export const userSave = ({
  oldName,
  newName,
  email,
  password1,
  status,
  uid,
  earnedPoints
}) => {
  const { currentUser } = firebase.auth();
  // old name to reference when changing the chore and other objects
  // const newName = currentUser;

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users/${uid}`)
      .set({
        name: newName,
        email: email,
        password: password1,
        status: status,
        earnedPoints: earnedPoints
      })
      .then(() => {
        console.log("name: ", name);
        // update all objects with this name. ex:
        choreUpdate2();
        // completionRequestUpdate()
        // rewardRequestUpdate()
      });
  };
};

export const choreUpdate = () => {
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

/// update reward requests info when child changes name
export const rewardRequestUpdate = (newName, rewardRequests) => {
  const { currentUser } = firebase.auth();
  console.log("rewardRequests in rewardRequestsUpdate: ", rewardRequests);
  // simplify the object of arrays
  const rewardRequestsObject = rewardRequests.rewardRequests;
  console.log("rewardRequestsObject: ", rewardRequestsObject);

  //might have to do this inside of the return dispatch area
  return dispatch => {
    _.map(rewardRequestsObject, rewardRequest => {
      console.log("rewardRequests map: ", rewardRequest);
      firebase
        .database()
        .ref(`/users/${currentUser.uid}/rewardRequests/${rewardRequest.rid}`)
        .set({
          childName: newName,
          pointsValue: rewardRequest.pointsValue,
          rejectionReason: rewardRequest.rejectionReason,
          rewardDescription: rewardRequest.rewardDescription,
          rewardName: rewardRequest.rewardName,
          rid: rewardRequest.rid,
          status: rewardRequest.status,
          uid: rewardRequest.uid
        });
    });
  };
};

/// update reward requests info when child changes name
export const rewardsEarnedUpdate = (newName, rewardsEarned) => {
  const { currentUser } = firebase.auth();
  console.log("rewardsEarned in rewardsEarnedUpdate: ", rewardsEarned);
  // simplify the object of arrays
  const rewardsEarnedObject = rewardsEarned.rewardsEarned;
  console.log("rewardsEarnedObject: ", rewardsEarnedObject);

  //might have to do this inside of the return dispatch area
  return dispatch => {
    _.map(rewardsEarnedObject, reward => {
      console.log("rewardsEarnedObject map: ", reward.rewardName);
      firebase
        .database()
        .ref(`/users/${currentUser.uid}/rewardsEarned/${reward.rid}`)
        .set({
          childName: newName,
          pointsValue: reward.pointsValue,
          rewardName: reward.rewardName,
          status: reward.status,
          uid: reward.uid
        });
    });
  };
};

export const choreUpdate2 = (newName, chores) => {
  const { currentUser } = firebase.auth();

  // simplify the object of arrays
  const choresObject = chores.chores;
  console.log("choresObject: ", choresObject);

  //might have to do this inside of the return dispatch area
  return dispatch => {
    _.map(choresObject, chore => {
      firebase
        .database()
        .ref(`/users/${currentUser.uid}/chores/${chore.cid}`)
        .set({
          child: newName,
          choreName: chore.choreName,
          day: chore.day,
          description: chore.description,
          pointsValue: chore.pointsValue,
          recurring: chore.recurring,
          status: chore.status
        });
    });
  };
};

export const testFunc = () => {
  console.log("testFunc");
};

export const choreUpdate2_2 = (oldName, newName) => {
  console.log("-----choreUpdate2------");
  console.log("oldName: ", oldName);
  console.log("newName: ", newName);
  const { currentUser } = firebase.auth();
  // const child = activeUser;
  // need to figure out why it is not going into the dispatch
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/chores`)
      .orderByChild("child")
      .equalTo("Child 3")
      .on("value", snapshot => {
        console.log("snapshot in choreUpdate2: ", snapshot);
        _.map(snapshot, chore => {
          console.log("chore: ", chore);
          console.log("snapshote: ", snapshot);
          firebase
            .database()
            .ref(`/users/${currentUser.uid}/chores`)
            .push({
              child: newName,
              choreName: chore.choreName,
              day: chore.day,
              description: chore.description,
              pointsValue: chore.pointsValue,
              recuring: true,
              status: "In-Progress"
            })
            .then(() => {
              console.log("actions.parent");
              Actions.parentChoreList();
            });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const userDelete = uid => {
  console.log("inside of chore delete: ", uid);
  const { currentUser } = firebase.auth();

  return () => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users/${uid}`)
      .remove()
      .then(() => {
        Actions.employeeList({ type: "reset" });
      });
  };
};

export const usersFetch = () => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    // dispatch({ type: LOADING_USERS_START });

    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users`)
      .on("value", snapshot => {
        dispatch({ type: USER_FETCH_SUCCESS, payload: snapshot.val() });
      });
    loadingUsersEnd(dispatch);
  };
};

export const loadingUsersEnd = () => {
  // startTimer();

  return dispatch => {
    setTimeout(() => {
      dispatch({ type: LOADING_USERS_END });
    }, 4 * 1000);
  };
};

export const loadingUsersStart = () => {
  return dispatch => {
    dispatch({ type: LOADING_USERS_START });
  };
};

export const setActiveUser = activeUser => {
  const { currentUser } = firebase.auth();
  console.log("entered setActiveUser: ", activeUser);

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users/${activeUser.uid}`)
      .on("value", snapshot => {
        // it think the payload should be snapshot.val instead of activeUser
        // dispatch({ type: SET_ACTIVE_USER, payload: activeUser });
        // i need to pass in the id here as well so I can use it when updating the user later.
        dispatch({
          type: SET_ACTIVE_USER,
          payload: {
            earnedPoints: snapshot.val().earnedPoints,
            email: snapshot.val().email,
            name: snapshot.val().name,
            password: snapshot.val().password,
            phone: snapshot.val().phone,
            status: snapshot.val().status,
            uid: activeUser.uid
          }
        });
      });
  };
};

export const updateActiveUser = (activeUser, pointsValue) => {
  const { currentUser } = firebase.auth();
  console.log("entered updateActiveUser: ", activeUser);

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users/${activeUser.uid}`)
      .on("value", snapshot => {
        dispatch({
          type: SET_ACTIVE_USER,
          payload: {
            earnedPoints:
              parseInt(snapshot.val().earnedPoints) - parseInt(pointsValue),
            email: snapshot.val().email,
            name: snapshot.val().name,
            password: snapshot.val().password,
            phone: snapshot.val().phone
          }
        });
      });
  };
};

// for updating from the reward request child action
// export const setActiveUser = uid => {
//   const { currentUser } = firebase.auth();

//   return dispatch => {
//     firebase
//       .database()
//       .ref(`/users/${currentUser.uid}/users/${}`)
//       .on("value", snapshot => {
//         dispatch({ type: SET_ACTIVE_USER, payload: activeUser });
//       });
//   };
// };

export const setActiveUserId = activeUserId => {
  dispatch({ type: SET_ACTIVE_USER_ID, payload: activeUserId });
};

// either call a separate function that sets the active user id. Or instead of doing a snapshot I
// I could just pass in all of the values to the function setActiveUser individually including the active user id.
// the second option worked. Now whenever a child submits a completion request i need to also submit the uid which I will need // turn into a prop from the state data on the component where the child submits the completion request.

export const logoutAuth = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      Actions.auth();
    })
    .catch(err => {});
};
