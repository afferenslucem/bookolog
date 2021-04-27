import { Injectable } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TitleService } from '../../modules/ui/service/title.service';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TitleWatcherService {
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private titleService: TitleService) {}

  public watch(): void {
    this.setTitleWatcher();
  }

  private setTitleWatcher(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.getRouteFirstChild()),
        filter((route: ActivatedRoute) => route.outlet === 'primary'),
        map((route: ActivatedRoute) => route.snapshot.data?.title),
        filter((title: string) => Boolean(title)),
      )
      .subscribe((data: string) => this.setTitle(data));
  }

  private setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  private getRouteFirstChild(): ActivatedRoute {
    let route = this.activatedRoute;

    while (route.firstChild) {
      route = route.firstChild;
    }

    return route;
  }
}
