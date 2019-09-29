import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import Modal from "react-native-modal";
import { Actions } from "react-native-router-flux";
import { setActiveUser } from "../actions/AuthActions";
import { Input, Spinner } from "./common";

class UserListItem extends Component {
  state = {
    isModalVisible: false,
    enteredPassword: "",
    loginError: ""
  };

  onSignIn(password, activeUser) {
    console.log(
      "entered password: ",
      this.state.enteredPassword,
      " password: ",
      password
    );

    console.log("activeUser: ", activeUser);

    if (password === this.state.enteredPassword) {
      // redirect to parent or child depending on the user status
      console.log(console.log("activeUser.status", activeUser));
      this.props.setActiveUser(activeUser);

      if (activeUser.status === "parent") {
        Actions.parentHome();
      } else {
        this.setState({ isModalVisible: false });
        Actions.childHome();
      }
    } else {
      console.log("did not match");
      this.setState({ loginError: "Incorrect Password" });
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

  render() {
    const enteredPassword = this.state.enteredPassword;
    const { name, password } = this.props.user;
    console.log("user prop: ", this.props.user);

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
              justifyContent: "center"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 10
              }}
            >
              <Input
                label="Password"
                placeholder="password"
                value={this.state.enteredPassword}
                onChangeText={value => {
                  this.setState({ enteredPassword: value });
                  console.log(
                    "this.state.enteredPass: ",
                    this.state.enteredPassword
                  );
                }}
              />
              <TouchableOpacity
                onPress={password => {
                  this.toggleModal(password);
                }}
              >
                <Text>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.onSignIn.bind(this, password, this.props.user)}
              >
                <Text>Go</Text>
              </TouchableOpacity>
            </View>
          </View>
          {this.rendorError()}
        </Modal>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 24
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
    backgroundColor: "powderblue",
    width: Dimensions.get("window").width
  },
  cardSectionStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    // backgroundColor: "#d67d72",

    alignItems: "center"
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  }
};

const mapStateToProps = state => {
  return {
    activeUser: state.auth.activeUser,
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { setActiveUser }
)(UserListItem);
