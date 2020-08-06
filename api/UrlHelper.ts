export interface IUrlPagination {
  pageLimit: number;
  pageOffset?: number;
}
export interface IFilterFields {
  atribute: string;
  value: string;
}

export interface IUrlFilter {
  field?: string;
  fields?: IFilterFields;
}

export interface IFieldSet {
  property: string;
  fields: Array<string>;
}

export interface IRelationShip {
  relationship: Array<string>;
}

const baseUrl: string = "https://kitsu.io/api/edge";

export const getRequestedUrl = (
  type: string,
  typePagination?: IUrlPagination,
  typeFilter?: IUrlFilter,
  typeFieldSet?: IFieldSet,
  typeRelationShip?: IRelationShip
) => {
  let url: string = "";
  if (!type) {
    return baseUrl;
  }

  url = baseUrl.concat(`/${type}?`);

  if (typeFilter) {
    if (typeFilter?.field !== undefined) {
      url.concat(`filter[text]=${typeFilter.field}`);
    } else if (typeFilter?.fields !== undefined) {
      url.concat(`[${typeFilter.fields.atribute}]=${typeFilter.fields.value}`);
      url.concat("&");
    }
  }

  if (typeRelationShip) {
    console.log("typeRelationShip");

    let relationShip: string = typeRelationShip.relationship.reduce(
      (a, b) => a + "," + b
    );
    let tmpUrl = url.concat(`include=${relationShip}&`);
    url = tmpUrl;
  }

  if (typeFieldSet) {
    let fields: string;

    fields = typeFieldSet.fields.reduce((a, b) => a + "," + b);

    let tmpUrl = url.concat(`fields[${typeFieldSet.property}]=${fields}`);

    if (!typeFilter) {
      url.concat("?");
    } else {
      url.concat("&");
    }

    url.concat(tmpUrl).concat("&");
  }

  if (typePagination) {
    let tmpUrl = url.concat(`page[limit]=${typePagination.pageLimit}`);

    if (typePagination.pageOffset !== undefined) {
      tmpUrl = tmpUrl.concat(`&page[offset]=${typePagination.pageOffset}`);
    }
    url = tmpUrl;
  }
  return url;
};
