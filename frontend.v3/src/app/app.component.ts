import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { PreloaderService } from './main/services/preloader.service';
import { TitleWatcherService } from './modules/title/services/title-watcher.service';
import { SearchWatcherService } from './modules/search/services/search-watcher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  public constructor(
    private preloaderService: PreloaderService,
    public titleWatcher: TitleWatcherService,
    private searchWatcher: SearchWatcherService,
  ) {
    this.titleWatcher.watch();
    this.searchWatcher.watch();
  }

  public ngOnInit(): void {}

  public get showPreloader(): Observable<boolean> {
    return this.preloaderService.shouldShow;
  }
}
