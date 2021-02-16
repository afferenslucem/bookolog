import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormattingModule } from '../../../formatting/formatting.module';
import { BookViewComponent } from './book-view.component';
import { TestCore } from '../../../../main/test/test-core.spec';

describe('BookViewComponent', () => {
  let component: BookViewComponent;
  let fixture: ComponentFixture<BookViewComponent>;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [ BookViewComponent ],
      imports: [
        FormattingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookViewComponent);
    component = fixture.componentInstance;
  });
});
