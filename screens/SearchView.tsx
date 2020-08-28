import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, Text } from "react-native";
import SearchBar from "../components/SearchBar";
import { IUrlFilter, IUrlPagination, IRelationShip } from "../api/urlHelper";
import * as contentActions from "../store/actions/contentActions";
import { ISeriesItem } from "../model/seriesItem";
import CatalogContent from "../components/CatalogContent";
import ContentItem from "../components/ContentItem";

interface ISearchViewProps {
  navigation: any;
}
const SearchView = (props: ISearchViewProps) => {
  const content: string = props.navigation.getParam("content");

  const dispatch = useDispatch();
  let textFilter: IUrlFilter = {
    field: "",
  };
  let pagination: IUrlPagination = {
    pageLimit: 20,
    pageOffset: 0,
  };

  let relations: IRelationShip = {
    relationship: ["genres", "streamingLinks"],
  };

  const getRelations = () => {
    let relations: IRelationShip;

    if (content === "anime") {
      relations = {
        relationship: ["genres", "streamingLinks"],
      };
    } else {
      relations = {
        relationship: ["genres"],
      };
    }
    return relations;
  };

  let items: ISeriesItem[] = [];
  items = useSelector((state) => state.seriesContent.searchedItems);

  const onChangeSearchText = (value: string) => {
    textFilter.field = value;
    dispatch(contentActions.clearSections());
    dispatch(
      contentActions.searchContent(
        content,
        pagination,
        textFilter,
        getRelations()
      )
    );
  };

  return (
    <View>
      <SearchBar onChangeValue={onChangeSearchText} />

      {items.length <= 0 ? (
        <View style={styles.textContainer}>
          <Text>Type something to search</Text>
        </View>
      ) : (
        <View style={styles.catalogContainer}>
          <CatalogContent
            itemCollection={items}
            navigation={props.navigation}
            pagination={false}
          />
        </View>
      )}
    </View>
  );
};

SearchView.navigationOptions = (navigatioOptions: any) => {
  return {
    headerTitle: "Search",
  };
};

const styles = StyleSheet.create({
  textContainer: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  catalogContainer: {
    marginTop: 20,
  },
});

export default SearchView;
