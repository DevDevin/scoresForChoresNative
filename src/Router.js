import React from "react";
import { Scene, Router, Actions } from "react-native-router-flux";
import ChooseUser from "./components/ChooseUser";
import LoginForm from "./components/LoginForm";
import UserCreate from "./components/UserCreate";

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
        <Scene key="user">
          <Scene
            rightTitle="New User"
            onRight={() => {
              Actions.userCreate();
            }}
            key="chooseUser"
            component={ChooseUser}
            title="Choose User"
            initial
          />
          <Scene
            key="userCreate"
            component={UserCreate}
            title="Create Employee"
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
