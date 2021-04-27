import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyListIconComponent } from './empty-list-icon.component';
import { LocalStorageService } from '../../../../main/services/local-storage.service';

describe('EmptyListItemComponent', () => {
  let component: EmptyListIconComponent;
  let fixture: ComponentFixture<EmptyListIconComponent>;
  let localStorageService: LocalStorageService = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyListIconComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyListIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return fullName', () => {
    component.id = 17;

    expect(component.iconFullName).toEqual('/assets/empty-list-icons/17.svg');
  });
});
