import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFilteredComponent } from './book-filtered.component';

describe('BookFilteredComponent', () => {
  let component: BookFilteredComponent;
  let fixture: ComponentFixture<BookFilteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookFilteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
