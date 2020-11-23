import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksByYearsComponent } from './books-by-years.component';

describe('DoneBooksStaticComponent', () => {
  let component: BooksByYearsComponent;
  let fixture: ComponentFixture<BooksByYearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksByYearsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksByYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
