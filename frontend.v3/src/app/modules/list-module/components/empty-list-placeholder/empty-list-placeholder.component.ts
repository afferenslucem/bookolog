import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-list-placeholder',
  templateUrl: './empty-list-placeholder.component.html',
  styleUrls: ['./empty-list-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyListPlaceholderComponent implements OnInit {
  @Input()
  public message = 'Здесь пока ничего нет';

  constructor() {}

  ngOnInit(): void {}
}
