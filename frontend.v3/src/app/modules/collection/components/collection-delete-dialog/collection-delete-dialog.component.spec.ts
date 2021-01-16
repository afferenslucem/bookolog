import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionDeleteDialogComponent } from './collection-delete-dialog.component';

describe('BookDeleteDielogComponent', () => {
  let component: CollectionDeleteDialogComponent;
  let fixture: ComponentFixture<CollectionDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
