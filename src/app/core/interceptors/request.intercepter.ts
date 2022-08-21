import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { RemoveToken, UpdateProfile, UpdateToken } from '@core/states/auth/actions';
import { AuthState } from '@core/states/auth/auth.state';
import * as moment from 'moment';
import { IdentityService } from '@core/services/identity.service';
import { Navigate } from '@ngxs/router-plugin';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LoginErrModalComponent } from 'src/app/shared/modals/noLogin-modal /login-modal.component';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  refreshTokenInProgress = false;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(
    private store: Store,
    private identityService: IdentityService,
    private bsModalService: BsModalService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isTokenExpired(req)) {
      return this.handle401Error(req, next);
    }
    req = this.setAuthHeader(req, this.store.selectSnapshot(AuthState).access)

    return next.handle(req).pipe(
      catchError(error => {
        if (req.url.includes('/courses/') && req.url.includes('/participate/') && error.status === 401) {
          this.bsModalService.show(LoginErrModalComponent, { class: 'modal-dialog-centered' })
        }

        if (error instanceof HttpErrorResponse && !req.url.includes('auth/login/') && error.status === 401) {
          return this.handle401Error(req, next);
        }
        return throwError(error);
      })
    );
  }

  setAuthHeader(req: HttpRequest<any>, token: string) {
    if (!!token && !req.params.has('refresh_token')) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
    return req
  }

  isTokenExpired(request: HttpRequest<any>): boolean {
    if (request.params.has('refresh_token')) {
      return false;
    }
    const access = this.store.selectSnapshot(AuthState).access
    const accessTokenExpireDate = this.store.selectSnapshot(AuthState).accessTokenExpireDate
    if (!access || !accessTokenExpireDate) {
      return false;
    }

    const leftSeconds = moment().diff(accessTokenExpireDate, 'seconds');
    return leftSeconds > -30;
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const { refresh } = this.store.selectSnapshot(AuthState);

      if (refresh) {
        const decodedRefreshToken = JSON.parse(window.atob(refresh.split('.')[1]));
        if (moment().diff(moment.unix(decodedRefreshToken.exp), 'seconds') > -10) {
          this.store.dispatch(RemoveToken)
          this.isRefreshing = false;
          this.refreshTokenSubject.next(null);
          window.location.reload()
        }
        return this.identityService.refresh(refresh).pipe(
          switchMap(token => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(token.access);
            this.store.dispatch(new UpdateToken(token.access));
            return next.handle(this.setAuthHeader(request, token.access));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.store.dispatch(RemoveToken)
            return throwError(err);
          })
        );
      } else {
        this.bsModalService.show(LoginErrModalComponent, { class: 'modal-dialog-centered' })
      }
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.setAuthHeader(request, token)))
    );
  }

  handleResponseError(error: HttpErrorResponse, req?: HttpRequest<any>, next?: HttpHandler) {
    if (error.status === 401) {

    } else if (error.status === 404) {
      // this.store.dispatch(new Navigate(["**"]))
    }
    return throwError(error);
  }
}
