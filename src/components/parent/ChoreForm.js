import React, { Component } from "react";
import { View, Picker } from "react-native";
import { connect } from "react-redux";
import { choreUpdate } from "../../actions/ParentActions";
import { CardSection, Input } from "../common/index";

class ChoreForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="ChoreName"
            placeholder="Dishes"
            value={this.props.choreName}
            onChangeText={value =>
              this.props.choreUpdate({ prop: "choreName", value: value })
            }
          />
        </CardSection>

        <CardSection>
          <Input
            label="Desicription"
            placeholder="A brief description of the chore."
            value={this.props.description}
            onChangeText={value =>
              this.props.choreUpdate({ prop: "email", value: value })
            }
          />
        </CardSection>

        <CardSection>
          <Input
            label="Child"
            placeholder="Child the chore is assigned to."
            value={this.props.child}
            onChangeText={value =>
              this.props.choreUpdate({ prop: "child", value: value })
            }
          />
        </CardSection>

        <CardSection>
          <Input
            label="Points"
            placeholder="Points the chore is worth."
            value={this.props.pointsValue}
            onChangeText={value =>
              this.props.choreUpdate({ prop: "pointsValue", value: value })
            }
          />
        </CardSection>

        <CardSection>
          <Picker
            selectedValue={this.props.status}
            style={{ height: 50, flex: 1, position: "relative" }}
            onValueChange={value => {
              this.props.choreUpdate({ prop: "day", value });
            }}
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { choreName, description, day, child, pointsValue } = state.choreForm;

  return { choreName, description, day, child, pointsValue };
};

export default connect(
  mapStateToProps,
  { choreUpdate }
)(ChoreForm);
