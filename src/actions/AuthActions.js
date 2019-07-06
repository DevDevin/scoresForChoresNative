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
  SET_ACTIVE_USER
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
          .catch(() => LoginUserFail(dispatch));
      });
  };
};

const loginUserFail = dispatch => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  console.log("entered loginUserSuccess");
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });

  // Navigate to the choose user screen
  Actions.user();
};

export const userCreate = ({ name, phone, password1, status, email }) => {
  const { currentUser } = firebase.auth();

  console.log("status: ", status);
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
  console.log("value: ", value);
  return {
    type: USER_UPDATE,
    payload: { prop, value }
  };
};

export const usersFetch = () => {
  const { currentUser } = firebase.auth();
  console.log("currentUser: ", currentUser);

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users`)
      .on("value", snapshot => {
        dispatch({ type: USER_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const setActiveUser = activeUserId => {
  const { currentUser } = firebase.auth();
  console.log("activeUserID: ", activeUserId);

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/users/${activeUserId}`)
      .on("value", snapshot => {
        dispatch({ type: SET_ACTIVE_USER, payload: snapshot.val() });
      });
  };
};
