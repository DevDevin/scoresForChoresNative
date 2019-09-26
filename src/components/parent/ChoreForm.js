import React, { Component } from "react";
import { View } from "react-native";
import CheckBox from "react-native-check-box";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import { connect } from "react-redux";
import { choreUpdate } from "../../actions/ParentActions";
import { CardSection, Input } from "../common/index";

class ChoreForm extends Component {
  // Initital State Data
  state = {
    isOther: false,
    isRecurring: false
  };
  componentDidMount() {
    console.log("ComponentWillMount");
    this.props.choreUpdate({
      prop: "isRecurring",
      value: false
    });
  }

  onCheckBoxClicked(isRecurring) {
    console.log("this.state.isRecurring old: ", this.state.isRecurring);
    this.setState({
      isRecurring: !this.state.isRecurring
    });
    console.log("this.state.isRecurring new: ", this.state.isRecurring);
    this.props.choreUpdate({
      prop: "isRecurring",
      value: !this.state.isRecurring
    });
  }

  render() {
    var radio_props = [
      { label: "Daily", value: "Daily" },
      { label: "Monday-Wednesday-Friday", value: "Monday-Wednesday-Friday" },
      { label: "Tuesday-Thursday", value: "Tuesday-Thursday" },
      { label: "Monday", value: "Monday" },
      { label: "Tuesday", value: "Tuesday" },
      { label: "Wednesday", value: "Wednesday" },
      { label: "Thursday", value: "Thursday" },
      { label: "Friday", value: "Friday" },
      { label: "Saturday", value: "Saturday" },
      { label: "Sunday", value: "Sunday" }
    ];

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
          <View>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={value => {
                console.log("radio value: ", value);
                if (value === "other") {
                  this.setState({ isOther: true });
                }
                this.props.choreUpdate({
                  prop: "day",
                  value: value
                });
              }}
            />
          </View>
        </CardSection>

        <CardSection>
          <CheckBox
            style={{ flex: 1, padding: 10 }}
            onClick={() => {
              this.onCheckBoxClicked();
              // this.setState({ isRecurring: !this.state.isRecurring });
            }}
            isChecked={this.state.isRecurring}
            leftText={"Recurring"}
          />
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {
    choreName,
    description,
    day,
    child,
    pointsValue,
    isRecurring
  } = state.choreForm;

  return {
    choreName,
    description,
    day,
    child,
    pointsValue,
    isRecurring
  };
};

export default connect(
  mapStateToProps,
  { choreUpdate }
)(ChoreForm);
