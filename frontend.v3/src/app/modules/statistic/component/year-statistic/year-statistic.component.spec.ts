import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearStatisticComponent } from './year-statistic.component';

describe('YearStatisticComponent', () => {
  let component: YearStatisticComponent;
  let fixture: ComponentFixture<YearStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearStatisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
