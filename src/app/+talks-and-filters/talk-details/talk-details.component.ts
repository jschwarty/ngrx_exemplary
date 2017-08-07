import {Component, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Store } from '@ngrx/store';
import {Talk, TalksAndFilters, TalksAndFiltersState} from '../+state/talks-and-filters.interfaces';

@Component({
  selector: 'talk-details-cmp',
  templateUrl: './talk-details.component.html',
  styleUrls: ['./talk-details.component.css']
})
export class TalkDetailsComponent {
  talk: Talk;

  constructor(private route: ActivatedRoute, private store: Store<TalksAndFiltersState>) {
    store.select('talks').subscribe(t => {
      const id = (+route.snapshot.paramMap.get('id'));
      this.talk = t.talks[id];
    });
  }

  handleRate(newRating: number): void {
    this.store.dispatch({
      type: 'RATE',
      payload: {
        talkId: this.talk.id,
        rating: newRating
      }
    });
  }
}
