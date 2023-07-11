import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      localStorage.getItem('token') &&
      localStorage.getItem('token') != 'undefined'
    ) {
      var token = localStorage.getItem('token');
      const req = request.clone({
        setHeaders: {
          'content-type': 'application/json',
          accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      });
      // req.headers.append({''});

      return next.handle(req);
    } else {
      const req = request.clone({
        setHeaders: {
          'content-type': 'application/json',
          accept: '*/*',
        },
      });
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          // Handle error here
          console.error('HTTP error occurred:', error);
          if (error.status == 401) {
            this.authService.setErrorStatus(error.status);
            this.router.navigate(['/error']);
          }
          return throwError(error);
        })
      );
    }
  }
}
