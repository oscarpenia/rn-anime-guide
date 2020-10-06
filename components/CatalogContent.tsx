import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { ISeriesItem } from "../model/seriesItem";
import ContentItem from "../components/ContentItem";
import { IUrlPagination } from "../api/urlHelper";

interface ICatalogContentProps {
  itemCollection: ISeriesItem[];
  navigation: any;
  pagination: boolean;
}
let pagination = {
  pageLimit: 10,
  pageOffset: 20,
};

const CatalogContent = (props: ICatalogContentProps) => {
  const [offsetState, setOffsetState] = useState(pagination);

  const renderItems = (itemData: any) => {
    return (
      <View style={styles.item}>
        <ContentItem
          containerStyle={styles.itemContainer}
          textStyle={styles.itemTitle}
          item={itemData.item}
          navigation={props.navigation}
        />
      </View>
    );
  };

  if (pagination) {
    return (
      <FlatList
        numColumns={2}
        data={props.itemCollection}
        renderItem={renderItems}
        onEndReached={() => {
          setOffsetState({
            pageLimit: 10,
            pageOffset: offsetState.pageLimit + offsetState.pageOffset,
          });
        }}
        onEndReachedThreshold={0.1}
      />
    );
  }
  return (
    <FlatList
      numColumns={2}
      data={props.itemCollection}
      renderItem={renderItems}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "column",
    margin: 1,
  },
  itemContainer: {
    width: 190,
    height: 230,
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
    marginTop: 7,
    textAlign: "center",
    justifyContent: "center",
  },
});

export default CatalogContent;
