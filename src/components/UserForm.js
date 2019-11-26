import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import { userUpdate } from "../actions/AuthActions";
import { CardSection, Input } from "./common";
import RadioForm from "react-native-simple-radio-button";

class UserForm extends Component {
  componentDidMount() {
    // reset props when opening form
    this.props.userUpdate({ prop: "name", value: "" });
    this.props.userUpdate({ prop: "email", value: 0 });
    this.props.userUpdate({ prop: "password1", value: "" });
    this.props.userUpdate({ prop: "password2", value: "" });
    this.props.userUpdate({ prop: "status", value: "Child" });
  }

  render() {
    return (
      <View>
        <CardSection>
          <Text style={styles.labelStyle}>Name</Text>
          <TextInput
            placeholder="Jane"
            autoCorrect={false}
            style={styles.inputStyle}
            value={this.props.name}
            onChangeText={value =>
              this.props.userUpdate({ prop: "name", value })
            }
          />
        </CardSection>

        <CardSection>
          <Text style={styles.labelStyle}>Email</Text>
          <TextInput
            placeholder="example@example.com"
            autoCorrect={false}
            style={styles.inputStyle}
            value={this.props.emails}
            onChangeText={value =>
              this.props.userUpdate({ prop: "email", value })
            }
          />
        </CardSection>

        <CardSection>
          <Text style={styles.labelStyle}>Password</Text>
          <TextInput
            secureTextEntry
            placeholder="enter password here"
            autoCorrect={false}
            style={styles.inputStyle}
            value={this.props.password1}
            onChangeText={value =>
              this.props.userUpdate({ prop: "password1", value })
            }
          />
        </CardSection>

        <CardSection>
          <Text style={styles.labelStyle}>Confirm</Text>
          <TextInput
            secureTextEntry
            placeholder="confirm password here"
            autoCorrect={false}
            style={styles.inputStyle}
            value={this.props.password2}
            onChangeText={value =>
              this.props.userUpdate({ prop: "password2", value })
            }
          />
        </CardSection>
      </View>
    );
  }
}

const styles = {
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
    flex: 1,
    alignSelf: "center"
  },
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#ddd",
    position: "relative"
  }
};
const mapStateToProps = state => {
  const { name, phone, password1, password2, status, email } = state.userForm;

  return { name, phone, password1, password2, status, email };
};

export default connect(mapStateToProps, { userUpdate })(UserForm);
