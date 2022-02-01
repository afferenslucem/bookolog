import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../../modules/user/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedInterceptor implements HttpInterceptor {
  public constructor(private router: Router, private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (!err.error && err.status === 401) {
          void this.onUnauthorized();
        }
        return throwError(err);
      }),
    );
  }

  private async onUnauthorized() {
    await this.userService.logout();
    await this.router.navigate(['/login']);
  }
}
