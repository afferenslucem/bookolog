import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent implements OnInit {
  constructor(private titleService: TitleService) {}

  public get title$(): Observable<string> {
    return this.titleService.title$;
  }

  public get custom$(): Observable<string> {
    return this.titleService.custom$;
  }

  ngOnInit(): void {}
}
