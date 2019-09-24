import React from "react";
import { Scene, Router, Actions, Drawer } from "react-native-router-flux";
import { Dimensions } from "react-native";
import ChooseUser from "./components/ChooseUser";
import LoginForm from "./components/LoginForm";
import UserCreate from "./components/UserCreate";
import ChildHome from "./components/child/ChildHome";
import ParentHome from "./components/parent/ParentHome";
import ParentChoreList from "./components/parent/ParentChoreList";
import ParentRewardList from "./components/parent/ParentRewardList";
import CompletionRequestList from "./components/parent/CompletionRequestList";
import ChildChoreList from "./components/child/ChildChoreList";
import ChildRewardStore from "./components/child/ChildRewardStore";
import ChoreCreate from "./components/parent/ChoreCreate";
import RewardCreate from "./components/parent/RewardCreate";
import ChoreEdit from "./components/parent/ChoreEdit";
import StartupPage from "./components/StartupPage";
import EarnedRewardsList from "./components/child/EarnedRewardsList";
import RewardRequestList from "./components/parent/RewardRequestList";
import SignUpForm from "./components/SignUpForm";
import AdminUserCreate from "./components/parent/AdminUserCreate";
import ChildSideMenu from "./components/child/ChildSideMenu";
import ParentSideMenu from "./components/parent/ParentSideMenu";
import { logoutAuth } from "./actions/AuthActions";
import RequestRejectReason from "./components/parent/RequestRejectReason";
import ChoreReset from "./components/parent/ChoreReset";

// I can somehow use drawer for to create a dropdown with a logout and home button

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene
          key="startup"
          component={StartupPage}
          title="Scores For Chores"
          initial
        />
        <Scene key="login" component={LoginForm} title="Please Login" />
        <Scene
          key="adminUserCreate"
          component={AdminUserCreate}
          title="Please Create Admin User"
        />
        <Scene key="signUp" component={SignUpForm} title="Create an Account" />
        <Scene
          rightTitle="Log Out"
          onRight={() => {
            logoutAuth();
          }}
          key="chooseUser"
          component={ChooseUser}
          title="Choose User"
        />
        <Scene key="userCreate" component={UserCreate} title="Create User" />
        <Drawer
          hideNavBar
          drawerPosition={"right"}
          contentComponent={ChildSideMenu}
          drawerWidth={Dimensions.get("window").width * 0.4}
        >
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
            rightTitle="Earned Rewards"
            onRight={() => {
              Actions.earnedRewards();
            }}
          />
          <Scene
            key="earnedRewards"
            component={EarnedRewardsList}
            title="Earned Rewards"
          />
          <Scene
            key="startup"
            component={StartupPage}
            title="Scores For Chores"
          />
          <Scene
            rightTitle="Log Out"
            onRight={() => {
              logoutAuth();
            }}
            key="chooseUser"
            component={ChooseUser}
            title="Choose User"
          />
        </Drawer>
        <Drawer
          hideNavBar
          drawerPosition={"right"}
          contentComponent={ParentSideMenu}
          drawerWidth={Dimensions.get("window").width * 0.4}
        >
          <Scene key="parentHome" component={ParentHome} title="Parent Home" />
          {/* <Drawer
              hideNavBar
              drawerPosition={"right"}
              contentComponent={ChildSideMenu}
              drawerWidth={Dimensions.get("window").width * 0.4}
            > */}
          <Scene
            key="parentChoreList"
            component={ParentChoreList}
            title="Parent Chore List"
          />
          <Scene key="choreReset" component={ChoreReset} title="Reset Chores" />
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
            key="rewardRequestList"
            component={RewardRequestList}
            title="Rewards Requests"
          />
          <Scene key="requestReject" component={RequestRejectReason} title="" />
          <Scene
            key="completionRequestList"
            component={CompletionRequestList}
            title="Completion Requests"
          />
          <Scene key="choreCreate" component={ChoreCreate} title="New Chore" />
          <Scene key="choreEdit" component={ChoreEdit} title="Edit Chore" />
          <Scene
            key="rewardCreate"
            component={RewardCreate}
            title="New New Reward"
          />
          <Scene
            key="startup"
            component={StartupPage}
            title="Scores For Chores"
          />
          <Scene
            rightTitle="Log Out"
            onRight={() => {
              logoutAuth();
            }}
            key="chooseUser"
            component={ChooseUser}
            title="Choose User"
          />
        </Drawer>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
