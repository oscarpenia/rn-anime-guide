import React from "react";
import { View, Text, StyleSheet, ShadowPropTypesIOS } from "react-native";
import { IGenres } from "../model/SeriesItem";

interface ITextDetail {
  title: string;
  content?: string;
  arrayContent?: IGenres[];
}

const TextDetail = (props: ITextDetail) => {
  let content: string = "";
  if (props.arrayContent) {
    props.arrayContent.map((genre: IGenres) => (content += genre.name + " / "));
  } else if (props.content) {
    content = props.content;
  }

  return (
    <View style={styles.container}>
      <Text numberOfLines={2} style={styles.title}>
        {props.title}
      </Text>
      <Text adjustsFontSizeToFit={true} style={styles.content}>
        {content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    fontSize: 18,
  },
});

export default TextDetail;
