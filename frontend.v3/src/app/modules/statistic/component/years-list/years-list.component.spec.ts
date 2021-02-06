import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearsListComponent } from './years-list.component';

describe('YearsListComponent', () => {
  let component: YearsListComponent;
  let fixture: ComponentFixture<YearsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
