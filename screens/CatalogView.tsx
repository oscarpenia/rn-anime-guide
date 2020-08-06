import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as contentActions from "../store/actions/ContentActions";
import { ISeriesItem } from "../model/SeriesItem";
import ListCardItem from "../components//ListCardItem";

const CatalogView = (props: any) => {
  const dispatch = useDispatch();

  let items: Array<ISeriesItem> = useSelector(
    (state) => state.seriesContent.items
  );
  let highestRated: Array<ISeriesItem> = [];
  let topRated: Array<ISeriesItem> = [];

  items.map((item) => {
    if (item.averageRating) {
      if (item.averageRating >= 80) {
        topRated.push(item);
      } else {
        highestRated.push(item);
      }
    }
  });

  useEffect(() => {
    dispatch(contentActions.listInitialContent("anime", 0, 0));
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ListCardItem
        items={topRated}
        label="Highest Rated"
        navigation={props.navigation}
      />
      <ListCardItem
        items={highestRated}
        label="Top Rated"
        navigation={props.navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 30,
  },
});

CatalogView.navigationOptions = (navigationData: any) => {
  return {
    headerTitle: "Main Catalog",
  };
};

export default CatalogView;
