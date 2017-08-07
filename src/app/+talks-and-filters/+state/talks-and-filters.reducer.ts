import {TalksAndFilters} from './talks-and-filters.interfaces';
import {TalksAndFiltersAction} from './talks-and-filters.actions';

export function talksAndFiltersReducer(state: TalksAndFilters, action: TalksAndFiltersAction): TalksAndFilters {
  switch (action.type) {
    case 'TALKS_UPDATED': {
      return {...state, ...action.payload};
    }
    case  'TALK_UPDATED': {
      const talks = {...state.talks};
      talks[action.payload.id] = action.payload;
      return {...state, talks};
    }
    case 'RATE': {
      const talks = {...state.talks};
      const talk = talks[action.payload.talkId];
      talks[action.payload.talkId] = {...talk, rating: action.payload.rating};
      return {...state, talks};
    }
    case 'UNRATE': {
      const talks = {...state.talks};
      const talk = talks[action.payload.talkId];
      talks[action.payload.talkId] = {...talk, rating: null};
      return {...state, talks};
    }
    default: {
      return state;
    }
  }
}
