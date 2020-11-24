import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BookStatus } from 'src/app/modules/book/models/book-status';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Output()
  public navigated = new EventEmitter<void>();

  public BookStatus: typeof BookStatus = BookStatus;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    await this.router.navigate(['/']);
  }
}
