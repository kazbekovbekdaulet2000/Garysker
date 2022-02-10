import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { RemoveToken, UpdateProfile, UpdateToken } from '@core/states/auth/actions';
import { AuthState } from '@core/states/auth/auth.state';
import * as moment from 'moment';
import { IdentityService } from '@core/services/identity.service';
import { Navigate } from '@ngxs/router-plugin';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  refreshTokenInProgress = false;

  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(
    private store: Store,
    private identityService: IdentityService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isTokenExpired(req)) {
      return this.refreshToken().pipe(
        switchMap(() => {
          req = this.setAuthHeader(req!);
          return next.handle(req);
        }),
        catchError(e => {
          this.store.dispatch(RemoveToken);
          return throwError(e);
        }));
    }

    req = this.setAuthHeader(req)

    return next.handle(req)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && !req.url.includes('auth/login/')) {
            return this.handleResponseError(error, req, next);
          }
          return throwError(error);
        })
      );
  }

  setAuthHeader(req: HttpRequest<any>) {
    const { access } = this.store.selectSnapshot(AuthState);
    if (access !== '') {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${access}`
        }
      });
    }
    return req
  }

  isTokenExpired(request: HttpRequest<any>): boolean {
    if (request.params.has('refresh_token')) {
      return false;
    }

    const { access, accessTokenExpireDate } = this.store.selectSnapshot(AuthState);

    if (access !== '' || !accessTokenExpireDate) {
      return false;
    }

    const leftSeconds = moment().diff(accessTokenExpireDate, 'seconds');

    return leftSeconds > -30;
  }

  refreshToken(): Observable<any> {
    const { refresh } = this.store.selectSnapshot(AuthState);
    if (refresh === '') {
      return new Observable
    }
    if (this.refreshTokenInProgress) {
      return new Observable(observer => {
        return this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;

      if (refresh === '') {
        this.refreshTokenInProgress = false;
        return throwError(new Error('Нету токена'));
      }

      return this.identityService.refresh(refresh).pipe(
        map(token => {
          this.store.dispatch(new UpdateToken(token.access));
          this.store.dispatch(new UpdateProfile())
          return token;
        }),
        tap(() => {
          this.refreshTokenInProgress = false;
          this.tokenRefreshedSource.next();
        }),
        catchError(error => {
          this.refreshTokenInProgress = false;
          return throwError(error);
        }));
    }
  }

  handleResponseError(error: HttpErrorResponse, req?: HttpRequest<any>, next?: HttpHandler) {
    if (error.status === 401) {
      return this.refreshToken().pipe(
        take(1),
        switchMap(() => {
          req = this.setAuthHeader(req!);
          return next!.handle(req);
        }),
        catchError(e => {
          this.store.dispatch(RemoveToken);
          return throwError(e);
        }));
    } else if (error.status === 404) {
      // this.store.dispatch(new Navigate(["**"]))
    }
    return throwError(error);
  }
}
