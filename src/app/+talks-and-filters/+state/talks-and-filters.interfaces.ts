export interface Talk {
  readonly id: number;
  readonly title: string;
  readonly speaker: string;
  readonly description: string;
  readonly yourRating: number;
  readonly rating: number;
}

export interface Filters {
  readonly speaker: string;
  readonly title: string;
  readonly minRating: number;
}

// the state of this module
export interface TalksAndFilters {
  readonly talks: { [id: number]: Talk };
  readonly list: number[];
  readonly filters: Filters;
}

// the state of the app in regards to this module
export interface TalksAndFiltersState {
  readonly talks: TalksAndFilters;
}
