import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCore } from '../../../../main/test/test-core.spec';
import { BookDeleteDialogComponent } from './book-delete-dialog.component';
import { ModalRef } from 'bookolog-ui-kit';

describe('BookDeleteDialogComponent', () => {
  let component: BookDeleteDialogComponent;
  let fixture: ComponentFixture<BookDeleteDialogComponent>;
  let element: HTMLDivElement;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [BookDeleteDialogComponent],
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

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDeleteDialogComponent);
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
