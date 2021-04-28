import { Component, OnInit } from '@angular/core';
import { SearchWatcherService } from '../../../modules/search/services/search-watcher.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inner-area',
  templateUrl: './inner-area.component.html',
  styleUrls: ['./inner-area.component.scss'],
})
export class InnerAreaComponent implements OnInit {
  constructor(private searchWatcher: SearchWatcherService) {}

  public get isSearchEnabled(): Observable<boolean> {
    return this.searchWatcher.isEnabled$;
  }

  ngOnInit(): void {}
}
