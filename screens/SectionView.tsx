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
  pageOffset: 0,
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

  //Code to refactor, but meantime evaluating which specific section is loading to add sorting field.
  if (section === ContentActions.LIST_HIGHEST_RATED_CONTENT) {
    sortField.fields = ["ratingRank"];
  } else if (section === ContentActions.LIST_MOST_POPULAR_CONTENT) {
    sortField.fields = ["popularityRank"];
  }

  itemCollection = useSelector((state) => state.seriesContent.sectionItems);

  console.log(props.navigation);

  const getRelations = (): IRelationShip => {
    let relations: IRelationShip;

    if (props.navigation.getParam("content") === "anime") {
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

  useEffect(() => {
    dispatch(contentActions.clearSections());
  }, []);

  useEffect(() => {
    dispatch(
      contentActions.listInitialContent(
        props.navigation.state.params.content,
        ContentActions.LOAD_SECTION,
        offsetState,
        getRelations(),
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
