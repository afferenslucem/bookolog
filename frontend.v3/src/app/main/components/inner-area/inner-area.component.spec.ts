import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from '../../../modules/ui/ui.module';

import { InnerAreaComponent } from './inner-area.component';

describe('InnerAreaComponent', () => {
  let component: InnerAreaComponent;
  let fixture: ComponentFixture<InnerAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerAreaComponent ],
      imports: [
        UiModule,
        RouterTestingModule,
        MatToolbarModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
