import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

class RequestRejectReason extends Component {
  componentDidMount() {
    console.log("props: ", this.props);
  }
  // onReject(cid, choreName, day, child, description, pointsValue) {
  //   this.props.requestReject(
  //     cid,
  //     choreName,
  //     day,
  //     child,
  //     description,
  //     pointsValue
  //   );
  // }

  render() {
    return (
      <View>
        <Text>Reason </Text>
        {/* <TouchableOpacity
          onPress={this.onReject.bind(
            this,
            cid,
            choreName,
            day,
            child,    
            description,
            pointsValue
          )}
        >
          <Text>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>close</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

export default RequestRejectReason;
