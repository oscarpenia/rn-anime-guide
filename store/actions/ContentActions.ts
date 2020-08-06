import {
  getRequestedUrl,
  IUrlPagination,
  IRelationShip,
} from "../../api/UrlHelper";

export enum ContentActions {
  LIST_CONTENT = "LIST_CONTENT",
}

export interface IAction {
  type: String;
  payload: Array<String>;
}

export const listInitialContent = (
  type: string,
  pageLimit: number,
  pageOffset: number
) => {
  return async (dispatch) => {
    let normalize = require("json-api-normalize");
    let url: string;

    let pagination: IUrlPagination = {
      pageLimit: 20,
      pageOffset: 0,
    };

    let relations: IRelationShip = {
      relationship: ["genres", "streamingLinks"],
    };

    url = getRequestedUrl(type, pagination, undefined, undefined, relations);
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
        "streamingLinks.url",
      ]);

      let action: IAction = {
        type: ContentActions.LIST_CONTENT,
        payload: normalizedData,
      };

      dispatch(action);
    } catch (Err) {
      throw Err;
    }
  };
};
