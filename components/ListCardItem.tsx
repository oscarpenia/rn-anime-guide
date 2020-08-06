import React from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ISeriesItem } from "../model/SeriesItem";
import ContentItem from "../components/ContentItem";

interface IListCardItemProps {
  items: ISeriesItem[];
  label: String;
  navigation: any;
}

const ListCardItem = (props: IListCardItemProps) => {
  const renderItems = (itemData: any) => {
    return <ContentItem item={itemData.item} navigation={props.navigation} />;
  };

  return (
    <View style={styles.screen}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>{props.label}</Text>
        <TouchableOpacity onPress={() => {}}>
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
  screen: {},
  title: {
    padding: 5,
    fontSize: 20,
  },
  topContainer: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ListCardItem;
