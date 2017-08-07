import {Filters, Talk} from './talks-and-filters.interfaces';

export interface TalksUpdated {
  type: 'TALKS_UPDATED';
  payload: { talks: { [id: number]: Talk }; list: number[] };
}

export interface TalkUpdated {
  type: 'TALK_UPDATED';
  payload: Talk;
}

export interface Rate {
  type: 'RATE';
  payload: { talkId: number, rating: number };
}

export interface Unrate {
  type: 'UNRATE';
  payload: { talkId: number, error: any };
}

export type TalksAndFiltersAction = TalksUpdated | TalkUpdated | Rate | Unrate;
