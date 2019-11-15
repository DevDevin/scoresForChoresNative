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
  TextInput
} from "react-native";
import Modal from "react-native-modal";
import Spinner from "react-native-loading-spinner-overlay";
import { Actions } from "react-native-router-flux";
import { setActiveUser, loadingUsersStart } from "../actions/AuthActions";
import { Input, CardSection } from "./common";

class UserListItem extends Component {
  state = {
    isModalVisible: false,
    enteredPassword: "test",
    loginError: ""
  };

  onSignIn(password, activeUser) {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    });

    if (password === this.state.enteredPassword) {
      this.props.loadingUsersStart();

      // redirect to parent or child depending on the user status
      this.props.setActiveUser(activeUser);

      if (activeUser.status === "parent") {
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
            // onPress: () => console.log("Okay Pressed"),
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
        <Text style={styles.errorTextStyle}>{this.state.loginError} </Text>
      </View>
    );
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
      <View>
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

        <Modal isVisible={this.state.isModalVisible}>
          <View
            style={{
              backgroundColor: "powderblue",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 10
              }}
            ></View> */}
            <CardSection>
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
            </CardSection>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 10
              }}
            >
              <TouchableOpacity
                onPress={this.onSignIn.bind(this, password, this.props.user)}
                style={styles.buttonStyle}
              >
                <Text style={styles.textStyle}>Okay</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.toggleModal}
                style={styles.buttonStyle}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 24
  },
  buttonStyle: {
    width: 100,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007aff",
    marginLeft: 5,
    marginRight: 5
  },
  textStyle: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10
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
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: "powderblue"
    // width: Dimensions.get("window").width
  },
  cardSectionStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  },
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "powderblue",
    borderColor: "powderblue"
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
