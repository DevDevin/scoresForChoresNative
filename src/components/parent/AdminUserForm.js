import React, { Component } from "react";
import { View, Text, Picker } from "react-native";
import { connect } from "react-redux";
import { userUpdate } from "../../actions/AuthActions";
import { CardSection, Input } from "../common";

class AdminUserForm extends Component {
  render() {
    return (
      <View>
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
            label="password"
            placeholder="password"
            value={this.props.password1}
            onChangeText={value =>
              this.props.userUpdate({ prop: "password1", value })
            }
          />
        </CardSection>

        <CardSection>
          <Input
            label="passwordConfirm"
            placeholder="confirm password"
            value={this.props.password2}
            onChangeText={value =>
              this.props.userUpdate({ prop: "password2", value })
            }
          />
        </CardSection>
        <CardSection>
          <Picker
            selectedValue={this.props.status}
            style={{ height: 50, width: 100, position: "relative" }}
            onValueChange={value => {
              this.props.userUpdate({ prop: "status", value });
            }}
          >
            <Picker.Item label="Parent" value="parent" />
            <Picker.Item label="Child" value="child" />
          </Picker>
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { name, phone, password1, status, email } = state.AdminUserForm;

  return { name, phone, password1, status, email };
};

export default connect(
  mapStateToProps,
  { userUpdate }
)(AdminUserForm);
