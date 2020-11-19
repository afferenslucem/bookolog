import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneBooksListComponent } from './done-books-list.component';

describe('DoneBooksListComponent', () => {
  let component: DoneBooksListComponent;
  let fixture: ComponentFixture<DoneBooksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoneBooksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneBooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
