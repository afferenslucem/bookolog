import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchService } from '../../services/search.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchService: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    searchService = TestBed.inject(SearchService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open', () => {
    component.open();
    fixture.detectChanges();

    expect(component.isClosed).toBeFalse();
  });

  it('should close and clear input', () => {
    component.open();

    expect(component.isClosed).toBeFalse();
    fixture.detectChanges();

    component.input.setValue('value');

    component.close();

    expect(component.input.value).toEqual('');
    expect(component.isClosed).toBeTrue();
  });

  it('should send values to service', done => {
    component.ngOnInit();

    component.open();
    fixture.detectChanges();

    searchService.filter$.subscribe(value => {
      expect(value).toEqual('value');
      done();
    });

    component.input.setValue('value');
  });
});
