import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ISeriesItem } from "../model/seriesItem";

interface IContentItemProps {
  item: ISeriesItem;
  contentType?: string;
  navigation: any;
  containerStyle: any;
  textStyle: any;
}

const ContentItem = (props: IContentItemProps) => {
  const onSelectItem = () => {
    props.navigation.navigate({
      routeName: "DetailView",
      params: {
        item: props.item,
      },
    });
  };

  return (
    <View style={{ ...props.containerStyle }}>
      <View style={styles.touchable}>
        <TouchableOpacity onPress={() => onSelectItem()}>
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
                style={{ ...props.textStyle }}
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
});

export default ContentItem;
