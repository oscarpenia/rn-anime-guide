import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AnimeGuideNavigator from "./navigation/AnimeGuideNavigator";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { contentReducer, ContentList } from "./store/reducers/contentReducers";

export default function App() {
  interface StoreState {
    seriesContent: ContentList;
  }

  const animeGuideReducers = combineReducers<StoreState>({
    seriesContent: contentReducer,
  });

  const store = createStore(
    animeGuideReducers,
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <AnimeGuideNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
