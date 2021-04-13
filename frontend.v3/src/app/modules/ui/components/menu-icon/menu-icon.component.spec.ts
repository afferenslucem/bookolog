import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MenuIconComponent } from './menu-icon.component';
import { TestCore } from '../../../../main/test/test-core.spec';

describe('MenuIconComponent', () => {
  let component: MenuIconComponent;
  let fixture: ComponentFixture<MenuIconComponent>;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [MenuIconComponent],
      imports: [MatIconModule, MatButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
