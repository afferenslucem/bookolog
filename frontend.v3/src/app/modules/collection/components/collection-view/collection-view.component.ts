import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Book } from '../../../book/models/book';
import { TitleService } from '../../../title/services/title.service';
import { Collection } from '../../models/collection';
import _ from 'declarray';
import { CollectionService } from '../../services/collection.service';
import { CollectionDeleteDialogComponent } from '../collection-delete-dialog/collection-delete-dialog.component';
import { DestroyService, UiModalService } from 'bookolog-ui-kit';
import { BookService } from 'src/app/modules/book/services/book.service';
import { BookSearchableList } from '../../../book/utils/book-searchable-list';
import { SearchService } from '../../../search/services/search.service';
import { BrokenConnectionError } from '../../../../main/models/errors/broken-connection-error';
import { NotificationService } from '../../../notification/services/notification.service';
import { defaultModalConfig } from '../../../../main/utils/modal-config';
import { MetrikaService } from '../../../metrika/services/metrika.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection-view.component.html',
  styleUrls: ['./collection-view.component.scss'],
  providers: [DestroyService, UiModalService],
})
export class CollectionViewComponent extends BookSearchableList implements OnInit, AfterViewInit {
  public books$: Observable<Book[]>;
  public collection: Collection;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(
    activatedRoute: ActivatedRoute,
    private titleService: TitleService,
    private collectionService: CollectionService,
    private bookService: BookService,
    searchService: SearchService,
    private router: Router,
    public dialog: UiModalService,
    public metrika: MetrikaService,
    private notificationService: NotificationService,
  ) {
    super(activatedRoute, searchService);
    const data$ = activatedRoute.data;

    data$
      .pipe(
        filter(item => item.collection),
        map(item => item.collection as Collection),
        tap(item => this.setTitle(item.name)),
        tap(item => (this.collection = item)),
      )
      .subscribe();
  }

  public sortBooks(books: Book[]): Book[] {
    return _(books)
      .orderBy(book => book.collectionOrder || Number.MAX_VALUE)
      .toArray();
  }

  public ngOnInit(): void {}

  public openDeleteDialog(collection: Collection): void {
    const dialogRef = this.dialog.open(CollectionDeleteDialogComponent, null, defaultModalConfig);

    dialogRef.close$.pipe(filter((item?: string) => item === 'delete')).subscribe(() => void this.onDelete(collection));
  }

  public async deleteCollection(collection: Collection): Promise<void> {
    try {
      await this.bookService.deleteBooksFromCollection(collection.guid);
    } finally {
      await this.collectionService.delete(collection);
    }
  }

  public async redirect(): Promise<void> {
    await this.router.navigate(['/series']);
  }

  public setTitle(title: string): void {
    this.titleService.setCustom(title);
  }

  public ngAfterViewInit(): void {
    this.dialog.registerContainerRef(this.container);
  }

  private async onDelete(collection: Collection): Promise<void> {
    try {
      await this.deleteCollection(collection);
      this.metrika.fireCollectionDelete();
    } catch (e) {
      if (e instanceof BrokenConnectionError) {
        this.notificationService.createWarningNotification('Коллекция удалена локально');
      } else {
        this.notificationService.createWarningNotification('Ошибка удаления коллекции');
      }
    }
    await this.redirect();
  }
}
