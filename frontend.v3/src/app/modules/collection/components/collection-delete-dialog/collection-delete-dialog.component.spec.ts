import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCore } from '../../../../main/test/test-core.spec';
import { ModalRef } from 'ui-kit';
import { CollectionDeleteDialogComponent } from './collection-delete-dialog.component';

describe('CollectionDeleteDialogComponent', () => {
  let component: CollectionDeleteDialogComponent;
  let fixture: ComponentFixture<CollectionDeleteDialogComponent>;
  let element: HTMLDivElement;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [CollectionDeleteDialogComponent],
      providers: [
        {
          provide: ModalRef,
          useValue: {
            close: () => {},
          },
        },
      ],
    }).compileComponents();
  });

  describe('CollectionDeleteDialogComponent', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(CollectionDeleteDialogComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('Close', () => {
      it('Cancel', () => {
        const ref = TestBed.inject(ModalRef);

        const closeSpy = spyOn(ref, 'close');

        element.querySelector<HTMLElement>('.close').click();

        expect(closeSpy).toHaveBeenCalledOnceWith('cancel');
      });

      it('Delete', () => {
        const ref = TestBed.inject(ModalRef);

        const closeSpy = spyOn(ref, 'close');

        element.querySelector<HTMLElement>('.delete').click();

        expect(closeSpy).toHaveBeenCalledOnceWith('delete');
      });
    });
  });
});
