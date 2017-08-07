import {TalksAndFilters, TalksAndFiltersState} from './talks-and-filters.interfaces';

export const talksAndFiltersInitialState: TalksAndFilters = {
  filters: {speaker: '', title: '', minRating: 0},
  talks: {},
  list: []
};
