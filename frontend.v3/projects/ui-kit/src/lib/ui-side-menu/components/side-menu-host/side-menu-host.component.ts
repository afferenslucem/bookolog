import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { SideMenuComponent } from '../side-menu/side-menu.component';

@Component({
  selector: 'ui-side-menu-host',
  templateUrl: './side-menu-host.component.html',
  styleUrls: ['./side-menu-host.component.scss'],
})
export class SideMenuHostComponent implements OnInit {
  @Input()
  public hasBackdrop = false;

  @ContentChildren(SideMenuComponent)
  public sideMenus: QueryList<SideMenuComponent>;

  constructor() {}

  public get isMenuOpened(): boolean {
    return this.sideMenus?.some(item => item.isOpened);
  }

  ngOnInit(): void {}

  public closeAll(): void {
    console.log('hasBackdrop', this.hasBackdrop);

    for (let menu of this.sideMenus) {
      menu.close();
    }
  }
}
