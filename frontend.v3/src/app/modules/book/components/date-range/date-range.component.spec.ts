import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangeComponent } from './date-range.component';
import { TestCore } from '../../../../main/test/test-core.spec';

describe('DateRangeComponent', () => {
  let component: DateRangeComponent;
  let fixture: ComponentFixture<DateRangeComponent>;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [DateRangeComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      // .overrideComponent(DateRangeComponent, {
      //   set: {changeDetection: ChangeDetectionStrategy.Default},
      // })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render empty range', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.innerText).toEqual('[ … - … ]');
  });

  it('should render full range', () => {
    component.startDate = new Date('2020-11-17');
    component.endDate = new Date('2020-11-18');

    fixture.detectChanges();

    expect(fixture.nativeElement.innerText).toEqual('[ 11/17/20 - 11/18/20 ]');
  });

  it('should render start range', () => {
    component.startDate = new Date('2020-11-17');

    fixture.detectChanges();

    expect(fixture.nativeElement.innerText).toEqual('[ 11/17/20 - … ]');
  });

  it('should render end range', () => {
    component.endDate = new Date('2020-11-17');

    fixture.detectChanges();

    expect(fixture.nativeElement.innerText).toEqual('[ … - 11/17/20 ]');
  });
});
