import React, { Component } from "react";
import { View, Text, Picker } from "react-native";
import { connect } from "react-redux";
import { userUpdate } from "../../actions/AuthActions";
import { CardSection, Input } from "../common";

class AdminUserForm extends Component {
  state = {
    passwordMismatch: false
  };
  componentDidMount() {
    // reset props when opening form
    this.props.userUpdate({ prop: "name", value: "" });
    this.props.userUpdate({ prop: "email", value: 0 });
    this.props.userUpdate({ prop: "password1", value: "" });
    this.props.userUpdate({ prop: "password2", value: "" });
    this.props.userUpdate({ prop: "phone", value: "" });
  }

  renderPasswordMessage() {
    console.log(
      "password1: ",
      this.props.password1,
      " password2: ",
      this.props.password2
    );
    if (this.props.password1 === this.props.password2) {
      console.log("do match");
      return <View></View>;
    } else {
      console.log("dont match");
      return (
        <View>
          <Text style={{ color: "white", fontSize: 22 }}>
            Passwords Do Not Match
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View>
        <View
          style={{
            borderBottomWidth: 1,
            padding: 5,
            backgroundColor: "#fff",
            borderColor: "#ddd",
            alignItems: "center",
            padding: 10,
            backgroundColor: "steelblue",
            elevation: 5
          }}
        >
          <Text style={{ fontSize: 20 }}>Create Admin User</Text>
        </View>
        <CardSection>
          <Input
            label="Name"
            placeholder="Jane"
            value={this.props.name}
            onChangeText={value =>
              this.props.userUpdate({ prop: "name", value })
            }
          />
        </CardSection>

        <CardSection>
          <Input
            label="Email"
            placeholder="johndoe@gmail.com"
            value={this.props.email}
            onChangeText={value =>
              this.props.userUpdate({ prop: "email", value })
            }
          />
        </CardSection>

        <CardSection>
          <Input
            label="Phone"
            placeholder="555-555-5555"
            value={this.props.phone}
            onChangeText={value =>
              this.props.userUpdate({ prop: "phone", value })
            }
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="Password"
            value={this.props.password1}
            onChangeText={value =>
              this.props.userUpdate({ prop: "password1", value })
            }
          />
        </CardSection>
        {this.renderPasswordMessage()}

        <CardSection>
          <Input
            secureTextEntry
            label="Confirm"
            placeholder="Confirm Password"
            value={this.props.password2}
            onChangeText={value => {
              this.props.userUpdate({ prop: "password2", value });
            }}
          />
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { name, phone, password1, status, email, password2 } = state.userForm;

  return { name, phone, password1, status, email, password2 };
};

export default connect(mapStateToProps, { userUpdate })(AdminUserForm);
