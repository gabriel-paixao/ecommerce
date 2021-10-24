import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(res => {
        if (res) {
          if (res.status === 400) {
            if (res.error.errors) {
              throw res.error;
            }
            else {
              this.toastr.error(res.error.message, res.error.statusCode);
            }
          }
          if (res.status === 401) {
            this.toastr.error(res.error.message, res.error.statusCode);
          }
          if (res.status === 404) {
            this.router.navigateByUrl('/not-found');
          }
          if (res.status === 500) {
            const navigationExtras: NavigationExtras = { state: { error: res.error } };
            this.router.navigateByUrl('/server-error', navigationExtras);
          }
        }
        return throwError(res);
      })
    );
  }
}
