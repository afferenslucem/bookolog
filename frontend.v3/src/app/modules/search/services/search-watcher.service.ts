import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchWatcherService {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  private _isEnabled$ = new BehaviorSubject<boolean>(null);

  public get isEnabled$(): Observable<boolean> {
    return this._isEnabled$;
  }

  public watch(): void {
    this.setSearchWatcher();
  }

  private setSearchWatcher(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.getRouteFirstChild()),
        filter((route: ActivatedRoute) => route.outlet === 'primary'),
        map((route: ActivatedRoute) => route.snapshot.data?.searchEnabled),
        map((title: boolean | undefined) => Boolean(title)),
      )
      .subscribe(value => this._isEnabled$.next(value));
  }

  private getRouteFirstChild(): ActivatedRoute {
    let route = this.activatedRoute;

    while (route.firstChild) {
      route = route.firstChild;
    }

    return route;
  }
}
