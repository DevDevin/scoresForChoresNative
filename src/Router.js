import React from "react";
import { Scene, Router, Actions } from "react-native-router-flux";
import ChooseUser from "./components/ChooseUser";
import LoginForm from "./components/LoginForm";

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene
            key="login"
            component={LoginForm}
            title="Please Login"
            initial
          />
        </Scene>
        <Scene key="chooseUser">
          <Scene
            key="login"
            component={ChooseUser}
            title="Choose User"
            initial
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
