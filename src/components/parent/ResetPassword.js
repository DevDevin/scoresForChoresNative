import React, { Component } from "react";
import _ from "lodash";
import { View, Text, Picker, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { usersFetch, passwordReset } from "../../actions/AuthActions";

class ResetPassword extends Component {
  state = {
    user: ""
  };

  render() {
    const users = this.props.users;
    const user = this.state.user;

    console.log("users: ", users);

    return (
      <View>
        <Text>Reset Password</Text>
        <Picker
          selectedValue={this.state.user}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ user: itemValue })
          }
        >
          {users.map(function(user) {
            return (
              <Picker.Item label={user.name} value={user.name} key={user.uid} />
            );
          })}
        </Picker>
        <TouchableOpacity
          onPress={() => {
            console.log("user", user);
            this.props.passwordReset(user);
          }}
        >
          <View>
            <Text>Reset Password</Text>
          </View>
        </TouchableOpacity>
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
