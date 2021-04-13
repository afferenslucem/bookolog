import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleComponent } from './title.component';
import { TestCore } from '../../../../main/test/test-core.spec';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [TitleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
