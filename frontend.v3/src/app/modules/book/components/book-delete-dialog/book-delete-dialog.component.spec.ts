import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDeleteDialogComponent } from './book-delete-dialog.component';

describe('BookDeleteDielogComponent', () => {
  let component: BookDeleteDialogComponent;
  let fixture: ComponentFixture<BookDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
