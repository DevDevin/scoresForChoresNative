import React, { Component } from "react";
import _ from "lodash";
import { View, Picker } from "react-native";
import CheckBox from "react-native-check-box";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import { connect } from "react-redux";
import { choreUpdate } from "../../actions/ParentActions";
import { usersFetch } from "../../actions/AuthActions";
import { CardSection, Input } from "../common/index";

class ChoreForm extends Component {
  // Initital State Data
  state = {
    isOther: false,
    isRecurring: false,
    child: ""
  };
  componentDidMount() {
    console.log("ComponentWillMount");
    this.props.choreUpdate({
      prop: "isRecurring",
      value: false
    });

    // fetch users for dropdown
    this.props.usersFetch();
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

    const users = this.props.users;

    const children = _.filter(users, function(item) {
      console.log("inside filter");
      console.log("item.status: ", item.status, "-item.name");
      return item.status === "child";
    });

    console.log("children: ", children);

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
          <Picker
            selectedValue={this.state.child}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => {
              console.log("inside of set child: ", itemValue);
              this.props.choreUpdate({ prop: "child", value: itemValue });
              this.setState({ child: itemValue });
            }}
          >
            {children.map(function(child) {
              return <Picker.Item label={child.name} value={child.name} />;
            })}
          </Picker>
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
    isRecurring,
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { choreUpdate, usersFetch }
)(ChoreForm);
