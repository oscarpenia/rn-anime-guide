class UrlHelper {
  private baseUrl: string = "https://kitsu.io/api/edge";

  constructor(
    private type: string,
    private pageLimit?: number,
    private pageOffset?: number //private relationship?: string
  ) {}

  public getRequestedUrl() {
    let url = this.baseUrl.concat(`/${this.type}`);
    if (this.pageLimit) {
      url.concat(`?page[limit]=${this.pageLimit}`);
    }
    if (this.pageLimit && this.pageOffset) {
      url.concat(`&page[offset]=${this.pageOffset}`);
    }
    /*if (this.relationship != null) {
      url.concat(`?include=${this.relationship}`);
    }*/

    return url;
  }
}

export default UrlHelper;
