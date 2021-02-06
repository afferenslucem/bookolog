import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { BookModule } from '../book/book.module';
import { FormattingModule } from '../formatting/formatting.module';
import { AuthorsListComponent } from './component/authors-list/authors-list.component';
import { BookFilteredComponent } from './component/book-filtered/book-filtered.component';
import { GenresListComponent } from './component/genres-list/genres-list.component';
import { StatisticListComponent } from './component/statistic-list/statistic-list.component';
import { TagsListComponent } from './component/tags-list/tags-list.component';
import { YearsListComponent } from './component/years-list/years-list.component';
import { YearStatisticComponent } from './component/year-statistic/year-statistic.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [StatisticListComponent, TagsListComponent, AuthorsListComponent, GenresListComponent, BookFilteredComponent, YearsListComponent, YearStatisticComponent],
  imports: [
    CommonModule,
    MatListModule,
    FormattingModule,
    BookModule,
    ScrollingModule,
    RouterModule,
  ],
})
export class StatisticModule { }
