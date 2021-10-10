import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UrlInterceptor implements HttpInterceptor {
  public constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clone = req.clone({
      url: UrlInterceptor.getServerUrl(req.url),
    });

    return next.handle(clone);
  }

  public static getServerUrl(url: string): string {
    return environment.serverUrl + url;
  }
}
