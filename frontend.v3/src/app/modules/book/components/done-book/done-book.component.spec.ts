import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneBookComponent } from './done-book.component';

describe('DoneBookComponent', () => {
  let component: DoneBookComponent;
  let fixture: ComponentFixture<DoneBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoneBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
