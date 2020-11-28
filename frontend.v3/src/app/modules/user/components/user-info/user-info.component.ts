import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { BookService } from '../../../book/services/book.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  public count$: Promise<number>;

  constructor(private userService: UserService, private bookService: BookService) { }

  ngOnInit(): void {
    this.count$ = this.bookService.getAllCount();
  }

  public get login(): string {
    return this.userService.user.login;
  }

  public get avatar(): string {
    return this.userService.user.avatarName;
  }

  public get avatarUrl(): string {
    return 'url(\'' + environment.filePath + this.avatar + '\')';
  }
}
