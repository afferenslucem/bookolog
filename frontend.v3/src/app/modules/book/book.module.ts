import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './book-routing.module';
import { InProgressBooksComponent } from './components/in-progress-books/in-progress-books.component';


@NgModule({
  declarations: [InProgressBooksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class BookModule {
}
