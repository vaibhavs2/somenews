import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

type Props = {
  text: string;
  domain: string;
  active: boolean;
  onPress: (domain: string) => void;
};

export default function Chips(props: Props) {
  const [getSelected, setSelected] = useState(props.active);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log("dsadasdsad");
        setSelected(!getSelected);
        props.onPress(props.domain);
      }}
    >
      <View>
        <Text
          style={[
            styles.container,
            { backgroundColor: getSelected ? "green" : "gray" },
          ]}
        >
          {props.text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontWeight: "bold",
    marginVertical: 6,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
  },
});
