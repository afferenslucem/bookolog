import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormattingModule } from '../../../formatting/formatting.module';
import { Book } from '../../models/book';
import { BookHeaderComponent } from '../book-header/book-header.component';
import { TestCore } from '../../../../main/test/test-core.spec';
import { BookActionService } from '../../services/book-action.service';

describe('BookHeaderComponent', () => {
  let component: BookHeaderComponent;
  let fixture: ComponentFixture<BookHeaderComponent>;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [BookHeaderComponent],
      providers: [BookActionService],
      imports: [FormattingModule, RouterTestingModule],
    }).compileComponents();
  });

  describe('Creation', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(BookHeaderComponent);
      component = fixture.componentInstance;

      const book = new Book({
        guid: 'guid',
        name: 'name',
      } as any);
      component.book = book;

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Properties', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(BookHeaderComponent);
      component = fixture.componentInstance;
    });

    it('Should return book name', () => {
      component.book = new Book({
        name: 'book name',
      } as any);

      expect(component.name).toEqual('book name');
    });

    describe('ShouldSync', () => {
      it('Should return true', () => {
        component.book = new Book({
          shouldSync: 1,
        } as any);

        expect(component.shouldSync).toEqual(true);
      });

      it('Should return false', () => {
        component.book = new Book({
          shouldSync: 0,
        } as any);

        expect(component.shouldSync).toEqual(false);
      });

      it('Should return false', () => {
        component.book = new Book({
          shouldSync: null,
        } as any);

        expect(component.shouldSync).toEqual(false);
      });
    });

    describe('AllowEdit', () => {
      it('Should return true', () => {
        const serv = TestBed.inject(BookActionService);

        serv.editAllowed = true;

        expect(component.editAllowed).toEqual(true);
      });

      it('Should return false', () => {
        const serv = TestBed.inject(BookActionService);

        serv.editAllowed = false;

        expect(component.editAllowed).toEqual(false);
      });
    });
  });

  describe('Rendering', () => {
    let element: HTMLElement = null;

    beforeEach(() => {
      fixture = TestBed.createComponent(BookHeaderComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
    });

    describe('Name', () => {
      it('Should render book name', () => {
        component.book = new Book({
          name: 'book name',
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.book-line__name').innerText).toEqual('book name');
      });
    });

    describe('ShouldSync', () => {
      it('Should render', () => {
        component.book = new Book({
          shouldSync: 1,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.sync-icon')).toBeTruthy();
      });

      it('Should not render', () => {
        component.book = new Book({
          shouldSync: 0,
        } as any);

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.sync-icon')).toBeFalsy();
      });
    });

    describe('AllowEdit', () => {
      it('Should render', () => {
        component.book = new Book({
          name: '',
        } as any);

        const serv = TestBed.inject(BookActionService);
        serv.editAllowed = true;

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.edit-icon')).toBeTruthy();
      });

      it('Should not render', () => {
        component.book = new Book({
          name: '',
        } as any);
        const serv = TestBed.inject(BookActionService);
        serv.editAllowed = false;

        fixture.detectChanges();

        expect(element.querySelector<HTMLDivElement>('.edit-icon')).toBeFalsy();
      });
    });
  });
});
