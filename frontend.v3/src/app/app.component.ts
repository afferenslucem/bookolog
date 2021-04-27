import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { PreloaderService } from './main/services/preloader.service';
import { TitleWatcherService } from './main/services/title-watcher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  public constructor(private preloaderService: PreloaderService, public titleWatcher: TitleWatcherService) {}

  public ngOnInit(): void {
    this.titleWatcher.watch();
  }

  public get showPreloader(): Observable<boolean> {
    return this.preloaderService.shouldShow;
  }
}
