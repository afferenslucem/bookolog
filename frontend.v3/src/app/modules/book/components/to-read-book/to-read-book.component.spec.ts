import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToReadBookComponent } from './to-read-book.component';

describe('ToReadBookComponent', () => {
  let component: ToReadBookComponent;
  let fixture: ComponentFixture<ToReadBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToReadBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToReadBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
