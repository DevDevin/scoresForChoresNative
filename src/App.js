import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import firebase from "firebase";
import ReduxThunk from "redux-thunk";
import reducers from "./Reducers/index";
import LoginForm from "./components/LoginForm";
import Router from "./Router";

class App extends Component {
  componentWillMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyBQAM1nIFhB-hRPGn_J_qgqdZE7WEENwKc",
      authDomain: "scoreforchores.firebaseapp.com",
      databaseURL: "https://scoreforchores.firebaseio.com",
      projectId: "scoreforchores",
      storageBucket: "",
      messagingSenderId: "561003986058",
      appId: "1:561003986058:web:b4c658dfacdb3f4c"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    console.disableYellowBox = true;
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
