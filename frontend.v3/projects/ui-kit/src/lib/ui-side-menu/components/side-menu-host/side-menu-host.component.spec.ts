import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuHostComponent } from './side-menu-host.component';

describe('ContainerComponent', () => {
  let component: SideMenuHostComponent;
  let fixture: ComponentFixture<SideMenuHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideMenuHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
