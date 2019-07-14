import React from "react";
import { Scene, Router, Actions } from "react-native-router-flux";
import ChooseUser from "./components/ChooseUser";
import LoginForm from "./components/LoginForm";
import UserCreate from "./components/UserCreate";
import ChildHome from "./components/child/ChildHome";
import ParentHome from "./components/parent/ParentHome";
import ParentChoreList from "./components/parent/ParentChoreList";
import ParentRewardList from "./components/parent/ParentRewardList";
import CompletionRequests from "./components/parent/CompletionRequests";
import ChildChoreList from "./components/child/ChildChoreList";
import ChildRewardStore from "./components/child/ChildRewardStore";
import ChoreCreate from "./components/parent/ChoreCreate";
import RewardCreate from "./components/parent/RewardCreate";

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
        <Scene key="child">
          <Scene key="childHome" component={ChildHome} title="Child Home" />
          <Scene
            key="childChoreList"
            component={ChildChoreList}
            title="Child Chore List"
          />
          <Scene
            key="childRewardStore"
            component={ChildRewardStore}
            title="Child Reward Store"
          />
        </Scene>
        <Scene key="parent">
          <Scene key="parentHome" component={ParentHome} title="Parent Home" />
          <Scene
            rightTitle="Add Chore"
            onRight={() => {
              Actions.choreCreate();
            }}
            key="parentChoreList"
            component={ParentChoreList}
            title="Parent Chore List"
          />
          <Scene
            rightTitle="Add Reward"
            onRight={() => {
              Actions.rewardCreate();
            }}
            key="parentRewardList"
            component={ParentRewardList}
            title="Parent Reward List"
          />
          <Scene
            key="completionRequests"
            component={CompletionRequests}
            title="Completion Requests"
          />
          <Scene key="choreCreate" component={ChoreCreate} title="New Chore" />
          <Scene
            key="rewardCreate"
            component={RewardCreate}
            title="New New Reward"
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
