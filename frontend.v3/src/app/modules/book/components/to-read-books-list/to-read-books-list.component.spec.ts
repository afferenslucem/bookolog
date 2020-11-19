import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToReadBooksListComponent } from './to-read-books-list.component';

describe('ToReadBookListComponent', () => {
  let component: ToReadBooksListComponent;
  let fixture: ComponentFixture<ToReadBooksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToReadBooksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToReadBooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
