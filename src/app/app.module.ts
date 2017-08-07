import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreModule} from '@ngrx/store';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreNavigation} from '../utils/ngrx';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    HttpModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    RouterModule.forRoot([
      {path: '', pathMatch: 'full', redirectTo: 'talks'},
      {path: 'talks', loadChildren: './+talks-and-filters/talks-and-filters.module#TalksAndFiltersModule'}
    ]),
    StoreRouterConnectingModule,
    // StoreDevtoolsModule.instrument() // make pluggable
  ],
  providers: [
    StoreNavigation
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
