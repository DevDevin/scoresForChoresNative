import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  BackHandler
  // Modal
} from "react-native";
import Modal from "react-native-modal";
import Spinner from "react-native-loading-spinner-overlay";
import { Actions } from "react-native-router-flux";
import {
  setActiveUser,
  loadingUsersStart,
  userDelete,
  userUpdate
} from "../../actions/AuthActions";
import {
  userEditParent,
  choreDeleteByUser,
  rewardRequestsDeleteByUser,
  rewardEarnedDeleteByUser
} from "../../actions/ParentActions";
import { Input, CardSection, Button } from "../common";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

class EditDeleteUserListItem extends Component {
  state = {
    isModalVisible: false,
    enteredPassword: "",
    loginError: ""
  };

  onDelete(user) {
    Alert.alert(
      "Logout",
      `Are you sure you want to delete the user: ${user.name}`,
      [
        {
          text: "No",
          onPress: () => {
            // this.toggleModal();
          },
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            //choreDeleteByUser
            this.props.choreDeleteByUser(user.name);

            this.props.userDelete(user.uid);

            //rewards earned
            this.props.rewardEarnedDeleteByUser(user.name);

            // //reward requests
            this.props.rewardRequestsDeleteByUser(user.name);

            this.toggleModal();
            // this.props.setActiveUser(activeUserObject);
          }
        }
      ],
      { cancelable: false }
    );
  }

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    });
  };

  ///// back button example ////////
  componentDidMount() {
    loc(this);
    // this._start();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    rol();
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    // ToastAndroid.show("Back button is pressed", ToastAndroid.SHORT);
    Actions.manageUsers();
    return true;
  }

  ////////////////////////////////////////

  // I just need to update the userForm data to be the current user that is clicked on
  setUserFormData = objUser => {
    // set the user form data
    //set a prop that let's me know if it is the admin editing or not

    this.props.userUpdate({ prop: "name", value: objUser.name });
    this.props.userUpdate({ prop: "email", value: objUser.email });
    this.props.userUpdate({ prop: "uid", value: objUser.uid });
    this.props.userUpdate({ prop: "password1", value: objUser.password });
    this.props.userUpdate({ prop: "password2", value: objUser.password });
    this.props.userUpdate({ prop: "status", value: objUser.status });
    this.props.userUpdate({
      prop: "earnedPoints",
      value: objUser.earnedPoints
    });
    // TODO: I will need to update the email, password, and username props as well.
    // TODO: then I till need to make sure that all of the other objects get updated along with the new name
    // TODO: childHome still being called sometimes. I need to get to the bottom of this.

    /// why is childHome getting called whenever I navigate to the user edit???
    Actions.userEdit();
    this.toggleModal();
  };

  rendorError() {
    return (
      <View>
        <Text style={styles.errorTextStyle}>{this.state.loginError} </Text>
      </View>
    );
  }

  renderDeleteButton() {
    if (this.props.user.status === "child") {
      return (
        <View
          style={{
            borderBottomWidth: 1,
            padding: wp("3%"),
            backgroundColor: "#fff",
            justifyContent: "flex-start",
            borderColor: "#ddd",
            position: "relative"
          }}
        >
          <Button onPress={this.onDelete.bind(this, this.props.user)}>
            Delete {this.props.user.name}
          </Button>
        </View>
      );
    } else {
      return <View></View>;
    }
  }

  renderSpinner() {
    if (this.props.loading) {
      return (
        <Spinner
          visible={true}
          textContent={"Loading..."}
          // textStyle={styles.spinnerTextStyle}
          textStyle={{ color: "#FFF" }}
          overlayColor="blue"
        />
      );
    }

    return <View></View>;
  }

  render() {
    const enteredPassword = this.state.enteredPassword;
    const { name, password } = this.props.user;

    // const password = this.props.users;

    var width = Dimensions.get("window").width; //full width
    var height = Dimensions.get("window").height; //full height

    return (
      <View style={{ width: wp("90%"), alignSelf: "center" }}>
        <TouchableWithoutFeedback
          value={this.props.user.name}
          onPress={this.toggleModal}
          // onPress={this.onRowPress.bind(this, this.props.user)}
        >
          <View style={styles.childStyle}>
            <View style={styles.cardSectionStyle}>
              <Image source={require("../../Images/genericUser.png")} />
              <Text style={styles.titleStyle}>{name}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <Modal isVisible={this.state.isModalVisible}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
              // backgroundColor: "grey"
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <CardSection>
                <View style={styles.containerStyle}>
                  <View style={styles.cardSectionStyle}>
                    <Image source={require("../../Images/genericUser.png")} />
                  </View>
                </View>
              </CardSection>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                padding: wp("3%"),
                backgroundColor: "#fff",
                justifyContent: "flex-start",
                borderColor: "#ddd",
                position: "relative"
              }}
            >
              <Button
                onPress={this.setUserFormData.bind(this, this.props.user)}
              >
                Edit {this.props.user.name}'s Profile
              </Button>
            </View>

            {this.renderDeleteButton()}

            <View
              style={{
                // borderBottomWidth: 1,
                padding: wp("3%"),
                backgroundColor: "#fff",
                justifyContent: "flex-start",
                borderColor: "#ddd",
                position: "relative"
              }}
            >
              <Button onPress={this.toggleModal}>Cancel</Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: wp("6%")
  },
  textStyle: {
    alignSelf: "center",
    // fontSize: 16,
    fontWeight: "600"
    // paddingTop: 10,
    // paddingBottom: 10
  },
  childStyle: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    // borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    // marginLeft: 5,
    // marginRight: 5,
    // marginTop: wp("2%"),
    marginTop: wp("2%"),
    backgroundColor: "powderblue"
    // width: Dimensions.get("window").width
  },
  cardSectionStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: wp("2%"),
    marginBottom: wp("1%")
  },
  errorTextStyle: {
    fontSize: wp("6%"),
    alignSelf: "center",
    color: "red"
  },
  containerStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "powderblue"
    // backgroundColor: "powderblue"
  }
};

const mapStateToProps = state => {
  return {
    activeUser: state.auth.activeUser,
    users: state.users,
    loading: state.loading.loading
  };
};

export default connect(mapStateToProps, {
  setActiveUser,
  loadingUsersStart,
  userDelete,
  userUpdate,
  userEditParent,
  choreDeleteByUser,
  rewardRequestsDeleteByUser,
  rewardEarnedDeleteByUser
})(EditDeleteUserListItem);
