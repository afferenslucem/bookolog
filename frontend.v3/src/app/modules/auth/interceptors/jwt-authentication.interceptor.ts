import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { JWTDefaults } from '../models/jwt-defaults';
import { LocalStorageService } from '../../../main/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class JWTAuthenticationInterceptor implements HttpInterceptor {
  public constructor(private localStorageService: LocalStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = this.getHeaders();

    const clone = req.clone({
      setHeaders: headers,
    });

    return next.handle(clone).pipe(
      filter(item => item.type !== 0),
      tap(item => this.onResponse(item)),
    );
  }

  private getHeaders(): { [key: string]: string } {
    const access = this.localStorageService.getItem(JWTDefaults.accessHeader);
    const refrash = this.localStorageService.getItem(JWTDefaults.refrashHeader);

    if (access && refrash) {
      return {
        [JWTDefaults.accessHeader]: access,
        [JWTDefaults.refrashHeader]: refrash,
      };
    } else {
      return {};
    }
  }

  private onResponse(event: HttpEvent<any>): void {
    if (event instanceof HttpResponseBase) {
      this.readHeaders(event.headers);
    }
  }

  private readHeaders(headers: HttpHeaders): void {
    this.refrashToken(headers, JWTDefaults.accessHeader);
    this.refrashToken(headers, JWTDefaults.refrashHeader);
  }

  private refrashToken(headers: HttpHeaders, headerName: string): void {
    if (headers.has(headerName)) {
      const token = headers.get(headerName);
      this.localStorageService.setItem(headerName, token);
    } else {
      this.localStorageService.removeItem(headerName);
    }
  }
}
