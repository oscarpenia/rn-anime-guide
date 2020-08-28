import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import CatalogView from "../screens/CatalogView";
import DetailView from "../screens/DetailView";
import SectionView from "../screens/SectionView";
import SearchView from "../screens/SearchView";
import {
  createDrawerNavigator,
  DrawerItems,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import { TextPropTypes } from "react-native";

const AnimeGuideNavigator = createStackNavigator(
  {
    CatalogView: CatalogView,
    DetailView: DetailView,
    SectionView: SectionView,
    SearchView: SearchView,
  },
  {
    initialRouteParams: {
      content: "anime",
    },
  }
);

const MangaGuideNavigator = createStackNavigator(
  {
    CatalogView: CatalogView,
    DetailView: DetailView,
    SectionView: SectionView,
    SearchView: SearchView,
  },
  {
    initialRouteParams: {
      content: "manga",
    },
  }
);

const ShopNavigator = createDrawerNavigator({
  Anime: {
    screen: AnimeGuideNavigator,
    navigationOptions: {
      drawerLabel: "Anime Section",
    },
  },
  Manga: {
    screen: MangaGuideNavigator,
    navigationOptions: {
      drawerLabel: "Manga Section",
    },
  },
});

export default createAppContainer(ShopNavigator);
