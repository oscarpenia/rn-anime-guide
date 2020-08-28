import { ContentActions } from "../../constants/actionContants";
import { IAction } from "../actions/contentActions";
import ContentList from "../../components/ContentItem";
import { ISeriesItem, IGenres } from "../../model/seriesItem";

interface ContentList {
  highestRatedItems: ISeriesItem[];
  mostPopularItems: ISeriesItem[];
  searchedItems: ISeriesItem[];
  sectionItems: ISeriesItem[];
}

const createSeriesItem = (item: any) => {
  const seriesItem: ISeriesItem = {
    id: item.id,
    canonicalTitle: item.canonicalTitle,
    posterImage_tiny: item.posterImage.medium,
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
    youtubeLink: item.youtubeVideoId,
    genres: item.genres,
    streamLinks: item.streamingLinks,
  };
  return seriesItem;
};

export default (
  state: ContentList = {
    highestRatedItems: [],
    mostPopularItems: [],
    searchedItems: [],
    sectionItems: [],
  },
  action: IAction
) => {
  switch (action.type) {
    case ContentActions.LIST_HIGHEST_RATED_CONTENT:
      const higuestRatedContent = new Array<ISeriesItem>();

      action.payload.map((item: any) => {
        let itemContent = createSeriesItem(item);
        if (!state.highestRatedItems.includes(itemContent)) {
          higuestRatedContent.push(itemContent);
        }
      });

      return {
        ...state,
        highestRatedItems: higuestRatedContent,
      };

    case ContentActions.LIST_MOST_POPULAR_CONTENT:
      const mostPopularContent = new Array<ISeriesItem>();

      action.payload.map((item: any) => {
        let itemContent = createSeriesItem(item);

        if (!state.mostPopularItems.includes(itemContent)) {
          mostPopularContent.push(itemContent);
        }
      });
      return {
        ...state,
        mostPopularItems: mostPopularContent,
      };

    case ContentActions.SEARCH_CONTENT:
      const searchedItems = new Array<ISeriesItem>();
      action.payload.map((item: any) => {
        let itemContent = createSeriesItem(item);

        if (!state.searchedItems.includes(itemContent)) {
          searchedItems.push(itemContent);
        }
      });
      return {
        ...state,
        searchedItems: searchedItems,
      };

    case ContentActions.CLEAR_STATE:
      return { ...state, sectionItems: [], searchedItems: [] };

    case ContentActions.LOAD_SECTION:
      const sectionContent = new Array<ISeriesItem>();

      action.payload.map((item: any) => {
        let itemContent = createSeriesItem(item);

        if (!state.sectionItems.includes(itemContent)) {
          sectionContent.push(itemContent);
        }
      });
      return {
        ...state,
        sectionItems: [...state.sectionItems.concat(sectionContent)],
      };

    default:
      return state;
  }
};
