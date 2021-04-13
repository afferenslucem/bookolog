import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { BookTrackBy } from '../../../../main/utils/book-track-by';
import { Book } from '../../../book/models/book';
import { TitleService } from '../../../ui/service/title.service';
import { Collection } from '../../models/collection';
import _ from 'declarray';
import { CollectionService } from '../../services/collection.service';
import { CollectionDeleteDialogComponent, DeleteDialogResult } from '../collection-delete-dialog/collection-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/modules/book/services/book.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection-view.component.html',
  styleUrls: ['./collection-view.component.scss'],
})
export class CollectionViewComponent implements OnInit {
  public books$: Observable<Book[]>;
  public collection$: Observable<Collection>;
  public collection: Collection;

  constructor(
    activatedRoute: ActivatedRoute,
    private titleService: TitleService,
    private collectionService: CollectionService,
    private bookService: BookService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    const data$ = activatedRoute.data;

    this.books$ = activatedRoute.data.pipe(
      filter(item => item.books),
      map(item => item.books as Book[]),
      map(books => this.orderBooks(books)),
    );

    data$
      .pipe(
        filter(item => item.collection),
        map(item => item.collection as Collection),
        tap(item => this.setTitle(item.name)),
        tap(item => (this.collection = item)),
      )
      .subscribe();
  }

  public orderBooks(books: Book[]): Book[] {
    return _(books)
      .orderBy(book => book.collectionOrder || Number.MAX_VALUE)
      .toArray();
  }

  public ngOnInit(): void {}

  public bookTrackBy(index: number, item: Book): string {
    return BookTrackBy.trackBy(index, item);
  }

  public openDeleteDialog(collection: Collection): void {
    const dialogRef = this.dialog.open(CollectionDeleteDialogComponent, {
      width: '90%',
      maxWidth: '300px',
    });

    dialogRef
      .afterClosed()
      .pipe(filter((item?: DeleteDialogResult) => item && item === 'delete'))
      .subscribe(() => {
        this.deleteCollection(collection);
        this.redirect();
      });
  }

  public async deleteCollection(collection: Collection): Promise<void> {
    await this.bookService.deleteBooksFromCollection(collection.guid);
    await this.collectionService.delete(collection);
  }

  public async redirect(): Promise<void> {
    await this.router.navigate(['/series']);
  }

  public setTitle(title: string): void {
    this.titleService.setCustom(title);
  }
}
