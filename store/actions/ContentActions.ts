import {
  getRequestedUrl,
  IUrlPagination,
  IRelationShip,
  ISort,
  IUrlFilter,
} from "../../api/urlHelper";
import { ContentActions } from "../../constants/actionContants";

export interface IAction {
  type: String;
  payload: Array<String>;
}

export interface ISimpleArgumentAction {
  type: String;
  payload: String;
}

const normalize = require("json-api-normalize");

const fetchApi = async (url: string) => {
  let normalizedData: Array<String>;
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
    normalizedData = normalize(responseJsonApi).get([
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
      "youtubeVideoId",
      "genres.name",
      "genres.id",
      "streamingLinks.url",
    ]);
  } catch (Err) {
    throw Err;
  }
  return normalizedData;
};

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
    let normalizedData = await fetchApi(url);

    let action: IAction = {
      type: listType,
      payload: normalizedData,
    };

    dispatch(action);
  };
};

export const searchContent = (
  type: string,
  pagination: IUrlPagination,
  textFilter: IUrlFilter,
  relationShips: IRelationShip
) => {
  let url: string;

  return async (dispatch) => {
    url = getRequestedUrl(
      type,
      pagination,
      textFilter,
      undefined,
      relationShips
    );
    console.log(url);
    let normalizedData = await fetchApi(url);
    let action: IAction = {
      type: ContentActions.SEARCH_CONTENT,
      payload: normalizedData,
    };

    dispatch(action);
  };
};

export const clearSections = (contentType?: string) => {
  let action: IAction = {
    type: ContentActions.CLEAR_STATE,
    payload: [contentType],
  };

  return action;
};
