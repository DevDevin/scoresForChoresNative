import React, { Component } from "react";
import { View, Picker } from "react-native";
import { connect } from "react-redux";
import { userUpdate } from "../actions/AuthActions";
import { CardSection, Input } from "./common";
import RadioForm from "react-native-simple-radio-button";

class UserForm extends Component {
  render() {
    var radio_props = [
      { label: "Parent", value: "Parent" },
      { label: "Child", value: "Child" }
    ];
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
            label="Password"
            placeholder="password"
            value={this.props.password1}
            onChangeText={value =>
              this.props.userUpdate({ prop: "password1", value })
            }
          />
        </CardSection>

        <CardSection>
          <Input
            label="Confirm"
            placeholder="confirm password"
            value={this.props.password2}
            onChangeText={value =>
              this.props.userUpdate({ prop: "password2", value })
            }
          />
        </CardSection>
        <CardSection>
          <View>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={value => {
                this.props.userUpdate({ prop: "status", value });
              }}
            />
          </View>
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { name, phone, password1, status, email } = state.userForm;

  return { name, phone, password1, status, email };
};

export default connect(mapStateToProps, { userUpdate })(UserForm);
