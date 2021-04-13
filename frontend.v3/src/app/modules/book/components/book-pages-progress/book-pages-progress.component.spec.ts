import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BookPagesProgressComponent } from './book-pages-progress.component';
import { FormattingModule } from '../../../formatting/formatting.module';
import { TestCore } from '../../../../main/test/test-core.spec';

describe('BookPagesProgressComponent', () => {
  let component: BookPagesProgressComponent;
  let fixture: ComponentFixture<BookPagesProgressComponent>;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [BookPagesProgressComponent],
      imports: [FormattingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
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
