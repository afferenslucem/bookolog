import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMarkAsDialogComponent } from './book-mark-as-dialog.component';
import { DIALOG_DATA, ModalRef } from 'bookolog-ui-kit';

describe('BookMarkAsDialogComponent', () => {
  let component: BookMarkAsDialogComponent;
  let fixture: ComponentFixture<BookMarkAsDialogComponent>;
  let elRef: HTMLDivElement = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookMarkAsDialogComponent],
      providers: [
        {
          provide: ModalRef,
          useValue: {
            close: () => {},
          },
        },
        {
          provide: DIALOG_DATA,
          useValue: { statusName: 'Прочитана' },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookMarkAsDialogComponent);
    elRef = fixture.elementRef.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should print status name', () => {
    const containsName = elRef.textContent.indexOf('Прочитана') > -1;

    expect(containsName).toBeTruthy();
  });

  describe('Close', () => {
    it('Cancel', () => {
      const ref = TestBed.inject(ModalRef);

      const closeSpy = spyOn(ref, 'close');

      elRef.querySelector<HTMLElement>('.close').click();

      expect(closeSpy).toHaveBeenCalledOnceWith('cancel');
    });

    it('Delete', () => {
      const ref = TestBed.inject(ModalRef);

      const closeSpy = spyOn(ref, 'close');

      elRef.querySelector<HTMLElement>('.mark').click();

      expect(closeSpy).toHaveBeenCalledOnceWith('mark');
    });
  });
});
