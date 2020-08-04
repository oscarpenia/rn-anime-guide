import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import CatalogView from "../screens/CatalogView";
import DetailView from "../screens/DetailView";
const AnimeGuideNavigator = createStackNavigator({
  CatalogView: CatalogView,
  DetailView: DetailView,
});

export default createAppContainer(AnimeGuideNavigator);
