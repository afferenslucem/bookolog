import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent implements OnInit {
  @Input()
  public mode: 'top' | 'top' | 'left' | 'right' = 'left';

  public isOpened = false;

  constructor(private elRef: ElementRef<HTMLElement>) {}

  public open(): void {
    this.elRef.nativeElement.classList.add('opened');
    this.isOpened = true;
  }

  public close(): void {
    this.elRef.nativeElement.classList.remove('opened');
    this.isOpened = false;
  }

  ngOnInit(): void {
    this.elRef.nativeElement.classList.add(this.mode);
  }
}
