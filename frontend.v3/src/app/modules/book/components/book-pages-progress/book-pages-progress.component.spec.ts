import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPagesProgressComponent } from './book-pages-progress.component';

describe('BookPagesProgressComponent', () => {
  let component: BookPagesProgressComponent;
  let fixture: ComponentFixture<BookPagesProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookPagesProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPagesProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
