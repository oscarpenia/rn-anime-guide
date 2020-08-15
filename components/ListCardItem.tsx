import React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ISeriesItem } from "../model/seriesItem";
import ContentItem from "../components/ContentItem";

interface IListCardItemProps {
  items: ISeriesItem[];
  label: String;
  navigation: any;
  contentType: string;
}

const ListCardItem = (props: IListCardItemProps) => {
  const renderItems = (itemData: any) => {
    return (
      <ContentItem
        containerStyle={styles.itemContainer}
        textStyle={styles.itemTitle}
        item={itemData.item}
        navigation={props.navigation}
        contentType={props.contentType}
      />
    );
  };

  const onPressViewAll = () => {
    props.navigation.navigate({
      routeName: "SectionView",
      params: {
        section: props.contentType,
      },
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>{props.label}</Text>
        <TouchableOpacity onPress={() => onPressViewAll()}>
          <Text style={styles.title}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ width: "100%" }}
        horizontal={true}
        data={props.items}
        renderItem={renderItems}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: 300,
  },
  title: {
    padding: 5,
    fontSize: 20,
  },
  topContainer: {
    width: "95%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemContainer: {
    width: 170,
    height: 240,
    margin: 5,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: -9, height: -13 },
    shadowRadius: 15,
    borderRadius: 10,
    backgroundColor: "white",
  },
  itemTitle: {
    fontSize: 18,
    marginTop: 5,
    textAlign: "center",
  },
});

export default ListCardItem;
