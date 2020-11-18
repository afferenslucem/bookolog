import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangeComponent } from './date-range.component';

describe('DateRangeComponent', () => {
  let component: DateRangeComponent;
  let fixture: ComponentFixture<DateRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateRangeComponent ]
    })
    .compileComponents();
  });

  it('should render empty range', () => {
    fixture = TestBed.createComponent(DateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(fixture.nativeElement.innerText).toEqual('[ … - … ]');
  });

  it('should render full range', () => {
    fixture = TestBed.createComponent(DateRangeComponent);
    component = fixture.componentInstance;
    component.startDate = new Date('2020-11-17');
    component.endDate = new Date('2020-11-18');

    fixture.detectChanges();

    expect(fixture.nativeElement.innerText).toEqual('[ 11/17/20 - 11/18/20 ]');
  });

  it('should render start range', () => {
    fixture = TestBed.createComponent(DateRangeComponent);
    component = fixture.componentInstance;
    component.startDate = new Date('2020-11-17');

    fixture.detectChanges();

    expect(fixture.nativeElement.innerText).toEqual('[ 11/17/20 - … ]');
  });

  it('should render end range', () => {
    fixture = TestBed.createComponent(DateRangeComponent);
    component = fixture.componentInstance;
    component.endDate = new Date('2020-11-17');

    fixture.detectChanges();

    expect(fixture.nativeElement.innerText).toEqual('[ … - 11/17/20 ]');
  });
});
