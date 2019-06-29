import React from "react";
import { View } from "react-native";

const Card = props => {
  return <View style={styles.ContainerStyle}>{props.children}</View>;
};

const styles = {
  ContainerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
};

export { Card };
// when using pass through files to pass in multiple components the export syntax of those components needs to be
// as seen above.
