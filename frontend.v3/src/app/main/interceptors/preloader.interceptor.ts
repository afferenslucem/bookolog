import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { getConsoleLogger } from '../app.logging';
import { PreloaderService } from '../services/preloader.service';

@Injectable({
  providedIn: 'root',
})
export class PreloaderInterceptor implements HttpInterceptor {
  private logger = getConsoleLogger({
    loggerName: 'PreloaderInterceptor',
    namespace: 'Interceptor',
  });

  public constructor(private preloaderService: PreloaderService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.preloaderService.show();

    return next.handle(req).pipe(
      finalize(() => this.preloaderService.hide()),
    );
  }
}
