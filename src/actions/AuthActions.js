import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
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

export const passwordReset = (uid, newPassword) => {
  console.log("user: ", uid);
  console.log("newPassword: ", newPassword);
  const { currentUser } = firebase.auth();

  let email, name, password, phone, status, earnedPoints;

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users/${uid}`)
      // .orderByChild("name")
      // .equalTo(user)
      .on("value", snapshot => {
        console.log("snapshot : ", snapshot.val());

        // set values for updating the child from the snapshot
        earnedPoints = parseInt(snapshot.val().earnedPoints);
        email = snapshot.val().email;
        name = snapshot.val().name;
        password = newPassword;
        phone = snapshot.val().phone;
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
        phone: phone,
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
  console.log("inside login User");
  return dispatch => {
    dispatch({ type: LOADING_USERS_START });
    console.log("past the loading start dispatch");
    console.log("inside loginUser");
    console.log("email: ", email, "password: ", password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(error => {
        console.log("this is the error", error);
        loginUserFail(dispatch);
      });
  };
};

export const createAccount = ({ email, password, password2 }) => {
  return dispatch => {
    if (password != password2) {
      console.log("password mismatch");
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
        });
    }
  };
};

const loginUserFail = dispatch => {
  console.log("inside loginUserFail");
  dispatch({ type: LOGIN_USER_FAIL });
};

const passwordMismatch = dispatch => {
  dispatch({ type: PASSWORD_MISMATCH });
};

const createUserSuccess = dispatch => {
  dispatch({ type: CREATE_USER_SUCCESS });
};

export const turnOffAuthError = () => {
  return dispatch => {
    dispatch({ type: TURN_OFF_ERROR });
  };
};

const loginUserSuccess = (dispatch, user) => {
  console.log("inside loginUserSuccess");
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
  console.log("user: ", user);
  // Navigate to the choose user screen
  Actions.chooseUser();
};

export const userCreate = ({ name, phone, password1, status, email }) => {
  const { currentUser } = firebase.auth();
  console.log("inside userCreate");

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users`)
      .push({
        name: name,
        email: email,
        phone: phone,
        password: password1,
        status: status,
        earnedPoints: 0
      })
      .then(() => {
        console.log("user successfully create");
        Actions.chooseUser();
      });
  };
};

export const userUpdate = ({ prop, value }) => {
  return {
    type: USER_UPDATE,
    payload: { prop, value }
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
      console.log("Hello after 4 seconds");
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

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users/${activeUser.uid}`)
      .on("value", snapshot => {
        dispatch({ type: SET_ACTIVE_USER, payload: activeUser });
      });
  };
};

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
      Actions.startup();
    })
    .catch(err => {
      console.log("sign out fail: ", err);
    });
};
