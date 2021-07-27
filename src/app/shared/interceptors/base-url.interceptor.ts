import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '#env/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor() {}

  private static getUrl(): string {
    return environment.baseUrl;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      url: BaseUrlInterceptor.getUrl() + request.url,
    });
    return next.handle(request);
  }
}
