import { ContentActions } from "../../constants/actionContants";
import { IAction } from "../actions/contentActions";
import ContentList from "../../components/ContentItem";
import { ISeriesItem, IGenres } from "../../model/seriesItem";

interface ContentList {
  highestRatedItems: ISeriesItem[];
  mostPopularItems: ISeriesItem[];
}

export default (
  state: ContentList = { highestRatedItems: [], mostPopularItems: [] },
  action: IAction
) => {
  switch (action.type) {
    case ContentActions.LIST_HIGHEST_RATED_CONTENT:
      const higuestRatedContent = new Array<ISeriesItem>();

      action.payload.map((item: any) => {
        let itemContent: ISeriesItem = {
          id: item.id,
          canonicalTitle: item.canonicalTitle,
          posterImage_tiny: item.posterImage.tiny,
          ratingRank: item.ratingRank,
          subtype: item.subtype,
          averageRating: item.averageRating,
          synopsis: item.synopsis,
          status: item.status,
          episodeCount: item.episodeCount,
          episodeLength: item.episodeLength,
          startDate: item.startDate,
          endDate: item.endDate,
          ageRating: item.ageRating,
          genres: item.genres,
          streamLinks: item.streamingLinks,
        };
        if (!state.highestRatedItems.includes(itemContent)) {
          higuestRatedContent.push(itemContent);
        }
      });

      return {
        ...state,
        highestRatedItems: state.highestRatedItems.concat(higuestRatedContent),
      };

    case ContentActions.LIST_MOST_POPULAR_CONTENT:
      const mostPopularContent = new Array<ISeriesItem>();

      action.payload.map((item: any) => {
        let itemContent: ISeriesItem = {
          id: item.id,
          canonicalTitle: item.canonicalTitle,
          posterImage_tiny: item.posterImage.tiny,
          ratingRank: item.ratingRank,
          subtype: item.subtype,
          averageRating: item.averageRating,
          synopsis: item.synopsis,
          status: item.status,
          episodeCount: item.episodeCount,
          episodeLength: item.episodeLength,
          startDate: item.startDate,
          endDate: item.endDate,
          ageRating: item.ageRating,
          genres: item.genres,
          streamLinks: item.streamingLinks,
        };
        if (!state.mostPopularItems.includes(itemContent)) {
          mostPopularContent.push(itemContent);
        }
      });

      return {
        ...state,
        mostPopularItems: state.mostPopularItems.concat(mostPopularContent),
      };

    case ContentActions.CLEAR_STATE:
      console.log("clear state");
      return { ...state, mostPopularItems: [], highestRatedItems: [] };
    default:
      return state;
  }
};
