import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponseBase,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
import { JWTDefaults } from '../models/jwt-defaults';
import { LocalStorageService } from '../../../main/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class JWTAuthenticationInterceptor implements HttpInterceptor {
  public constructor(private localStorageService: LocalStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.sendWithAuth(req, next).pipe(tap(result => this.onResponse(result)));
  }

  public sendWithAuth(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.sendWithAccess(req, next).pipe(
      catchError((err: HttpErrorResponse) => {
        if (!err?.error && err?.status === 401) {
          return this.sendWithRefresh(req, next);
        } else {
          return throwError(err);
        }
      }),
    );
  }

  public sendWithAccess(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getItem(JWTDefaults.accessHeader);

    return this.sendWithToken(req, next, token);
  }

  public sendWithRefresh(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getItem(JWTDefaults.refreshHeader);

    return this.sendWithToken(req, next, token);
  }

  public sendWithToken(req: HttpRequest<any>, next: HttpHandler, token: string): Observable<HttpEvent<any>> {
    if (token) {
      const headers = {
        [JWTDefaults.tokenHeader]: token,
      };

      const clone = req.clone({
        setHeaders: headers,
      });

      return next.handle(clone).pipe(filter(item => item.type !== 0));
    } else {
      return next.handle(req).pipe(filter(item => item.type !== 0));
    }
  }

  public onResponse(event: HttpEvent<any>): void {
    if (event instanceof HttpResponseBase) {
      this.readHeaders(event.headers);
    }
  }

  private readHeaders(headers: HttpHeaders): void {
    this.refreshToken(headers, JWTDefaults.accessHeader);
    this.refreshToken(headers, JWTDefaults.refreshHeader);
  }

  private refreshToken(headers: HttpHeaders, headerName: string): void {
    if (headers.has(headerName)) {
      const token = headers.get(headerName);
      this.localStorageService.setItem(headerName, token);
    }
  }
}
