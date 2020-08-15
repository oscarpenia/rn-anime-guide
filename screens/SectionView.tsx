import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FlatList, View, StyleSheet } from "react-native";
import ContentItem from "../components/ContentItem";
import { ContentActions } from "../constants/actionContants";
import { ISeriesItem } from "../model/seriesItem";
import { IUrlPagination, IRelationShip, ISort } from "../api/urlHelper";
import * as contentActions from "../store/actions/contentActions";

interface ISectionViewProps {
  navigation: any;
}

let pagination: IUrlPagination = {
  pageLimit: 10,
  pageOffset: 20,
};

let relations: IRelationShip = {
  relationship: ["genres", "streamingLinks"],
};

let sortField: ISort = {
  fields: [],
};

const SectionView = (props: ISectionViewProps) => {
  const dispatch = useDispatch();

  const section: string = props.navigation.getParam("section");
  const [offsetState, setOffsetState] = useState(pagination);

  let itemCollection: Array<ISeriesItem> = [];
  let contentType: string = "";

  if (section === ContentActions.LIST_HIGHEST_RATED_CONTENT) {
    sortField.fields = ["ratingRank"];
    itemCollection = useSelector(
      (state) => state.seriesContent.highestRatedItems
    );
  } else if (section === ContentActions.LIST_MOST_POPULAR_CONTENT) {
    sortField.fields = ["popularityRank"];
    itemCollection = useSelector(
      (state) => state.seriesContent.mostPopularItems
    );
  }

  useEffect(() => {
    dispatch(
      contentActions.listInitialContent(
        "anime",
        section,
        offsetState,
        relations,
        sortField
      )
    );
  }, [offsetState]);

  const renderItems = (itemData: any) => {
    return (
      <View style={styles.item}>
        <ContentItem
          containerStyle={styles.itemContainer}
          textStyle={styles.itemTitle}
          item={itemData.item}
          navigation={props.navigation}
          contentType={section}
        />
      </View>
    );
  };

  return (
    <FlatList
      numColumns={2}
      data={itemCollection}
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

export default SectionView;
