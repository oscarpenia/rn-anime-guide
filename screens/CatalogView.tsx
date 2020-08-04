import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as contentActions from "../store/actions/ContentActions";
import { ISeriesItem } from "../model/SeriesItem";
import ContentItem from "../components/ContentItem";

interface CatalogViewProps {}

const CatalogView = (props: CatalogViewProps) => {
  const dispatch = useDispatch();

  interface rootState {
    seriesContent: ISeriesItem;
  }

  let items: ISeriesItem[] = useSelector((state) => state.seriesContent.items);

  useEffect(() => {
    dispatch(contentActions.listContent("anime", 0, 0));
  }, [dispatch]);

  const renderItems = (itemData: any) => {
    return <ContentItem item={itemData.item} />;
  };

  return (
    <View style={styles.screen}>
      <FlatList
        style={{ width: "100%" }}
        horizontal={true}
        data={items}
        renderItem={renderItems}
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
