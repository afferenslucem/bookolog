import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tag-value',
  templateUrl: './tag-value.component.html',
  styleUrls: ['./tag-value.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagValueComponent implements OnInit {
  @Input()
  public name: string;

  @Input()
  public showCross: string | boolean = true;

  @Output()
  public crossClick = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
