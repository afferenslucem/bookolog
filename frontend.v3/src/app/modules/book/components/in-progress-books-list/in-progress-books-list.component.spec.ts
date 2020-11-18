import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressBooksListComponent } from './in-progress-books-list.component';

describe('InProgressBooksListComponent', () => {
  let component: InProgressBooksListComponent;
  let fixture: ComponentFixture<InProgressBooksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InProgressBooksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InProgressBooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
