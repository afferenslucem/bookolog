import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { PreloaderService } from './main/services/preloader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'Bookolog';

  public constructor(private preloaderService: PreloaderService) {}

  public get showPreloader(): Observable<boolean> {
    return this.preloaderService.shouldShow;
  }
}
