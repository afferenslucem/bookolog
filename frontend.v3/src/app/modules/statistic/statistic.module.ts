import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { FormattingModule } from '../formatting/formatting.module';
import { StatisticListComponent } from './component/statistic-list/statistic-list.component';
import { TagsListComponent } from './component/tags-list/tags-list.component';
import { AuthorsListComponent } from './component/authors-list/authors-list.component';
import { GenresListComponent } from './component/genres-list/genres-list.component';



@NgModule({
  declarations: [StatisticListComponent, TagsListComponent, AuthorsListComponent, GenresListComponent],
  imports: [
    CommonModule,
    MatListModule,
    FormattingModule,
  ],
})
export class StatisticModule { }
