import {Actions} from '@ngrx/effects';
import {Action, State, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {ROUTER_NAVIGATION, RouterNavigationAction} from '@ngrx/router-store';
import {Injectable, Type} from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/do';
import {HandleNavigationOpts, OptimisticUpdateOpts, StoreNavigation} from './ngrx';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {defer} from 'rxjs/observable/defer';
import {toPromise} from 'rxjs/operator/toPromise';
import {toArray} from 'rxjs/operator/toArray';
import {TalkDetailsComponent} from '../app/+talks-and-filters/talk-details/talk-details.component';

export class FakeStoreNavigation extends StoreNavigation<any> {
  private actualActions: any = new ReplaySubject();
  constructor() {
    super(<any>new BehaviorSubject(null), new Actions(defer(() => this.actualActions)));
  }

  triggerNavigation(opts: {component: Type<any>, params?: {[k: string]: string}, data?: {[k: string]: any}, state?: any}) {
    (<any>this.store).next(opts.state ? opts.state : {});
    this.actualActions.next(navigationAction(opts.component, opts.params ? opts.params : {}, opts.data ? opts.data : {}));
    this.actualActions.complete();
  }
}

function navigationAction(component: Type<any>, params: {[k: string]: string}, data: {[k: string]: any}): RouterNavigationAction {
  const root = {
    params,
    data,
    paramMap: {get: (k) => params[k]},
    routeConfig: {component},
    children: []
};
  return <any>{
    type: ROUTER_NAVIGATION,
    payload: {routerState: {root}}
  };
}

export function readAll<T>(o: Observable<T>): Promise<T[]> {
  return toPromise.call(toArray.call(o));
}
