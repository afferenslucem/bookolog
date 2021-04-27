import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestCore } from '../../../../main/test/test-core.spec';
import { Book } from '../../../book/models/book';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { TagsListComponent } from './tags-list.component';

describe('TagsListComponent', () => {
  let component: TagsListComponent;
  let fixture: ComponentFixture<TagsListComponent>;
  let router: Router;

  const books: Book[] = [
    new Book({
      tags: ['One', 'two'],
    } as any),
    new Book({
      tags: [],
    } as any),
    new Book({
      tags: ['two'],
    } as any),
  ];

  beforeEach(async () => {
    await TestCore.configureTestingModule({
      declarations: [TagsListComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              books,
            }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsListComponent);
    component = fixture.componentInstance;

    component.ngOnInit();

    fixture.detectChanges();

    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run counts by author in pipe', async () => {
    const spy = spyOn(component, 'countTags');

    await component.tags$.toPromise();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should counts by author', () => {
    const result = component.countTags(books);

    const expected = [
      { key: 'two', group: 2 },
      { key: 'One', group: 1 },
    ] as any;

    expect(result).toEqual(expected);
  });

  it('should navigate to author', async () => {
    const spy = spyOn(router, 'navigate');

    await component.selectedTag('ping');

    expect(spy).toHaveBeenCalledOnceWith(['/tag', 'ping']);
  });
});
