import firebase from "firebase";
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
            "Usesr Name Already Exists",
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

export const userCreate = ({ name, password1, status, email }) => {
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
        Actions.userList();
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
  name,
  email,
  password1,
  status,
  uid,
  earnedPoints
}) => {
  const { currentUser } = firebase.auth();
  console.log(
    "name: ",
    name,
    " password1: ",
    password1,
    " status: ",
    status,
    " AuthActions user Save"
  );

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users/${uid}`)
      .set({
        name: name,
        email: email,
        password: password1,
        status: status,
        earnedPoints: earnedPoints
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
