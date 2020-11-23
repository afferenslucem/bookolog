import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { BookModule } from '../book/book.module';
import { FormattingModule } from '../formatting/formatting.module';
import { StatisticListComponent } from './component/statistic-list/statistic-list.component';
import { TagsListComponent } from './component/tags-list/tags-list.component';
import { AuthorsListComponent } from './component/authors-list/authors-list.component';
import { GenresListComponent } from './component/genres-list/genres-list.component';
import { BookFilteredComponent } from './component/book-filtered/book-filtered.component';



@NgModule({
  declarations: [StatisticListComponent, TagsListComponent, AuthorsListComponent, GenresListComponent, BookFilteredComponent],
  imports: [
    CommonModule,
    MatListModule,
    FormattingModule,
    BookModule,
  ],
})
export class StatisticModule { }
