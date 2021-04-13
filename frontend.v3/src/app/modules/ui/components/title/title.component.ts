import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TitleText } from '../../models/title-text';
import { TitleService } from '../../service/title.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent implements OnInit {
  public TitleText: typeof TitleText = TitleText;

  constructor(private titleService: TitleService) {}

  public get title$(): Observable<TitleText> {
    return this.titleService.title$;
  }

  public get custom$(): Observable<string> {
    return this.titleService.custom$;
  }

  ngOnInit(): void {}
}
