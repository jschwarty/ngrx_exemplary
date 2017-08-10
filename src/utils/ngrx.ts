import {Actions} from '@ngrx/effects';
import {Action, State, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {ROUTER_NAVIGATION, RouterNavigationAction} from '@ngrx/router-store';
import {Injectable, Type} from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/do';

export interface OptimisticUpdateOpts<T> {
  run(a: T): Observable<any>;
  onError(a: T, e: any): Observable<any> | any;
}

export interface HandleNavigationOpts {
  run(a: ActivatedRouteSnapshot, state?: any): Observable<any>;
  onError?(a: ActivatedRouteSnapshot, e: any): Observable<any> | any;
}

@Injectable()
export class StoreNavigation<T> {
  constructor(public store: Store<T>, public actions: Actions) {}

  optimisticUpdate<A extends Action>(action: string, opts: OptimisticUpdateOpts<A>): Observable<any> {
    return this.actions.ofType(action).concatMap((a: A) => {
      return opts.run(a).catch(e => wrapIntoObservable(opts.onError(a, e))).concatMap(() => of());
    });
  }

  navigation(component: Type<any>, opts: HandleNavigationOpts): Observable<any> {
    const nav = this.actions.ofType(ROUTER_NAVIGATION).map(
      (a: RouterNavigationAction<RouterStateSnapshot>) => findSnapshot(component, a.payload.routerState.root)).
      filter(s => !!s);
    return nav.withLatestFrom(this.store).switchMap(a => opts.run(a[0], a[1]).catch(e => wrapIntoObservable(opts.onError(a[0], e))));
  }
}

function findSnapshot(component: Type<any>, s: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
  if (s.routeConfig && s.routeConfig.component === component) {
    return s;
  }
  for (const c of s.children) {
    const ss = findSnapshot(component, c);
    if (ss) {
      return ss;
    }
  }
  return null;
}

function wrapIntoObservable(obj: any): Observable<any> {
  if (!!obj && typeof obj.subscribe === 'function') {
    return obj;
  } else if (!obj) {
    return of();
  } else {
    return of(obj);
  }
}
