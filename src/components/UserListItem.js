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
  Modal
} from "react-native";
// import Modal from "react-native-modal";
import Spinner from "react-native-loading-spinner-overlay";
import { Actions } from "react-native-router-flux";
import { setActiveUser, loadingUsersStart } from "../actions/AuthActions";
import { Input, CardSection, Button } from "./common";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from "react-native-responsive-screen";

class UserListItem extends Component {
  state = {
    isModalVisible: false,
    enteredPassword: "",
    loginError: ""
  };

  componentDidMount() {
    loc(this);
  }

  componentWillUnmount() {
    rol();
  }

  onSignIn(password, activeUser) {
    if (password === this.state.enteredPassword) {
      this.props.loadingUsersStart();

      // redirect to parent or child depending on the user status
      this.props.setActiveUser(activeUser);

      if (activeUser.status === "parent") {
        this.setState({ isModalVisible: false });
        Actions.parent();
      } else {
        this.setState({ isModalVisible: false });
        Actions.child();
      }
    } else {
      this.setState({ loginError: "Incorrect Password" });
      Alert.alert(
        "Incorrect Password",
        "Please Try Again",
        [
          {
            text: "Okay",
            // onPress: () => Actions.chooseUser(),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    }
  }

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    });
  };

  rendorError() {
    return (
      <View>
        <Text>{this.state.loginError} </Text>
      </View>
    );
  }

  renderSpinner() {
    if (this.props.loading) {
      return (
        <Spinner
          visible={true}
          textContent={"Loading..."}
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
      <View>
        <View style={{ width: wp("90%"), alignSelf: "center" }}>
          <TouchableWithoutFeedback
            value={this.props.user.name}
            onPress={this.toggleModal}
            // onPress={this.onRowPress.bind(this, this.props.user)}
          >
            <View style={styles.childStyle}>
              <View style={styles.cardSectionStyle}>
                <Image source={require("../Images/genericUser.png")} />
                <Text style={styles.titleStyle}>{name}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <Modal
          visible={this.state.isModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "#EFEFF4"
            }}
          >
            <View
              style={{
                height: hp("9%"),
                backgroundColor: "steelblue",
                alignItems: "center",
                justifyContent: "center",
                elevation: 3
              }}
            >
              <Text style={{ fontSize: wp("6.5%") }}>Enter Password</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  borderBottomWidth: 1,
                  padding: wp("3%"),
                  backgroundColor: "#fff",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  borderColor: "#ddd",
                  position: "relative"
                }}
              >
                <View style={styles.containerStyle}>
                  <Text style={styles.labelStyle}>Password</Text>
                  <TextInput
                    secureTextEntry
                    autoCorrect={false}
                    style={styles.inputStyle}
                    placeholder="Password"
                    value={this.state.enteredPassword}
                    onChangeText={value => {
                      this.setState({ enteredPassword: value });
                    }}
                  />
                </View>
              </View>
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
                onPress={this.onSignIn.bind(this, password, this.props.user)}
              >
                Submit
              </Button>
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
              <Button onPress={this.toggleModal}>Close</Button>
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
  childStyle: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    marginTop: wp("2%"),
    backgroundColor: "skyblue"
  },
  cardSectionStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: wp("2%")
  },
  inputStyle: {
    paddingRight: wp("3%"),
    paddingLeft: wp("3.5%"),
    fontSize: wp("4.5%"),
    flex: 2
  },
  labelStyle: {
    fontSize: wp("5%"),
    flex: 1
  },
  containerStyle: {
    height: wp("10%"),
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  }
};

const mapStateToProps = state => {
  return {
    activeUser: state.auth.activeUser,
    users: state.users,
    loading: state.loading.loading
  };
};

export default connect(mapStateToProps, { setActiveUser, loadingUsersStart })(
  UserListItem
);
