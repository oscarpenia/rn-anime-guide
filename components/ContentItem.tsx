import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ISeriesItem } from "../model/SeriesItem";

interface IContentItemProps {
  item: ISeriesItem;
}

const ContentItem = (props: IContentItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.touchable}>
        <TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: props.item.posterImage_tiny }}
            />
            <View style={styles.titleContainer}>
              <Text
                adjustsFontSizeToFit={true}
                allowFontScaling={true}
                numberOfLines={2}
                style={styles.title}
              >
                {props.item.canonicalTitle}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "90%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  titleContainer: {
    alignContent: "center",
  },
  title: {
    fontSize: 18,
    marginTop: 5,
    textAlign: "center",
  },
  itemContainer: {
    width: 150,
    height: 220,
    margin: 5,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: -9, height: -13 },
    shadowRadius: 15,
    borderRadius: 10,
    backgroundColor: "white",
  },
});

export default ContentItem;
