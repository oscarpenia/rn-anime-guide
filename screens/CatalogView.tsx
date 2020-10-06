import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as contentActions from "../store/actions/contentActions";
import { ISeriesItem } from "../model/seriesItem";
import ListCardItem from "../components//ListCardItem";
import HeaderButton from "../components/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { IRelationShip } from "../api/urlHelper";
import { ContentActions } from "../constants/actionContants";

let pagination: {
  pageLimit: 20;
  pageOffset: 0;
};

let animeRelations = {
  relationship: ["genres", "streamingLinks"],
};
let mangaRelations = {
  relationship: ["genres"],
};

let sortHighestRated = {
  fields: ["ratingRank"],
};
let sortMostPopular = {
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

  const [contentType, setContentType] = useState(
    props.navigation.state.params.content
  );
  console.log(contentType);

  const validateRelations = (): IRelationShip => {
    if (contentType === "anime") {
      return animeRelations;
    }
    return mangaRelations;
  };

  const loadItems = useCallback(async () => {
    await dispatch(
      contentActions.listInitialContent(
        contentType,
        ContentActions.LIST_HIGHEST_RATED_CONTENT,
        pagination,
        validateRelations(),
        sortHighestRated
      )
    );
    await dispatch(
      contentActions.listInitialContent(
        contentType,
        ContentActions.LIST_MOST_POPULAR_CONTENT,
        pagination,
        validateRelations(),
        sortMostPopular
      )
    );
  }, [dispatch, contentType]);

  useEffect(() => {
    const willFocusEvent = props.navigation.addListener("willFocus", loadItems);
    setContentType(props.navigation.state.params.content);
    return () => {
      willFocusEvent.remove("willFocus", loadItems);
    };
  }, [dispatch, contentType]);

  useEffect(() => {
    loadItems();
  }, [contentType]);

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
  console.log(navigationData);
  return {
    headerTitle: "Main Catalog",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Buscar"
          iconName={Platform.OS === "android" ? "md-search" : "ios-search"}
          iconSize={40}
          onPress={() => {
            navigationData.navigation.navigate({
              routeName: "SearchView",
              params: {
                content: navigationData.navigation.state.params.content,
              },
            });
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          iconSize={30}
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default CatalogView;
