import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormattingModule } from '../../../formatting/formatting.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BookTimeProgressComponent } from './book-time-progress.component';
import { TestCore } from '../../../../main/test/test-core.spec';

describe('BookTimeProgressComponent', () => {
  let component: BookTimeProgressComponent;
  let fixture: ComponentFixture<BookTimeProgressComponent>;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [ BookTimeProgressComponent ],
      imports: [
        FormattingModule,
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
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
