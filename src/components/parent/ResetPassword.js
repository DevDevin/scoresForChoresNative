import React, { Component } from "react";
import _ from "lodash";
import { View, Text, Picker, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { usersFetch, passwordReset } from "../../actions/AuthActions";
import { CardSection, Input } from "../common";

class ResetPassword extends Component {
  state = {
    user: "nothing",
    password1: "",
    password2: "",
    passwordMismatch: false,
    userNothing: false
  };

  renderMismatch() {
    if (this.state.passwordMismatch) {
      return (
        <View>
          <Text style={{ color: "red" }}>Passwords Do Not Match</Text>
        </View>
      );
    }
    return <View></View>;
  }

  renderUserNothing() {
    if (this.state.userNothing) {
      return (
        <View>
          <Text style={{ color: "red" }}>User not selected.</Text>
        </View>
      );
    }
    return <View></View>;
  }

  render() {
    const users = this.props.users;
    const user = this.state.user;

    return (
      <View>
        <Text>Reset Password</Text>
        {this.renderUserNothing()}
        <Picker
          selectedValue={this.state.user}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ user: itemValue, userNothing: false })
          }
        >
          <Picker.Item label="Choose User" value="nothing" key="null" />
          {users.map(function(user) {
            return (
              <Picker.Item label={user.name} value={user.uid} key={user.uid} />
            );
          })}
        </Picker>
        <TouchableOpacity
          onPress={() => {
            if (
              this.state.password1 === this.state.password2 &&
              this.state.user != "nothing"
            ) {
              this.props.passwordReset(user, this.state.password1);
            } else {
              if (this.state.password1 != this.state.password2) {
                this.setState({ passwordMismatch: true });
              }
              if (this.state.user === "nothing") {
                this.setState({ userNothing: true });
              }
            }
          }}
        >
          <View>
            <Text>Reset Password</Text>
          </View>
        </TouchableOpacity>
        <CardSection>
          <Input
            label="password"
            placeholder="password"
            value={this.state.passwordReset}
            onChangeText={value => this.setState({ password1: value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="passwordConfirm"
            placeholder="confirm password"
            value={this.state.password2}
            onChangeText={value => this.setState({ password2: value })}
          />
        </CardSection>
        {this.renderMismatch()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  ///bring in users
  const users = _.map(state.users, (val, uid) => {
    return { ...val, uid };
  });

  return { users: users };
};

export default connect(
  mapStateToProps,
  { usersFetch, passwordReset }
)(ResetPassword);
