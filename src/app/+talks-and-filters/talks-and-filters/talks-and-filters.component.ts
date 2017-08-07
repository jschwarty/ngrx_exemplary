import {Component} from '@angular/core';
import { Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {Filters, Talk, TalksAndFiltersState} from '../+state/talks-and-filters.interfaces';

@Component({
  selector: 'talks-and-filters-cmp',
  templateUrl: './talks-and-filters.component.html',
  styleUrls: ['./talks-and-filters.component.css']
})
export class TalksAndFiltersComponent {
  filters: Observable<Filters>;
  talks: Observable<Talk[]>;

  constructor(private router: Router, store: Store<TalksAndFiltersState>) {
    this.filters = store.select('talks', 'filters');
    this.talks = store.select('talks').map(s => s.list.map(n => s.talks[n]));
  }

  handleFiltersChange(filters: Filters): void {
    this.router.navigate(['/talks', this.createParams(filters)]);
  }

  private createParams(filters: Filters): Params {
    const r: any = {};
    if (filters.speaker) {
      r.speaker = filters.speaker;
    }
    if (filters.title) {
      r.title = filters.title;
    }
    if (filters.minRating) {
      r.minRating = filters.minRating;
    }
    return r;
  }
}
