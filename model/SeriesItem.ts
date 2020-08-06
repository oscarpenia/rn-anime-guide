export interface IGenres {
  name: string;
}

export interface IStreamLinks {
  url: string;
}

export interface ISeriesItem {
  id: number;
  canonicalTitle: string;
  posterImage_tiny: string;
  ratingRank?: string;
  subtype?: string;
  averageRating?: number;
  synopsis?: string;
  episodeLength?: number;
  episodeCount?: number;
  startDate?: string;
  endDate?: string;
  status?: string;
  ageRating?: string;
  genres?: Array<IGenres>;
  streamLinks?: Array<IStreamLinks>;
}
