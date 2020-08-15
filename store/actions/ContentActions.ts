import {
  getRequestedUrl,
  IUrlPagination,
  IRelationShip,
  ISort,
} from "../../api/urlHelper";
import { ContentActions } from "../../constants/actionContants";

export interface IAction {
  type: String;
  payload: Array<String>;
}

export const listInitialContent = (
  type: string,
  listType: string,
  pagination?: IUrlPagination,
  relations?: IRelationShip,
  sort?: ISort,
  typeFilter?: IUrlFilter,
  typeFieldSet?: IFieldSet
) => {
  return async (dispatch) => {
    let normalize = require("json-api-normalize");
    let url: string;

    url = getRequestedUrl(
      type,
      pagination,
      typeFilter,
      typeFieldSet,
      relations,
      sort
    );
    console.log(url);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseJsonApi = await response.json();
      const normalizedData: Array<String> = normalize(responseJsonApi).get([
        "id",
        "canonicalTitle",
        "ratingRank",
        "subtype",
        "posterImage",
        "averageRating",
        "synopsis",
        "episodeLength",
        "subtype",
        "episodeCount",
        "startDate",
        "endDate",
        "status",
        "ageRating",
        "genres.name",
        "genres.id",
        "streamingLinks.url",
      ]);

      let action: IAction = {
        type: listType,
        payload: normalizedData,
      };

      dispatch(action);
    } catch (Err) {
      throw Err;
    }
  };
};

export const clearSections = (contentType: string) => {
  return { type: ContentActions.CLEAR_STATE, payload: [""] };
};
