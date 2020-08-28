import React, { useState } from "react";
import { View, TextInput, Text, Button, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

//Defining interface Searchbar prop
interface ISearchBarProps {
  onChangeValue: Function;
}

const SearchBar = (props: ISearchBarProps) => {
  const onChangeInputText = (value: string) => {
    props.onChangeValue(value);
  };

  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.textInput}
        onEndEditing={(e) => onChangeInputText(e.nativeEvent.text)}
        keyboardType="default"
        placeholder="What are you searching for"
        //value={currentValue}
      />
    </View>
  );
};

SearchBar.navigationOptions = () => {};

const styles = StyleSheet.create({
  screen: {
    flexDirection: "row",
    marginTop: 5,
    padding: 10,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: -9, height: -13 },
    shadowRadius: 15,
    borderRadius: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
  },
  textInput: {
    width: "100%",
    height: "100%",
    fontSize: 25,
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
});

export default SearchBar;
