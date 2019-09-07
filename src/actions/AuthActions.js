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
  CREATE_USER_SUCCESS
} from "./types";

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
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
    // dispatch({ type: LOGIN_USER });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(error => {
        console.log(error);
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user))
          .catch(() => loginUserFail(dispatch));
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
          createUserSuccess(dispatch);
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
  dispatch({ type: CREATE_USER_SUCCESS });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });

  // Navigate to the choose user screen
  Actions.user();
};

export const userCreate = ({ name, phone, password1, status, email }) => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users`)
      .push({
        name: name,
        email: email,
        phone: phone,
        password: password1,
        status: status
      })
      .then(() => {
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
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users`)
      .on("value", snapshot => {
        dispatch({ type: USER_FETCH_SUCCESS, payload: snapshot.val() });
      });
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
