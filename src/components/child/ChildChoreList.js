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
  state = {
    choreStatus: "All"
  };
  componentWillMount() {
    this.props.childChoresFetch(this.props.activeUser.name);
    console.log("this.state.choreStatus: ", this.state.choreStatus);
  }

  toggleChores = e => {
    //////////
    console.log("e.value: ", e);
    this.setState({ choreStatus: e });
  };

  render() {
    var radio_props = [
      { label: "All", value: "All" },
      { label: "In-Progress", value: "In-Progress" },
      { label: "Complete", value: "Complete" },
      { label: "Submitted", value: "Submitted" }
    ];
    const chores = this.props.childChores;
    console.log("chores: ", chores);
    const choreStatus = this.state.choreStatus;

    let filteredChores;
    // need to find a way to pass this.state.choreStatus into this function
    if (choreStatus === "All") {
      filteredChores = chores;
    } else {
      filteredChores = _.filter(chores, function(e) {
        console.log(choreStatus);
        return e.status === choreStatus;
      });
    }

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 5
          }}
        >
          <RadioForm
            radio_props={radio_props}
            formHorizontal={true}
            initial={0}
            labelHorizontal={false}
            onPress={e => {
              this.toggleChores(e);
            }}
          />
        </View>

        <FlatList
          data={filteredChores}
          renderItem={({ item }) => <ChildChoreListItem chore={item} />}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const chores = _.map(state.chores, (val, cid) => {
    return { ...val, cid };
  });

  return { childChores: chores, activeUser: state.auth.activeUser };
};
export default connect(
  mapStateToProps,
  { childChoresFetch }
)(ChildChoreList);
