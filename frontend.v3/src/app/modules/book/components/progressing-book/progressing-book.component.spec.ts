import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormattingModule } from '../../../formatting/formatting.module';

import { ProgressingBookComponent } from './progressing-book.component';

describe('ProgressingBookComponent', () => {
  let component: ProgressingBookComponent;
  let fixture: ComponentFixture<ProgressingBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressingBookComponent ],
      imports: [
        FormattingModule,
        MatToolbarModule,
        MatProgressBarModule,
        MatDividerModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressingBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
