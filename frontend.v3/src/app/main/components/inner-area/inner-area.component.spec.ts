import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from '../../../modules/ui/ui.module';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { InnerAreaComponent } from './inner-area.component';

describe('InnerAreaComponent', () => {
  let component: InnerAreaComponent;
  let fixture: ComponentFixture<InnerAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerAreaComponent, SideMenuComponent ],
      imports: [
        UiModule,
        RouterTestingModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        BrowserAnimationsModule,
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
