import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCore } from '../../../../main/test/test-core.spec';
import { RouterTestingModule } from '@angular/router/testing';
import { StatisticListComponent } from './statistic-list.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormattingModule } from '../../../formatting/formatting.module';

describe('StatisticListComponent', () => {
  let component: StatisticListComponent;
  let fixture: ComponentFixture<StatisticListComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [StatisticListComponent],
      imports: [RouterTestingModule, FormattingModule],
    })
      .overrideComponent(StatisticListComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticListComponent);
    component = fixture.componentInstance;

    component.ngOnInit();

    fixture.detectChanges();
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write data', () => {
    component.data = [
      {
        key: 'test',
        group: 2,
      },
    ];

    fixture.detectChanges();

    expect(element.querySelector<HTMLElement>('.statistic-item__name')?.innerText).toEqual('Test');
    expect(element.querySelector<HTMLElement>('.statistic-item__count')?.innerText).toEqual('2');
  });

  it('should write data', () => {
    component.data = [
      {
        key: 'test',
        group: 2,
      },
      {
        key: 'test',
        group: 2,
      },
      {
        key: 'test',
        group: 2,
      },
      {
        key: 'test',
        group: 2,
      },
    ];

    fixture.detectChanges();

    expect(element.querySelectorAll<HTMLElement>('.statistic-item')?.length).toEqual(4);
  });

  it('should emit select', () => {
    const spy = spyOn(component.selected, 'emit');
    component.data = [
      {
        key: 'test',
        group: 2,
      },
      {
        key: 'test1',
        group: 2,
      },
      {
        key: 'test2',
        group: 2,
      },
      {
        key: 'test3',
        group: 2,
      },
    ];

    fixture.detectChanges();

    element.querySelectorAll<HTMLElement>('.statistic-item')?.[1]?.click();

    expect(spy).toHaveBeenCalledOnceWith('test1');
  });
});
