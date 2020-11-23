import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../../../book/models/book';
import { TitleService } from '../../../ui/service/title.service';

@Component({
  selector: 'app-book-filtered',
  templateUrl: './book-filtered.component.html',
  styleUrls: ['./book-filtered.component.scss'],
})
export class BookFilteredComponent implements OnInit {
  public books$: Observable<Book[]> = null;
  private filter$: Observable<string> = null;

  constructor(private activatedRoute: ActivatedRoute, private title: TitleService) {
    this.books$ = activatedRoute.data.pipe(map(data => data.books));
    this.filter$ = activatedRoute.params.pipe(map(data => data.filter));
  }

  ngOnInit(): void {
    this.filter$.subscribe(item => {
      this.title.setCustom(item);
    });
  }

}
