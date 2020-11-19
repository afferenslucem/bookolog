import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormattingModule } from '../../../formatting/formatting.module';

import { BookTimeProgressComponent } from './book-time-progress.component';

describe('BookTimeProgressComponent', () => {
  let component: BookTimeProgressComponent;
  let fixture: ComponentFixture<BookTimeProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookTimeProgressComponent ],
      imports: [
        FormattingModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTimeProgressComponent);
    component = fixture.componentInstance;

    component.done = 350;
    component.total = 600;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should print data', () => {
    fixture.detectChanges();

    const data = fixture.nativeElement.innerText;

    expect(data).toEqual('05:50 из 10:00');
  });
});
