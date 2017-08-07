import {Inject, NgModule} from '@angular/core';
import {BackendService} from './backend.service';
import {TalksAndFiltersComponent} from './talks-and-filters/talks-and-filters.component';
import {FiltersComponent} from './filters/filters.component';
import {RateButtonComponent} from './rate-button/rate-button.component';
import {TalksComponent} from './talks/talks.component';
import {TalkDetailsComponent} from './talk-details/talk-details.component';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {talksAndFiltersReducer} from './+state/talks-and-filters.reducer';
import {talksAndFiltersInitialState} from './+state/talks-and-filters.init';
import {EffectsModule} from '@ngrx/effects';
import {TalksAndFiltersEffects} from './+state/talks-and-filters.effects';
import {TalkComponent} from './talk/talk.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule, MdCheckboxModule, MdInputModule} from '@angular/material';
import {FormatRatingPipe} from './format-rating.pipe';

@NgModule({
  declarations: [
    TalksAndFiltersComponent,
    FiltersComponent,
    RateButtonComponent,
    TalksComponent,
    TalkDetailsComponent,
    TalkComponent,
    FormatRatingPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MdInputModule,
    MdCheckboxModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: TalksAndFiltersComponent},
      {path: ':id', component: TalkDetailsComponent}
    ]),

    EffectsModule.forFeature([
      TalksAndFiltersEffects
    ]),
    StoreModule.forFeature('talks', talksAndFiltersReducer, {initialState: talksAndFiltersInitialState})
  ],
  providers: [BackendService]
})
export class TalksAndFiltersModule {
}
