import { ContentActions } from "../actions/ContentActions";
import { IAction } from "../actions/ContentActions";
import ContentList from "../../components/ContentItem";
import { ISeriesItem } from "../../model/SeriesItem";

interface ContentList {
  items: ISeriesItem[];
}

export default (state: ContentList = { items: [] }, action: IAction) => {
  switch (action.type) {
    case ContentActions.LIST_CONTENT:
      const itemsContentPayload = action.payload;

      const itemsContent = new Array<ISeriesItem>();

      itemsContentPayload.map((item: any) => {
        let itemContent: ISeriesItem = {
          id: item.id,
          canonicalTitle: item.canonicalTitle,
          posterImage_tiny: item.posterImage.tiny,
          ratingRank: item.ratingRank,
          subtype: item.subtype,
        };
        itemsContent.push(itemContent);
      });

      return { ...state, items: itemsContent };
    default:
      return state;
  }
};
