import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionViewComponent } from './collection-view.component';
import { TestCore } from '../../../../main/test/test-core.spec';
import { ActivatedRoute } from '@angular/router';
import { UUIDGeneratorService } from '../../../../main/services/u-u-i-d-generator.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { TitleService } from '../../../ui/service/title.service';
import { BookService } from '../../../book/services/book.service';
import { CollectionService } from '../../services/collection.service';
import { Book } from '../../../book/models/book';

describe('CollectionComponent', () => {
  let component: CollectionViewComponent;
  let fixture: ComponentFixture<CollectionViewComponent>;
  let titleService: TitleService;
  let bookService: BookService;
  let collectionService: CollectionService;

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [CollectionViewComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              collection: {
                name: 'name',
                description: 'description',
              },
              books: [
                {
                  guid: 'id1',
                },
                {
                  guid: 'id2',
                },
                {
                  guid: 'id3',
                },
              ],
            }),
          },
        },
        { provide: UUIDGeneratorService, useValue: {} },
      ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionViewComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(TitleService);
    bookService = TestBed.inject(BookService);
    collectionService = TestBed.inject(CollectionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set title', () => {
    const spy = spyOn(titleService, 'setCustom');

    component.setTitle('name');

    expect(spy).toHaveBeenCalledOnceWith('name');
  });

  it('delete', async () => {
    const deleteBooksSpy = spyOn(bookService, 'deleteBooksFromCollection');
    const deleteSpy = spyOn(collectionService, 'delete');

    await component.deleteCollection({
      guid: 'id1',
    } as any);

    expect(deleteBooksSpy).toHaveBeenCalledOnceWith('id1');
    expect(deleteSpy).toHaveBeenCalledOnceWith({
      guid: 'id1',
    } as any);
  });

  describe('orderBooks', () => {
    it('sort with orders', () => {
      const first = {
        collectionOrder: 1,
      } as Book;
      const second = {
        collectionOrder: 2,
      } as Book;
      const third = {
        collectionOrder: 3,
      } as Book;

      const sorted = component.orderBooks([third, second, first]);

      expect(sorted).toEqual([first, second, third]);
    });

    it('sort without order', () => {
      const first = {} as Book;
      const second = {
        collectionOrder: 2,
      } as Book;
      const third = {
        collectionOrder: 3,
      } as Book;

      const sorted = component.orderBooks([third, second, first]);

      expect(sorted).toEqual([second, third, first]);
    });
  });
});
