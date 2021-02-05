import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggerWindowComponent } from './logger-window.component';

describe('LoggerWindowComponent', () => {
  let component: LoggerWindowComponent;
  let fixture: ComponentFixture<LoggerWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggerWindowComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggerWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
