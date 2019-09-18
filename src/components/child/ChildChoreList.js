import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList } from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import { childChoresFetch } from "../../actions/ChildActions";
import ChildChoreListItem from "./ChildChoreListItem";
import { Text, View } from "react-native";
import { CardSection } from "../common/index";

class ChildChoreList extends Component {
  componentWillMount() {
    this.props.childChoresFetch(this.props.activeUser.name);
  }

  toggleChores = () => {
    //////////
  };

  render() {
    var radio_props = [
      { label: "In-Progress/Rework", value: "In-Progress/Rework" },
      { label: "Complete", value: "Complete" },
      { label: "Submitted", value: "Submitted" }
    ];
    const chores = this.props.childChores;
    console.log("chores: ", chores);

    return (
      <View>
        <CardSection>
          <View>
            <RadioForm
              style={{ justifyContent: "center", alignItems: "center" }}
              radio_props={radio_props}
              formHorizontal={true}
              initial={0}
              labelHorizontal={true}
              onPress={this.toggleChores}
            />
          </View>
        </CardSection>
        <FlatList
          data={chores}
          renderItem={({ item }) => <ChildChoreListItem chore={item} />}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log("state.auth.activeUser.name", state.auth.activeUser.name);

  const childChores = _.map(state.chores, (val, cid) => {
    // i could do the filtering for completed, in progress, and submitted chores in here.
    console.log("val: ", val.child);
    return { ...val, cid };
  });

  return { childChores: childChores, activeUser: state.auth.activeUser };
};
export default connect(
  mapStateToProps,
  { childChoresFetch }
)(ChildChoreList);
