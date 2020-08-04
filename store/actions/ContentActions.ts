import UrlHelper from "../../api/UrlHelper";
export enum ContentActions {
  LIST_CONTENT = "LIST_CONTENT",
}

export interface IAction {
  type: String;
  payload: Array<String>;
}

export const listContent = (
  type: string,
  pageLimit: number,
  pageOffset: number
) => {
  return async (dispatch) => {
    let normalize = require("json-api-normalize");
    let urlHelper = new UrlHelper(type, pageLimit, pageOffset);
    let url: string;
    url = urlHelper.getRequestedUrl();
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
