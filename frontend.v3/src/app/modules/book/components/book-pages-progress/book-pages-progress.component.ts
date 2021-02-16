import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ChooseFormPipe } from '../../../formatting/pipes/choose-form.pipe';

@Component({
  selector: 'app-book-pages-progress',
  templateUrl: './book-pages-progress.component.html',
  styleUrls: ['./book-pages-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookPagesProgressComponent implements OnInit {
  @Input()
  public done: number;

  @Input()
  public total: number;

  constructor() { }

  ngOnInit(): void {
  }
}
