import { talksAndFiltersReducer } from './talks-and-filters.reducer';
import {talksAndFiltersInitialState} from './talks-and-filters.init';
import {TalksUpdated} from './talks-and-filters.actions';

describe('TalksAndFilters reducer', () => {
  it('should update talks', () => {
    // Maybe we can provide some helper functions to create fake data
    const talk = { id: 1, title: '', speaker: '', description: '', yourRating: 1, rating: 1};
    const action: TalksUpdated = {
      type: 'TALKS_UPDATED',
      payload: {
        talks: {1: talk},
        list: [1]
      }
    };
    const updatedState = talksAndFiltersReducer(talksAndFiltersInitialState, action);
    expect(updatedState.talks[1]).toEqual(talk);
  });
});
