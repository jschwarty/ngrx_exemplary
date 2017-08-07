import {Injectable} from '@angular/core';
import {BackendService} from '../backend.service';
import {Effect} from '@ngrx/effects';
import {Rate} from './talks-and-filters.actions';
import {StoreNavigation} from '../../../utils/ngrx';
import {TalksAndFiltersComponent} from '../talks-and-filters/talks-and-filters.component';
import {ActivatedRouteSnapshot, Params} from '@angular/router';
import {Filters, TalksAndFiltersState} from './talks-and-filters.interfaces';
import {TalkDetailsComponent} from '../talk-details/talk-details.component';
import {of} from 'rxjs/observable/of';

@Injectable()
export class TalksAndFiltersEffects {
  @Effect() navigateToTalks = this.s.navigation(TalksAndFiltersComponent, {
    run: (a: ActivatedRouteSnapshot) => {
      const filters = createFilters(a.params);
      return this.backend.findTalks(filters).map(resp => ({type: 'TALKS_UPDATED', payload: {...resp, filters}}));
    },
    onError: (a: ActivatedRouteSnapshot, e: any) => {
      console.error(e);
    }
  });

  @Effect() navigateToTalk = this.s.navigation(TalkDetailsComponent, {
    run: (a: ActivatedRouteSnapshot, state: TalksAndFiltersState) => {
      const id = +a.paramMap.get('id');
      if (state.talks.talks[id]) {
        return of();
      } else {
        return this.backend.findTalk(id).map(resp => ({type: 'TALK_UPDATED', payload: resp}));
      }
    },
    onError: (a: ActivatedRouteSnapshot, e: any) => {
      console.error(e);
    }
  });

  @Effect() rateTalk = this.s.optimisticUpdate<Rate>('RATE', {
    run: (a) => this.backend.rateTalk(a.payload.talkId, a.payload.rating),
    onError: (a, e) => ({type: 'UNRATE', payload: {talkId: a.payload.talkId}})
  });

  constructor(private s: StoreNavigation<TalksAndFiltersState>, private backend: BackendService) {}
}

function createFilters(p: Params): Filters {
  return {speaker: p['speaker'] || null, title: p['title'] || null, minRating: p['minRating'] ? +p['minRating'] : 0};
}
