import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as contentActions from "../store/actions/contentActions";
import { ISeriesItem } from "../model/seriesItem";
import ListCardItem from "../components//ListCardItem";
import { IUrlPagination, IRelationShip, ISort } from "../api/urlHelper";
import { ContentActions } from "../constants/actionContants";

let pagination: IUrlPagination = {
  pageLimit: 20,
  pageOffset: 0,
};

let relations: IRelationShip = {
  relationship: ["genres", "streamingLinks"],
};

let sortHighestRated: ISort = {
  fields: ["ratingRank"],
};
let sortMostPopular: ISort = {
  fields: ["popularityRank"],
};

const CatalogView = (props: any) => {
  const dispatch = useDispatch();

  let highestRated: Array<ISeriesItem> = useSelector(
    (state) => state.seriesContent.highestRatedItems
  );

  let mostPopularItems: Array<ISeriesItem> = useSelector(
    (state) => state.seriesContent.mostPopularItems
  );

  useEffect(() => {
    dispatch(contentActions.clearSections());

    dispatch(
      contentActions.listInitialContent(
        "anime",
        ContentActions.LIST_HIGHEST_RATED_CONTENT,
        pagination,
        relations,
        sortHighestRated
      )
    );
    dispatch(
      contentActions.listInitialContent(
        "anime",
        ContentActions.LIST_MOST_POPULAR_CONTENT,
        pagination,
        relations,
        sortMostPopular
      )
    );
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View style={styles.listContainer}>
          <ListCardItem
            items={highestRated}
            label="Highest Rated"
            navigation={props.navigation}
            contentType={ContentActions.LIST_HIGHEST_RATED_CONTENT}
          />
          <ListCardItem
            items={mostPopularItems}
            label="Top Rated"
            navigation={props.navigation}
            contentType={ContentActions.LIST_MOST_POPULAR_CONTENT}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 20,
  },
  listContainer: {
    marginBottom: 20,
  },
});

CatalogView.navigationOptions = (navigationData: any) => {
  return {
    headerTitle: "Main Catalog",
  };
};

export default CatalogView;
