import {Component, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Store } from '@ngrx/store';
import {Talk, TalksAndFilters, TalksAndFiltersState} from '../+state/talks-and-filters.interfaces';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'talk-details-cmp',
  templateUrl: './talk-details.component.html',
  styleUrls: ['./talk-details.component.css']
})
export class TalkDetailsComponent {
  talk$: Observable<Talk>;

  constructor(private route: ActivatedRoute, private store: Store<TalksAndFiltersState>) {
    this.talk$ = route.paramMap
      .map(params => params.get('id'))
      .switchMap(id => store.select('talks')
        .map(t => t.talks[id]));
  }

  handleRate(newRating: number, talkId: number): void {
    this.store.dispatch({
      type: 'RATE',
      payload: {
        talkId: talkId,
        rating: newRating
      }
    });
  }
}
