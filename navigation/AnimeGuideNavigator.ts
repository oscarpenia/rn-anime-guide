import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import CatalogView from "../screens/CatalogView";
import DetailView from "../screens/DetailView";
import SectionView from "../screens/SectionView";

const AnimeGuideNavigator = createStackNavigator({
  CatalogView: CatalogView,
  DetailView: DetailView,
  SectionView: SectionView,
});

export default createAppContainer(AnimeGuideNavigator);
