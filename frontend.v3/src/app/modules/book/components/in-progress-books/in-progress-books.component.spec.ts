import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressBooksComponent } from './in-progress-books.component';

describe('InProgressComponent', () => {
  let component: InProgressBooksComponent;
  let fixture: ComponentFixture<InProgressBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InProgressBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InProgressBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
